import { DeliveryService } from "./delivery.service";
import { MessagingService } from "./messaging.service";
import { ViewModelService } from "./view-model.service";
import { CommonModule } from "@angular/common";
import { ModuleWithProviders, NgModule } from "@angular/core";
import { CourierService } from "./courier.service";
import { NavigationService } from "./navigation.service";

export const SERVICES = [
  DeliveryService,
  NavigationService,
  MessagingService,
  ViewModelService,
  CourierService,
];

@NgModule({
  imports: [
    CommonModule,
  ],
  providers: [
    ...SERVICES,
  ],
})
export class ServiceModule {
  static forRoot(): ModuleWithProviders {
    return <ModuleWithProviders>{
      ngModule: ServiceModule,
      providers: [
        ...SERVICES,
      ],
    };
  }
}
