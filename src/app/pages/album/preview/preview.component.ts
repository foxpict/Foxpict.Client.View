import { Component, AfterViewInit } from '@angular/core';
import { ViewModelService } from 'src/app/@core/service/view-model.service';
import { PreviewParam } from 'src/app/@core/data';
import { DeliveryService } from 'src/app/@core/service/delivery.service';

@Component({
  selector: 'app-preview',
  templateUrl: './preview.component.html',
  styleUrls: ['./preview.component.scss']
})
export class PreviewComponent implements AfterViewInit {
  private LOGEVENT: string = "[Foxpict][PreviewComponent]";

  /**
   * コンストラクタ
   *
   * @param delivery
   * @param viewmodel
   */
  constructor(
    private delivery: DeliveryService,
    private viewmodel: ViewModelService,
  ) { }

  ngAfterViewInit(): void {
    // プレビューコンテント更新要求メッセージを送信する
    if (this.viewmodel.screenStatus.previewParam != null) {
      let previewParam = this.viewmodel.screenStatus.previewParam as PreviewParam
      if (previewParam.Position != undefined)
        this.delivery.invalidatePreviewContentList(previewParam.Position);
    }
  }
}
