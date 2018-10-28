import { Component, OnInit } from '@angular/core';
import { ViewModelService } from 'src/app/@core/service/view-model.service';
import { Category } from 'src/app/@core/data';
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
}
