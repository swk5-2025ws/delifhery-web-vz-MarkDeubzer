import {Component, OnInit} from '@angular/core';
import {MyShipmentListDto, ShipmentService} from '../../services/shipment.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-my-shipments',
  standalone: true,
  imports: [],
  templateUrl: './my-shipments.html',
  styleUrl: './my-shipments.css',
})

export class MyShipments implements OnInit{

  loading = false;
  error: string | null = null;

  shipments: MyShipmentListDto[] = [];

  constructor(private shipmentService: ShipmentService, private router: Router) {}

  ngOnInit() {
    this.load();
  }

  load(): void {
    this.loading = true;
    this.error = null;

    this.shipmentService.getMyShipments().subscribe({
      next: res =>{
        this.shipments = res ?? [];
        this.loading = false;
      },
      error: err => {
        this.loading = false;
        this.error = err?.status === 403 ? "No package found" : "Loading error. Try again.";
      }
    });
  }

  track(dto: MyShipmentListDto){
    this.router.navigate(['/tracking',dto.postalCode], {
      queryParams: { tn: dto.trackingNumber },
    });
  }

  displayStatus(dto: MyShipmentListDto): string {
    return  (dto.currentStatus ?? '').trim() || '-';
  }
}
