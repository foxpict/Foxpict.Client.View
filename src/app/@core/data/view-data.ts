import { Category, Content } from ".";

export interface ThumbnailListPageItem {
  Selected: boolean;
  Category: Category;
  IsContent: boolean;
  IsSubCaetgory: boolean;
}

export interface ContentListPageItem {
  ThumbnailUrl: string;
  Content: Content;
}

export interface PreviewParam {
  Position: number | null;
}

export interface ExplorerSplitListItem {

  /**
   * 親カテゴリのID
   */
  categoryId: number;

  /**
   * リストに表示するカテゴリ一覧
   */
  items: Category[];
}
