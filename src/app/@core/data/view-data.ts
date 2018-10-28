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
