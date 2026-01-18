import { Component } from '@angular/core';
import {Router, RouterLink} from '@angular/router';
import {FormsModule} from '@angular/forms';
import {CommonModule} from '@angular/common';
import {TrackingService} from '../../services/tracking.service';

@Component({
  selector: 'app-home',
  standalone:true,
  imports: [RouterLink, FormsModule, CommonModule],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {
    trackingNumber = "";
    postalCode = "";

    loading = false;
    error:string | null = null;
    submitted = false;

    constructor(private trackingService: TrackingService, private router: Router) {}

    OnTrack(): void{
      this.error = null;
      this.submitted = true;

      const tn = this.trackingNumber.trim();
      const pc = this.postalCode.trim();

      if(!tn || !pc){
        this.error = "Please enter a Postal code and Tracking number.";
        return;
      }

      this.loading = true;

      this.trackingService.trackShipment({trackingNumber: tn, postalCode: pc}).subscribe({
        next: () => {
          this.loading = false;
          if(this.error == null){
            this.router.navigate(['/tracking',pc], {queryParams: { tn }});
          }
        },
        error: (err) => {
          this.loading = false;
          this.error = err?.status === 404 ? "No package found" : "Loading error. Try again.";

        },
      });
    }
}
