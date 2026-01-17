import {Component, OnInit} from '@angular/core';
import {TrackingService, TrackingStatusResponse} from '../../services/tracking.service';
import {CommonModule} from '@angular/common';
import {ActivatedRoute, RouterLink} from '@angular/router';
import {KeycloakService} from 'keycloak-angular';
import {NotificationService} from '../../services/notification.service';

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

  constructor(private trackingService: TrackingService, private route: ActivatedRoute
  , private keycloak: KeycloakService, private notificationService: NotificationService) {
  }

  async ngOnInit() {
    this.postalCode = (this.route.snapshot.paramMap.get('postalCode') ?? '').trim();
    this.trackingNumber = (this.route.snapshot.queryParamMap.get('tn') ?? '').trim();

    if(!this.postalCode || !this.trackingNumber){
      this.error = "Missing tracking number or postal code. Try again later";
      return;
    }
    this.isLoggedIn = this.keycloak.isLoggedIn();

    this.load();
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

  get currentStatus(): string {
    if(!this.data?.history?.length){
      return "-";
    }
    return this.data.history[this.data.history.length - 1].status ?? "-";
  }

  get lastUpdate(): string {
    if(!this.data?.history?.length){
      return "-";
    }
    const last = this.data.history[this.data.history.length - 1].occurredAt;
    return last ? new Intl.DateTimeFormat("de-At",{ dateStyle: 'medium', timeStyle: 'short' }).format(last) : "-";
  }

}
