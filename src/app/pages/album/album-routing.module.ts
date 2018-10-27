import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PreviewComponent } from './preview/preview.component';
import { ExplorerComponent } from './explorer/explorer.component';

const routes: Routes = [
  { path: 'preview', component: PreviewComponent },
  { path: 'explorer', component: ExplorerComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AlbumRoutingModule { }
