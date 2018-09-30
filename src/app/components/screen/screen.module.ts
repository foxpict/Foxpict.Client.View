import { DashboardScreen } from "./dashboard/dashboard.screen";
import { NgModule, NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
import { SharedModule } from "../../shared/shared.module";
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";
import { FormsModule } from "@angular/forms";
import { BrowserModule } from "@angular/platform-browser";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { FragmentModule } from "../fragment/fragment.module";
import { PreviewScreen } from "./preview/preview.screen";
import { FinderScreen } from "./finder/finder.screen";

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    BrowserModule,
    BrowserAnimationsModule,
    SharedModule,
    FragmentModule
  ],
  declarations: [
    DashboardScreen,
    FinderScreen,
    PreviewScreen,
  ],
  exports: [
    DashboardScreen,
    FinderScreen,
    PreviewScreen,
  ],
  //schemas: [NO_ERRORS_SCHEMA]
})
export class ScreenModule { }
