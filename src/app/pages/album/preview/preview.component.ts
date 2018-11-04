import { Component, AfterViewInit, ViewChild, TemplateRef, OnInit } from '@angular/core';
import { ViewModelService } from 'src/app/@core/service/view-model.service';
import { PreviewParam } from 'src/app/@core/data';
import { DeliveryService } from 'src/app/@core/service/delivery.service';

@Component({
  selector: 'app-preview',
  templateUrl: './preview.component.html',
  styleUrls: ['./preview.component.scss']
})
export class PreviewComponent implements OnInit, AfterViewInit {

  private LOGEVENT: string = "[Foxpict][PreviewComponent]";

  /**
   * テンプレートから「#pain」でマークしているng-templateを取得する
   */
  @ViewChild('pain')
  pain: TemplateRef<any> = null;

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

  ngOnInit(): void {
    this.viewmodel.pain = this.pain;
  }

  ngAfterViewInit(): void {
    // プレビューコンテント更新要求メッセージを送信する
    if (this.viewmodel.screenStatus.previewParam != null) {
      let previewParam = this.viewmodel.screenStatus.previewParam as PreviewParam
      if (previewParam.Position != undefined)
        this.delivery.invalidatePreviewContentList(previewParam.Position);
    }
  }

  /**
   * ペインからのイベントハンドラ呼び出しサンプル
   */
  prevPage() {
    console.log("prevPage");
    this.delivery.invalidatePreviewContentListPrev();
  }

  nextPage() {
    console.log("nextPage");
    this.delivery.invalidatePreviewContentListNext();
  }
}
