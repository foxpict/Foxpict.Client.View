import { NgModule } from '@angular/core';

import { AlbumRoutingModule } from './album-routing.module';
import { PreviewComponent } from './preview/preview.component';
import { ThemeModule } from 'src/app/@theme/themes.module';
import { ExplorerComponent } from './explorer/explorer.component';

@NgModule({
  imports: [
    ThemeModule,
    AlbumRoutingModule
  ],
  declarations: [PreviewComponent, ExplorerComponent]
})
export class AlbumModule { }
