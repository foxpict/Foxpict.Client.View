import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import {
  IpcUpdatePropResponse,
  CategoryListUpdateProp,
  Content,
  IpcUpdateViewResponse,
  Category,
  ThumbnailListPageItem,
  ContentListPageItem,
  ContentListParam,
  ExplorerSplitCategoryListItem,
  PreviewInfo,
  Label,
  ExplorerSplitLabelListItem,
} from "../data";
import { ViewModelService } from "./view-model.service";
import { DomSanitizer } from "@angular/platform-browser";

/**
 * クーリエサービス
 */
@Injectable()
export class CourierService {
  private LOGEVENT: string = "[Foxpict][CourierService]";

  /**
   *  IPC_INVALIDATEPROPメッセージの内部通知用イベント
   */
  invalidateProp$ = new BehaviorSubject<IpcUpdatePropResponse>(undefined);

  /**
   * IPC_UPDATEVIEWメッセージの内部通知用イベント
   */
  updateView$ = new BehaviorSubject<IpcUpdateViewResponse>(undefined);

  /** */
  private internalIpcUpdatePropResponse: IpcUpdatePropResponse;

  /** */
  private internalIpcUpdateViewResponse: IpcUpdateViewResponse;

  /**
   * invalidatePropイベントのパラメータを取得する
   */
  private get invalidateObject(): IpcUpdatePropResponse { return this.internalIpcUpdatePropResponse; }

  /**
   * invalidatePropイベントを発火する
   */
  private set invalidateObject(response: IpcUpdatePropResponse) {
    this.invalidateProp$.next(response);
    this.internalIpcUpdatePropResponse = response;
  }

  private get updateView(): IpcUpdateViewResponse { return this.internalIpcUpdateViewResponse; }

  private set updateView(response: IpcUpdateViewResponse) {
    this.updateView$.next(response);
    this.internalIpcUpdateViewResponse = response;
  }

  /**
   * コンストラクタ
   */
  constructor(
    private viewModel: ViewModelService,
    private sanitizer: DomSanitizer
  ) {
    // NOTE: 各イベントのsubscribeは、ここで追加する（メンバ化しない）

    this.invalidateProp$.subscribe((response: IpcUpdatePropResponse) => {
      if (response == undefined) return;

      console.debug(this.LOGEVENT, "[onInvalidateProp] ", response.PropertyName);

      switch (response.PropertyName) {
        case "CategoryTree":
          let targetCategoryId: number = +response.Hint;
          const categoryies: Category[] = JSON.parse(response.Value);
          this.updateViewModelExplorerSplitList(targetCategoryId, categoryies);
          break;
        case "ContentList":
          {
            let objValue = JSON.parse(response.Value) as ContentListParam;
            if (objValue != null) {
              this.updateContentList(objValue);
            } else {
              console.warn("プロパティを正常に復号化できませんでした");
            }
          }
          break;
        case "CategoryList":
          {
            let objValue = JSON.parse(response.Value) as CategoryListUpdateProp;
            if (objValue != null) {
              this.updateCategoryList(objValue);
            } else {
              console.warn("プロパティを正常に復号化できませんでした");
            }
          }
          break;
        case "LabelTree":
          //let targetCategoryId: number = +response.Hint;
          const labels: Label[] = JSON.parse(response.Value);
          this.updateViewModelExplorerLabelSplitList(labels);
          break;
        case "PreviewUrl":
          this.previewUrl(response);
          break;
        case "PreviewContent":
          this.viewModel.PreviewContent = JSON.parse(response.Value) as Content;
          break;
        case "PreviewContentLinkCategory":
          this.viewModel.PreviewContentLinkCategory = JSON.parse(response.Value) as Category;
          break;
        case "PreviewInfo":
          this.viewModel.PreviewInfo = JSON.parse(response.Value) as PreviewInfo;
          break;
        default:
          console.warn(this.LOGEVENT, "[invalidateProp$] 処理できないプロパティ名", response.PropertyName);
          break;
      }
    });
  }

  /**
   * InvalidateObjectイベントを発火する
   *
   * @param eventArgs
   */
  fireInvalidateProp(eventArgs: IpcUpdatePropResponse) {
    this.invalidateObject = eventArgs;
  }

  /**
   * UpdateViewイベントを発火します
   *
   * @param eventArgs
   */
  fireUpdateView(eventArgs: IpcUpdateViewResponse) {
    this.updateView = eventArgs;
  }

