import { OnInit, OnDestroy, Component, Injectable } from "@angular/core";
import { FlatTreeControl } from "@angular/cdk/tree";
import { BehaviorSubject, Subscription, Observable, merge } from "rxjs";
import { Label } from "../../../model/label.model";
import { SelectionChange, CollectionViewer } from "@angular/cdk/collections";
import { map } from "rxjs/operators";
import { LabelTreeFlatNode } from "../../../utils/dynamic-flat-node";
import { DeliveryService } from "../../../service/delivery.service";
import { CourierService } from "../../../service/courier.service";
import { ViewModel } from "../../../service/viewmodel";
import { IpcUpdatePropResponse } from "../../../service/contract/response.contract";

@Injectable()
export class DynamicLabelDataSource {
  private LOGEVENT: string = "[Foxpict][DynamicLabelDataSource]";


  /**
   * 初回読み込みフラグ
   */
  initialLoadFlag: Boolean = false;

  dataChange = new BehaviorSubject<LabelTreeFlatNode[]>([]);

  invalidateProp: Subscription | null;

  get data(): LabelTreeFlatNode[] { return this.dataChange.value; }
  set data(value: LabelTreeFlatNode[]) {
    this.treeControl.dataNodes = value;
    this.dataChange.next(value);
  }

  /**
   * コンストラクタ
   *
   * @param treeControl
   * @param viewmodel
   * @param messaging メッセージングサービス
   * @param delivery デリバリーサービス
   */
  constructor(
    private treeControl: FlatTreeControl<LabelTreeFlatNode>,
    private viewmodel: ViewModel,
    private courier: CourierService,
    private delivery: DeliveryService
  ) {

    this.invalidateProp = this.courier.invalidateProp$.subscribe(
      (response: IpcUpdatePropResponse) => {
        if (response == undefined) return;
        if (response.PropertyName != "LabelTree") return;

        console.info(this.LOGEVENT, "[invalidateProp$] IN", response);
        let categoryId_parent: number = +response.Hint;
        const cat: Label[] = JSON.parse(response.Value);

        if (this.initialLoadFlag) {
          console.info(this.LOGEVENT, "[invalidateProp$] 初回読み込み");
          const nodes = cat.map(prop =>
            new LabelTreeFlatNode(delivery, prop, 0, prop.HasLinkSubLabelFlag));
          this.data = nodes;
          this.initialLoadFlag = false;
        } else {
          const node = this.getNode(categoryId_parent);
          const index = this.data.indexOf(node); // 子階層を追加する親階層ノードのFlatNodeList内の位置を取得する
          if (cat.length == 0 || index < 0) { // If no children, or cannot find the node, no op
            return;
          }


          const nodes = cat.map(prop =>
            new LabelTreeFlatNode(delivery, prop, node.level + 1, prop.HasLinkSubLabelFlag));
          this.data.splice(index + 1, 0, ...nodes);

          // notify the change
          this.dataChange.next(this.data);
          node.isLoading = false;
        }
        this.viewmodel.LabelTreeNodes = this.data; // 現在のノード配列をViewModelでキャッシュする
      }
    );
  }

  dispose() {
    if (this.invalidateProp != null) {
      this.invalidateProp.unsubscribe();
    }
  }

  connect(collectionViewer: CollectionViewer): Observable<LabelTreeFlatNode[]> {
    this.treeControl.expansionModel.onChange!.subscribe(change => {
      if ((change as SelectionChange<LabelTreeFlatNode>).added ||
        (change as SelectionChange<LabelTreeFlatNode>).removed) {
        this.handleTreeControl(change as SelectionChange<LabelTreeFlatNode>);
      }
    });

    return merge(collectionViewer.viewChange, this.dataChange).pipe(map(() => this.data));
  }

  /** Handle expand/collapse behaviors */
  handleTreeControl(change: SelectionChange<LabelTreeFlatNode>) {
    if (change.added) {
      change.added.forEach(node => this.toggleNode(node, true));
    }
    if (change.removed) {
      change.removed.slice().reverse().forEach(node => this.toggleNode(node, false));
    }
  }

  /**
   * カテゴリIDからノードを取得する
   *
   * @param categoryId
   */
  getNode(categoryId: number): LabelTreeFlatNode {
    return this.data.find(prop => prop.item.Id == categoryId);
  }

  /**
   *
   */
  initializeLabelLoad() {
    console.info(this.LOGEVENT, "[initializeLabelLoad] IN");
    this.initialLoadFlag = true;
    this.delivery.updateLabelTree(0); // ルートノード固定
    console.info(this.LOGEVENT, "[initializeLabelLoad] OUT");
  }

  /**
   * Toggle the node, remove from display list
   */
  toggleNode(node: LabelTreeFlatNode, expand: boolean) {
    console.info(this.LOGEVENT, "[toggleNode] IN", expand, node);

    node.isLoading = true;

    if (expand) {
      node.opened = true;
      this.delivery.updateLabelTree(node.item.Id); // カテゴリツリー取得呼び出し
    } else {
      setTimeout(() => {
        const index = this.data.indexOf(node); // 子階層を追加する親階層ノードのFlatNodeList内の位置を取得する
        let count = 0;
        for (let i = index + 1; i < this.data.length
          && this.data[i].level > node.level; i++ , count++) { }
        this.data.splice(index + 1, count);

        // notify the change
        this.dataChange.next(this.data);
        node.opened = false;
        node.isLoading = false;

        this.viewmodel.LabelTreeNodes = this.data; // 現在のノード配列をViewModelでキャッシュする
      }, 500);
    }

    console.info(this.LOGEVENT, "[toggleNode] OUT");
  }
}

@Component({
  selector: 'label-tree',
  templateUrl: './label-tree.fragment.html',
  styleUrls: ['./label-tree.fragment.scss']
})
export class LabelTreeFragment implements OnInit, OnDestroy {
  private LOGEVENT: string = "[Foxpict][LabelTreeFragment]";

  treeControl: FlatTreeControl<LabelTreeFlatNode>;

  dataSource: DynamicLabelDataSource;

  getLevel = (node: LabelTreeFlatNode) => node.level;

  isExpandable = (node: LabelTreeFlatNode) => node.expandable;

  hasChild = (_: number, _nodeData: LabelTreeFlatNode) => _nodeData.expandable;

  /**
   * コンストラクタ
   *
   * @param courier
   * @param delivery
   * @param viewmodel
   */
  constructor(
    private courier: CourierService,
    private delivery: DeliveryService,
    private viewmodel: ViewModel
  ) {

  }

  ngOnDestroy(): void {
    console.debug(this.LOGEVENT, "[ngOnDestroy] IN");
    this.dataSource.dispose();
  }

  ngOnInit(): void {
    console.debug(this.LOGEVENT, "[ngOnInit] IN");

    this.treeControl = new FlatTreeControl<LabelTreeFlatNode>(this.getLevel, this.isExpandable);
    this.dataSource = new DynamicLabelDataSource(this.treeControl, this.viewmodel, this.courier, this.delivery);

    if (this.viewmodel.LabelTreeNodes == null) {
      this.dataSource.initializeLabelLoad();
    } else {
      this.dataSource.data = this.viewmodel.LabelTreeNodes;

      // 開かれているノードは、expandメソッドを適応する
      for (const node of this.viewmodel.LabelTreeNodes) {
        if (node.opened) {
          this.treeControl.expand(node);
        }
      }
    }
  }
}
