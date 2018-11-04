import { Content } from "./model/content";
import { Category } from "./model/category";
import { Label } from ".";

export interface IpcResponse {
  body: string;
}


export interface CategoryDetailResponse {
  Category: Category;
  SubCategory: Category[];
  Content: Content[];
}

export interface ContentDetailResponse {
  Content: Content;
  Category: Category;
}

/**
 * プロパティデータ更新メッセージによるContentList更新で受け取るパラメータ
 */
export interface ContentListParam {
  Category: Category | null;
  ContentList: Content[];
}

/**
 * IPC_UPDATEPROPイベントのパラメータ
 */
export interface IpcUpdatePropResponse {
  PropertyName: string;
  Hint: string;
  Value: any;
}

/**
 * PropertyNameがCategoryList
 */
export interface CategoryListUpdateProp {
  CategoryList: Category[];
}

/**
 *
 */
export interface PreviewContentProp {
  Content: Content;
  Category: Category;
}

/**
 * "IPC_UPDATEVIEW"メッセージの本文
 */
export interface IpcUpdateViewResponse {
  /** 表示更新リスト */
  UpdateList: UpdateViewRequestItem[];

  /** パラメータ */
  Parameter: object;

  /** 遷移先画面名称 */
  NextScreenName: string; // 空文字の場合もあります
}

export interface UpdateViewRequestItem {
  ScreenName: string;
  UpdateType: string;
}

/**
 *
 */
export interface UpdateCategoryListParam {
  /**
   * 絞り込み条件とするラベルIDリスト
   */
  LabelId?: number[];
}

/**
 *
 */
export interface UpdateContentListParam {
  /**
   *
   */
  ContentId?: number;

  /**
   *
   */
  LabelId?: number;
}

export interface PseudoNotificationResponse {
  messages: PseudoNotificationItem[];
}

export interface PseudoNotificationItem {
  eventName: string;
  data: IpcResponse;
}

export interface PreviewInfo {
  TotalNum: number;
  CurrentPos: number;
}
