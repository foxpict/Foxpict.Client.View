import { Component, EventEmitter, Output, AfterViewChecked, AfterViewInit } from "@angular/core";
import { ViewModel, ContentListPageItem } from "../../../service/viewmodel";
import { DeliveryService } from "../../../service/delivery.service";
import { ItemListSelectEventArg } from "../../../event";
import { Category } from "../../../model/category.model";

@Component({
  selector: 'explorer-list',
  templateUrl: './explorer-list.fragment.html',
  styleUrls: ['./explorer-list.fragment.scss']
})
export class ExplorerListFragment implements AfterViewInit {
  private LOGEVENT: string = "[Foxpict][ExplorerListFragment]";

  @Output("item-select")
  private itemSelectedMessage = new EventEmitter();

  /**
   * コンストラクタ
   * @param viewmodel ViewModel
   */
  constructor(private viewmodel: ViewModel,
    private delivery:DeliveryService) {

  }

  ngAfterViewInit() {

  }

  onClick(item: ContentListPageItem, position: number) {
    console.debug(this.LOGEVENT + "[onClick] - IN", item, "選択位置", position);
    this.itemSelectedMessage.next(new ItemListSelectEventArg(this, item, position));
    console.debug(this.LOGEVENT + "[onClick] - OUT");
  }

  showContentList(category: Category) {
    this.delivery.updateContentList({ ContentId: category.Id });
  }
}
