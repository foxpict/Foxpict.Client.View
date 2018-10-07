import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { MessagingService } from '../../service/messaging.service';
import { DeliveryService } from '../../service/delivery.service';
import { ViewModel } from '../../service/viewmodel';
import { IpcUpdatePropResponse } from '../../service/contract/response.contract';
import { Subscription, Observable } from 'rxjs';
import { HttpClientService } from '../../http-client.service';
import { PseudoNotificationResponse } from '../../app.component';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.fragment.html',
  styleUrls: ['./navigation.fragment.scss']
})
export class NavigationFragment implements OnInit {
  @ViewChild('sidenav') sidenav: ElementRef;

  clicked: boolean;

  constructor(
    private httpClientService: HttpClientService,
    private messaging: MessagingService,
    private delivery: DeliveryService,
    public viewModel: ViewModel) {
    this.clicked = this.clicked === undefined ? false : true;
  }

  ngOnInit() {
  }

  setClicked(val: boolean): void {
    this.clicked = val;
  }

  subscription: Subscription | null;

  /**
   * MOCKBFFからコンテント一覧を読み込む
   */
  onLoadContentList(): void {
    this.httpClientService.intermittentParameterQuery = "mode=1";
  }

  /**
   * MOCKBFFからプレビューを読み込む
   */
  onLoadPreview(): void {
    this.httpClientService.intermittentParameterQuery = "mode=2";
  }

  /**
   *
   */
  onLoadCategoryTree(): void {
    this.viewModel.screenStatus.showFinder();
    this.httpClientService.intermittentParameterQuery = "mode=3";
  }

  onIntermittent(): void {
    // 定期的な通知メッセージの取得を開始する。
    console.info("onIntermittent");

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

  /**
   * 戻る遷移ボタン押下
   */
  onBACK() {
    this.delivery.backScreen();
  }

  // サンプル
  // ボタン押下で、InvalidatePropイベントを発生させる
  onDebugBasicButton() {
    console.info("onDebugBasicButton");
    let obj: IpcUpdatePropResponse = {
      PropertyName: "TEST Propety Name",
      Hint: "HINT",
      Value: "VALUE"
    };
    //this.messaging.fireInvalidateProp(obj); // このデバッグコマンドは無効化しました
  }

  /**
   * サンプル
   */
  onTRNS_TOPSCREEN() {
    console.info("onTRNS_TOPSCREEN");

    this.delivery.transTopScreen();
  }

  /**
   * サンプル
   */
  onACT_REQINVALIDATE_CATEGORYTREE() {
    console.info("onACT_REQINVALIDATE_CATEGORYTREE");
    this.delivery.updateCategoryTree(1);
  }

  /**
   * (Debug)ファインダ画面へ遷移する
   */
  onTrnsFinder() {
    this.delivery.showFinder();
  }

  /**
   * サンプル
   */
  onDebugBasicButton2() {
    console.info("onDebugBasicButton2");

    this.delivery.executeDebugCommand("Nanikaなにか");
  }

  /**
   * (DEBUG)ルート状態に強制遷移します
   */
  onDebugTransrationRoot() {
    this.delivery.transRootBack();
  }

}
