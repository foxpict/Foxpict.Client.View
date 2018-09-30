import { DeliveryService } from "../service/delivery.service";
import { Category } from "../model/category.model";
import { Label } from "../model/label.model";


/**
 * カテゴリツリーノード
 */
export class DynamicFlatNode {
  /**
   * ノードが開かれてるかフラグ
   */
  opened: boolean = false;

  /**
   * コンストラクタ
   *
   * @param item
   * @param level
   * @param expandable
   * @param isLoading
   */
  constructor(
    private delivery: DeliveryService | null,
    public item: Category,
    public level = 1,
    public expandable = false,
    public isLoading = false) {
  }

  showContentList() {
    console.info("ノードボタンをクリック ", this.item.Id);
    if (this.delivery != null) {
      this.delivery.updateContentList({ ContentId: this.item.Id });
    }
  }
}

export class LabelTreeFlatNode {
  /**
 * ノードが開かれてるかフラグ
 */
  opened: boolean = false;

  /**
   * コンストラクタ
   *
   * @param item
   * @param level
   * @param expandable
   * @param isLoading
   */
  constructor(
    private delivery: DeliveryService | null,
    public item: Label,
    public level = 1,
    public expandable = false,
    public isLoading = false) {
  }

  showContentList() {
    console.info("ノードボタンをクリック ", this.item.Id);
    if (this.delivery != null) {
      this.delivery.updateContentList({ LabelId: this.item.Id });
    }
  }

  showCategoryList() {
    console.info("ノードボタンをクリック ", this.item.Id);
    if (this.delivery != null) {
      this.delivery.updateCategoryList({ LabelId: this.item.Id });
    }
  }
}
