import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";
import { FormsModule } from "@angular/forms";
import { BrowserModule } from "@angular/platform-browser";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { SharedModule } from "../../shared/shared.module";
import { FooterFragment } from "./footer/footer.fragment";
import { CategoryTreeFragment } from "./category-tree/category-tree.fragment";
import { LabelTreeFragment } from "./label-tree/label-tree.fragment";
import { ExplorerListFragment } from "./explorer-list/explorer-list.fragment";
import { ContentPreviewFragment } from "./content-preview/content-preview.fragment";


@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    BrowserModule,
    BrowserAnimationsModule,
    SharedModule
  ],
  declarations: [
    FooterFragment,
    CategoryTreeFragment,
    LabelTreeFragment,
    ExplorerListFragment,
    ContentPreviewFragment,
  ],
  exports: [
    FooterFragment,
    CategoryTreeFragment,
    LabelTreeFragment,
    ExplorerListFragment,
    ContentPreviewFragment,
  ],
  schemas: [NO_ERRORS_SCHEMA]
})
export class FragmentModule { }
