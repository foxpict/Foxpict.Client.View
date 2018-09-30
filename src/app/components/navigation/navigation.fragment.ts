import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { MessagingService } from '../../service/messaging.service';
import { DeliveryService } from '../../service/delivery.service';
import { ViewModel } from '../../service/viewmodel';
import { IpcUpdatePropResponse } from '../../service/contract/response.contract';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.fragment.html',
  styleUrls: ['./navigation.fragment.scss']
})
export class NavigationFragment implements OnInit {
  @ViewChild('sidenav') sidenav: ElementRef;

  clicked: boolean;

  constructor(
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
