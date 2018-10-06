import { Component } from '@angular/core';
import { HttpClientService } from './http-client.service';
import { Observable, Subscription } from 'rxjs';
import 'rxjs/add/observable/interval';
import { MessagingService } from './service/messaging.service';
import { IpcResponse } from './service/contract/response.contract';
import { DeliveryService } from './service/delivery.service';

export interface PseudoNotificationResponse {
  messages: PseudoNotificationItem[];
}
export interface PseudoNotificationItem {
  eventName: string;
  data: IpcResponse;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'app';
  subscription: Subscription | null;

  constructor(private httpClientService: HttpClientService,
    private messaging: MessagingService,
    private delivery: DeliveryService
  ) { }



  onIpcSend_TrnsTopscreen() {
    // BFFにIPCメッセージを送信する
    this.delivery.transTopScreen();
  }
}

