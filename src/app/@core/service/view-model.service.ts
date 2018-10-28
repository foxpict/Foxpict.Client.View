import { Injectable } from '@angular/core';
import { Content, ThumbnailListPageItem, ContentListPageItem } from '../data';
import { SafeUrl } from '@angular/platform-browser';

@Injectable()
export class ViewModelService {

  constructor() { }

  /**
   * サムネイル一覧画面のコンテント情報リスト
   */
  ContentListPageItem: ContentListPageItem[] = [];

  /**
   * プレビュー画面に表示するコンテント情報
   */
  PreviewContent: Content | null = null;

  /**
   * プレビュー画面の画像URL
   */
  PreviewUrl: SafeUrl = null;

  /**
   * サムネイル一覧画面のサムネイル付きカテゴリ情報リスト
   */
  ThumbnailListPageItem: ThumbnailListPageItem[] = [];
}
