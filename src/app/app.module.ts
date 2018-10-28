import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { ThemeModule } from './@theme/themes.module';
import { AppRoutingModule } from './app-routing.module';
import { CoreModule } from './@core/core.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,

    NgbModule.forRoot(),

    // App Modules
    ThemeModule.forRoot(),
    CoreModule.forRoot(),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
