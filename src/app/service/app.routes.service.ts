import { RouterModule, Route } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';
import { DashboardScreen } from '../components/screen/dashboard/dashboard.screen';
import { FinderScreen } from '../components/screen/finder/finder.screen';
import { PreviewScreen } from '../components/screen/preview/preview.screen';


const routes: Route[] = [
  { path: '', pathMatch: 'full', redirectTo: 'dashboards/v1' },
  { path: 'dashboards', children:
    [
      { path: 'v1', component: DashboardScreen },
     // { path: 'v1', component: PreviewScreen },
    ]
  },
  {
    path: 'finder', component: FinderScreen
  },
  {
    path: 'preview', component: PreviewScreen
  }
];

export const AppRoutes: ModuleWithProviders = RouterModule.forRoot(routes);
