import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from '../environments/environment';
import {TrackingStatusRequest} from './tracking.service';

export interface SubscriptionStatusDto {
  subscribed: boolean;
}

@Injectable({providedIn: 'root'})
export class NotificationService {
  constructor(private http: HttpClient) {}

   private readonly baseUrl = environment.apiBaseUrl + '/api/notifications';

  getStatus(trackingNumber: string,  postalCode: string): Observable<SubscriptionStatusDto> {
    const tn = (trackingNumber ?? "").trim();
    const pc = (postalCode ?? "").trim();

    const url = `${this.baseUrl}/subscription/${encodeURIComponent(pc)}/${encodeURIComponent(trackingNumber)}`;
    return this.http.get<SubscriptionStatusDto>(url);
  }

  subscribe(trackingNumber: string,  postalCode: string): Observable<SubscriptionStatusDto> {
    const body: TrackingStatusRequest = {
      trackingNumber : (trackingNumber ?? "").trim(),
      postalCode : (postalCode ?? "").trim(),
    };

    return this.http.post<SubscriptionStatusDto>(`${this.baseUrl}/subscribe`, body);
  }

  unsubscribe(trackingNumber: string,  postalCode: string): Observable<SubscriptionStatusDto> {
    const body: TrackingStatusRequest = {
      trackingNumber : (trackingNumber ?? "").trim(),
      postalCode : (postalCode ?? "").trim(),
    };

    return this.http.post<SubscriptionStatusDto>(`${this.baseUrl}/unsubscribe`, body);
  }

}
