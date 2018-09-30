import { NgModule, NgZone, NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppComponent } from './app.component';
import { NavigationModule } from './components/navigation/navigation.module';
import { ScreenModule } from './components/screen/screen.module';

import { FragmentModule } from './components/fragment/fragment.module';
import { AppRoutes } from './service/app.routes.service';
import { SharedModule } from './shared/shared.module';
import { HttpClientModule } from '@angular/common/http';
import { HttpClientService } from './http-client.service';
import { NaviService } from './service/navi.service';
import { MatMaterialModule } from './mat-material/mat-material.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutes,
    MatMaterialModule,
    SharedModule,
    NavigationModule,
    FragmentModule,
    ScreenModule,
    HttpClientModule
  ],
  providers: [HttpClientService],
  bootstrap: [AppComponent],
  schemas: [NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule {
  constructor(
    private navi: NaviService
  ) {

  }
}
