import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { NgModule, NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MessagingService } from '../service/messaging.service';
import { CourierService } from '../service/courier.service';
import { DeliveryService } from '../service/delivery.service';
import { MatButtonModule, MatCheckboxModule, MatInputModule, MatTreeModule, MatIconModule, MatProgressBarModule, MatProgressSpinnerModule, MatSidenavModule } from '@angular/material';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NaviService } from '../service/navi.service';
import { ViewModel } from '../service/viewmodel';

@NgModule({
  imports: [
    CommonModule,
    MDBBootstrapModule.forRoot(),
  ],
  exports: [
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatCheckboxModule,
    MatInputModule,
    MatTreeModule,
    MatIconModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    MatSidenavModule,
    MDBBootstrapModule,
  ],
  providers: [
    MessagingService,
    CourierService,
    DeliveryService,
    NaviService,
    ViewModel
  ],
  schemas: [NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA]
})
export class SharedModule { }