  /**
   * ViewModelを更新します
   *
   * @param objValue
   */
  private updateCategoryList(objValue: CategoryListUpdateProp) {
    console.debug(this.LOGEVENT, "[updateCategoryList] カテゴリ一覧を更新しました");

    this.viewModel.ThumbnailListPageItem = [];

    objValue.CategoryList.forEach((inprop: Category) => {
      let listitem = {} as ThumbnailListPageItem;
      listitem.Selected = false;
      listitem.Category = inprop;
      listitem.IsContent = true;
      if (inprop.HasLinkSubCategoryFlag) {
        listitem.IsSubCaetgory = true;
      } else {
        listitem.IsSubCaetgory = false;
      }
      this.viewModel.ThumbnailListPageItem.push(listitem);
    });
  }

  /**
   * ViewModelを更新します
   *
   * @param objValue
   */
  private updateContentList(objValue: ContentListParam) {
    console.debug(this.LOGEVENT, "[updateContentList] コンテント一覧を更新しました", objValue);

    this.viewModel.ContentListPageItem = [];

    objValue.ContentList.forEach((inprop: Content) => {
      let listitem = {} as ContentListPageItem;
      listitem.ThumbnailUrl = inprop.ThumbnailImageSrcUrl;
      listitem.Content = inprop;

      this.viewModel.ContentListPageItem.push(listitem);
    });
  }

  /**
   * エクスプローラー画面用ビューモデルを更新します。
   *
   * @param targetCategoryId
   * @param children
   */
  private updateViewModelExplorerSplitList(targetCategoryId: number, children: Category[]) {
    console.group(this.LOGEVENT + "[updateExplorerSplitList]");
    console.debug("[updateExplorerSplitList]", "IN");
    if (children.length != 0) {
      let index = this.viewModel.ExplorerSplitedListItems.findIndex((prop: ExplorerSplitCategoryListItem) => {
        if (prop.items != null &&
          prop.items.findIndex((prop2: Category) => prop2.Id === targetCategoryId) > -1) return true;
        return false;
      });

      let targetItems: ExplorerSplitCategoryListItem[] = this.viewModel.ExplorerSplitedListItems;

      // 更新対象がリストの末尾の場合は、新たな要素をリストへ追加する
      if (index + 1 == this.viewModel.ExplorerSplitedListItems.length) {
        // 新たな要素を末尾に追加する
        let item: ExplorerSplitCategoryListItem = {
          categoryId: targetCategoryId,
          items: children
        };
        targetItems.push(item);
      } else if (index == undefined) {
        // リストの要素をクリアして、新たなリストを作成する
        let item: ExplorerSplitCategoryListItem = {
          categoryId: targetCategoryId,
          items: children
        };
        let newArray = [];
        newArray.push(item);
        targetItems = newArray;
      } else {
        // indexより大きい要素を削除する
        // index位置の要素を更新する。
        let newArray = this.viewModel.ExplorerSplitedListItems.slice(0, index + 2);
        let lastItem: ExplorerSplitCategoryListItem = newArray[newArray.length - 1];
        lastItem.items = children;

        targetItems = newArray;
      }

      this.viewModel.ExplorerSplitedListItems = targetItems;
    } else {
      console.info("追加項目が空のため、新たな分割リストは登録しません。");
    }

    console.debug("[updateExplorerSplitList]", "OUT");
    console.groupEnd();
  }

  /**
   *
   * @param labels
   */
  private updateViewModelExplorerLabelSplitList(labels: Label[]) {
    console.group(this.LOGEVENT + "[updateViewModelExplorerLabelSplitList]");
    console.debug("[updateViewModelExplorerLabelSplitList]", "IN");

    let targetItems: ExplorerSplitLabelListItem[] = this.viewModel.ExplorerSplitedLabelListItems;
    targetItems.push(
      {
        items: labels
      }
    );
    this.viewModel.ExplorerSplitedLabelListItems = targetItems;

    console.debug("[updateViewModelExplorerLabelSplitList]", "OUT");
    console.groupEnd();
  }

  /**
   * PreviewUrlプロパティの更新します
   *
   * @param response
   */
  private previewUrl(response: IpcUpdatePropResponse) {
    let objValue = JSON.parse(response.Value) as string;
    this.viewModel.PreviewUrl = this.sanitizer.bypassSecurityTrustUrl(objValue);
  }
}

