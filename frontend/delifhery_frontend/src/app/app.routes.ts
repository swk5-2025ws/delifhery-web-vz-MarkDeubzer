import { Routes } from '@angular/router';
import {Home} from './home/home';
import {Tracking} from './tracking/tracking';
import {TrackingDetails} from './tracking-details/tracking-details';
import {ShippingCost} from './shipping-cost/shipping-cost';
import {MyContact} from './my-contact/my-contact';
import {CreateShipment} from './create-shipment/create-shipment';
import {PaymentComplete} from './payment-complete/payment-complete';
import {MyShipments} from './my-shipments/my-shipments';

export const routes: Routes = [
  {
    path:'',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'home',
    component: Home
  },
  {
    path: 'tracking',
    component: Tracking
  },
  {
    path: 'tracking/:postalCode',
    component: TrackingDetails
  },
  {
    path: 'shippingCost',
    component: ShippingCost
  },
  {
    path: 'myContacts',
    component: MyContact
  },
  {
    path: 'shipments',
    component: CreateShipment
  },
  {
    path: 'payment-complete',
    loadComponent: () => import('./payment-complete/payment-complete'). then(m => m.PaymentComplete),
  },
  {
    path: 'my-shipments',
    component: MyShipments
  },
  {
    path:'**',
    redirectTo: 'home'
  }


];
