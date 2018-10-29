import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { ViewModelService } from 'src/app/@core/service/view-model.service';
import { Category, ContentListPageItem } from 'src/app/@core/data';
import { DeliveryService } from 'src/app/@core/service/delivery.service';

@Component({
  selector: 'app-explorer',
  templateUrl: './explorer.component.html',
  styleUrls: ['./explorer.component.scss']
})
export class ExplorerComponent implements OnInit {
  private LOGEVENT: string = "[Foxpict][ExplorerComponent]";

  fruits: string[] = [
    'Lemons',
    'Raspberries',
    'Strawberries',
    'Blackberries',
    'Kiwis',
    'Grapefruit',
    'Avocado',
    'Watermelon',
    'Cantaloupe',
    'Oranges',
    'Peaches',
  ];

  constructor(
    private viewModel: ViewModelService,
    private delivery: DeliveryService,
  ) { }

  ngOnInit() {
  }

  selectedListItem(item: any) {
    console.group(this.LOGEVENT + "[selectedListItem]");
    let category: Category = item; // 表示しているリストの項目は（カテゴリ情報のリストのはずなので）、any型をCategoryインターフェースとして処理する
    console.debug("[selectedListItem]", "アイテムが選択されました。", item);
    this.delivery.updateCategoryTree(category.Id);
    console.groupEnd();
  }

  selectedListItemDisplayContent(item: any) {
    console.group(this.LOGEVENT + "[selectedListItemDisplayContent]");
    let category: Category = item; // 表示しているリストの項目は（カテゴリ情報のリストのはずなので）、any型をCategoryインターフェースとして処理する
    console.debug("[selectedListItemDisplayContent]", "アイテムが選択されました。", item);

    this.delivery.updateContentList({ ContentId: category.Id });

    console.groupEnd();
  }


  showPreview(item: ContentListPageItem, position: number) {
    console.debug(this.LOGEVENT + "[onClick] - IN", item, "選択位置", position);

    this.delivery.showScreenPreview(position);

    console.debug(this.LOGEVENT + "[onClick] - OUT");
  }
}
