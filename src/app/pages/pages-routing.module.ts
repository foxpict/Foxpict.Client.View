import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PagesComponent } from './pages.component';

const routes: Routes = [{
  path: '',
  component: PagesComponent,
  children: [
    {
      path: 'dashboard', loadChildren: './dashboard/dashboard.module#DashboardModule'
    },
    {
      path: 'album', loadChildren: './album/album.module#AlbumModule'
    },
    {
      path: '', redirectTo: 'dashboard'
    }
  ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule { }
