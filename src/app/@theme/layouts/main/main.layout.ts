import { Component } from "@angular/core";
import { DeliveryService } from "src/app/@core/service/delivery.service";
import { HttpClientService } from "src/app/@core/utils/http-client.service";
import { Subscription, interval } from "rxjs";
import { MessagingService } from "src/app/@core/service/messaging.service";
import { PseudoNotificationResponse } from "src/app/@core/data";
import { Router } from "@angular/router";
import { ViewModelService } from "src/app/@core/service/view-model.service";

@Component({
  selector: 'app-main-layout',
  styleUrls: ['./main.layout.scss'],
  templateUrl: './main.layout.html'
})
export class MainLayoutComponent {

  subscription: Subscription | null;

  constructor(
    public viewmodel: ViewModelService,
    private router: Router,
    private delivery: DeliveryService,
    private messaging: MessagingService,
    private httpClientService: HttpClientService,
  ) {

  }

  /**
   * デバッグ用に、メイン画面のイベントハンドラとして定義する
   */
  onIntermittent(): void {
    // 定期的な通知メッセージの取得を開始する。
    //console.info("onIntermittent");

    // TODO: 下記を適切な場所から実行するようにする（専用のサービスを作成する）
    if (this.subscription != null) {
      console.info("Stop intermittent");
      this.subscription.unsubscribe();
      this.subscription = null;
    } else {
      console.info("Start intermittent");
      this.subscription = interval(1000)
        .subscribe(() => {
          this.httpClientService.intermittent()
            .then(
              (response) => {
                //console.info("intermittent");
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

  /**
   * デバッグ用に、メイン画面のイベントハンドラとして定義する
   */
  sendRootback() {
    console.log("sendRootback");
    this.delivery.transRootBack();
  }

  /**
   * デバッグ用に、メイン画面のイベントハンドラとして定義する
   */
  sendTransTopScreen() {
    console.log("sendTransTopScreen");
    this.delivery.transTopScreen();
  }

  /**
   * デバッグ用に、ファインダー画面を表示する
   */
  sendTransFinder() {
    console.log("sendTransFinder");
    this.delivery.showFinder();
  }

  /**
   * デバッグ用に、メイン画面のイベントハンドラとして定義する
   */
  sendACT_REQINVALIDATE_CATEGORYTREE() {
    console.info("sendACT_REQINVALIDATE_CATEGORYTREE");
    this.delivery.updateCategoryTree(1);
  }

  sendACT_REQINVALIDATE_LABELTREE() {
    console.info("sendACT_REQINVALIDATE_LABELTREE");
    this.delivery.updateLabelTree(0);
  }

  navigateAlbumPreview() {
    this.router.navigate(['pages', 'album', 'preview']);
  }
}
