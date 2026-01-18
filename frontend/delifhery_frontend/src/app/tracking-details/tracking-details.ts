import {Component, OnInit} from '@angular/core';
import {TrackingService, TrackingStatusResponse} from '../../services/tracking.service';
import {CommonModule} from '@angular/common';
import {ActivatedRoute, RouterLink, Router} from '@angular/router';
import {KeycloakService} from 'keycloak-angular';
import {NotificationService} from '../../services/notification.service';
import { ContactMethodService } from '../../services/contact-method.service';

@Component({
  selector: 'app-tracking-details',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './tracking-details.html',
  styleUrl: './tracking-details.css',
})
export class TrackingDetails implements OnInit{
  loading = false;
  error: string | null = null;

  trackingNumber= "";
  postalCode = "";

  data: TrackingStatusResponse | null = null;

  isLoggedIn: boolean = false;
  subscribed: boolean = false;
  toggleLoading: boolean = false;
  toggleError: string | null = null;

  hasPrimaryEmail = false;
  primaryEmail: string | null = null;
  emailLoading = false;

  constructor(private trackingService: TrackingService, private route: ActivatedRoute
  , private keycloak: KeycloakService, private notificationService: NotificationService, private contactMethodService: ContactMethodService,
              private router: Router) {
  }

  async ngOnInit() {
    this.postalCode = (this.route.snapshot.paramMap.get('postalCode') ?? '').trim();
    this.trackingNumber = (this.route.snapshot.queryParamMap.get('tn') ?? '').trim();

    if(!this.postalCode || !this.trackingNumber){
      this.error = "Missing tracking number or postal code. Try again later";
      return;
    }
    this.isLoggedIn = this.keycloak.isLoggedIn();

    if(this.isLoggedIn){
      this.checkPrimaryEmail();
    }
    this.load();
  }

  private checkPrimaryEmail() {
    this.emailLoading = true;

    this.contactMethodService.getPrimaryEmailForCurrentUser().subscribe({
      next: (email) => {
        this.primaryEmail = email;
        this.hasPrimaryEmail = !!email;
        this.emailLoading = false;
      },
      error: () => {
        this.primaryEmail = null;
        this.hasPrimaryEmail = false;
        this.emailLoading = false;
      }
    })
  }

  load(): void {
    this.loading = true;
    this.error = null;
    this.data = null;

    this.trackingService.trackShipment({
      trackingNumber: this.trackingNumber,
      postalCode: this.postalCode,
    }).subscribe({
      next:(res) => {
        this.data = res;
        this.loading = false;

        if (this.isLoggedIn) {
          this.loadSubscriptionStatus();
        } else {
          this.subscribed = false;
        }
      },
      error: (err) => {
        this.loading = false;
        this.error = err?.status === 404 ? "No package found." : "Loading error";
      }
    });
  }

  private loadSubscriptionStatus(): void{

    if(!this.hasPrimaryEmail){
      this.subscribed = false;
      this.toggleLoading = false;
      this.toggleError = "Please set a primary email in My Contacts to enable notifications.";
      return;
    }

    this.toggleError = null;
    this.toggleLoading = true;
    this.toggleError = null;

    this.notificationService
      .getStatus(this.trackingNumber,this.postalCode)
      .subscribe({
        next: (result) => {
          this.subscribed = !!result?.subscribed;
          this.toggleLoading = false;
        },
        error: (err) => {
          if(err?.status === 401 || err?.status === 403){
            this.subscribed = false;
            return;
          }
          this.toggleError = "Could not load notification status.";
        },
      });

  }

  onToggleNotifications(): void {
    if(!this.isLoggedIn || this.toggleLoading) {
        return;
    }

    if(!this.hasPrimaryEmail) {
      this.toggleError = "Please set a primary email in My Contacts to enable notifications."
    }

    this.toggleLoading = true;
    this.toggleError = null;

    const call = this.subscribed
      ? this.notificationService.unsubscribe(this.trackingNumber, this.postalCode)
      : this.notificationService.subscribe(this.trackingNumber, this.postalCode);

    call.subscribe({
      next: (result) => {
        this.subscribed = !!result?.subscribed;
        this.toggleLoading  = false;
      },
      error: (err) => {
        this.toggleLoading = false;
        this.toggleError = err?.status === 404 ? "No package found." : "Loading error";
      },
    });
  }

  private get latestEvent() {
    const h = this.data?.history ?? [];
    if (!h.length) return null;

    return h.reduce((latest, cur) => {
      const lt = new Date(latest.occurredAt as any).getTime();
      const ct = new Date(cur.occurredAt as any).getTime();
      return ct > lt ? cur : latest;
    });
  }

  get currentStatus(): string {
    return this.latestEvent?.status ?? "-";
  }

  get lastUpdate(): string {
    const ev = this.latestEvent;
    if (!ev?.occurredAt) return "-";
    return new Intl.DateTimeFormat("de-AT", { dateStyle: "medium", timeStyle: "short" })
      .format(new Date(ev.occurredAt as any));
  }


}
