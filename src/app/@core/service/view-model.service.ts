import { Injectable, TemplateRef } from '@angular/core';
import {
  Content,
  ThumbnailListPageItem,
  ContentListPageItem,
  ExplorerSplitCategoryListItem,
  PreviewParam,
  PreviewInfo,
  Category,
  ExplorerSplitLabelListItem,
} from '../data';
import { SafeUrl } from '@angular/platform-browser';

@Injectable()
export class ViewModelService {

  constructor() { }

  /** ペインのテンプレート */
  pain: TemplateRef<any> = null;

  /** 画面表示状態 */
  screenStatus: ScreenStatus = new ScreenStatus();

  /**
   * サムネイル一覧画面のコンテント情報リスト
   */
  ContentListPageItem: ContentListPageItem[] = [];

  /**
   * プレビュー画面に表示するコンテント情報
   */
  PreviewContent: Content | null = null;

  /**
   *
   */
  PreviewContentLinkCategory: Category | null = null;

  /**
   * プレビュー画面の情報
   */
  PreviewInfo: PreviewInfo | null = null;

  /**
   * プレビュー画面の画像URL
   */
  PreviewUrl: SafeUrl = null;

  /**
   * サムネイル一覧画面のサムネイル付きカテゴリ情報リスト
   */
  ThumbnailListPageItem: ThumbnailListPageItem[] = [];

  /**
   * エクスプローラー画面の分割リストです
   *
   * 各要素が分割リストUIコンテナの1つのコンテナと対応します。
   */
  ExplorerSplitedListItems: ExplorerSplitCategoryListItem[] = [];

  /**
   * エクスプローラー画面の分割リストです
   */
  ExplorerSplitedLabelListItems: ExplorerSplitLabelListItem[] = [];
}


/**
 * 画面表示状態
 */
export class ScreenStatus {
  previewParam: PreviewParam = null;

  /**
   * ダッシュボード画面の表示を行う
   */
  showDashboard() {
    this.clear();
    this.dashboard = true;
  }

  /**
   * ファインダ画面の表示を行う
   */
  showFinder() {
    this.clear();
    this.finder = true;
  }

  /**
   * プレビュー画面の表示を行う
   *
   * @param param プレビュー画面に渡すパラメータ(PreviewParam対応型)
   */
  showPreview(param: object) {
    let paramObj = param as PreviewParam;
    this.previewParam = paramObj;

    this.clear();
    this.preview = true;
  }

  /**
   *
   */
  showPreviewContentList() {
    this.clear();
    this.preview_contentlist = true;
  }

  private clear() {
    this.dashboard = false;
    this.preview = false;
    this.preview_contentlist = false;
    this.finder = false;
  }

  /** ダッシュボード画面 */
  private dashboard: boolean = false;

  /** プレビュー画面 */
  private preview: boolean = false;

  /** コンテントリストプレビュー画面 */
  private preview_contentlist: boolean = false;

  /** 一覧画面 */
  private finder: boolean = false;
}
