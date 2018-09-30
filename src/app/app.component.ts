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

  onClicked() {
    // 定期的な通知メッセージの取得を開始する。
    console.info("onClicked");

    // TODO: 下記を適切な場所から実行するようにする（専用のサービスを作成する）
    if (this.subscription != null) {
      console.info("Stop intermittent");
      this.subscription.unsubscribe();
      this.subscription = null;
    } else {
      console.info("Start intermittent");
      this.subscription = Observable.interval(5000)
        .subscribe(() => {
          this.httpClientService.intermittent()
            .then(
              (response) => {
                console.info("intermittent");
                const m: PseudoNotificationResponse = response;
                m.messages.forEach((_, i) => {
                  this.messaging.localSend(_.eventName, _.data);
                });
              })
            .catch(
              (error) => console.log(error)
            );
        });
    }
  }

  onIpcSend_TrnsTopscreen() {
    // BFFにIPCメッセージを送信する
    this.delivery.transTopScreen();
  }
}

