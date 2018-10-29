import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { CourierService } from './courier.service';
import { ViewModelService } from './view-model.service';
import { IpcUpdateViewResponse } from '../data';

@Injectable()
export class NavigationService {

  private LOGEVENT: string = "[Foxpict][NaviService]";

  constructor(
    private router: Router,
    private courier: CourierService,
    private viewmodel: ViewModelService,
  ) {
    this.courier.updateView$.subscribe((response: IpcUpdateViewResponse) => {
      if (response == undefined) return;
      console.group(this.LOGEVENT + "[updateView$]");
      let screenName = response.NextScreenName;
      console.debug(this.LOGEVENT, "[UpdateView$] ScreenName:", screenName);
      switch (screenName) {
        case "Finder":
          this.viewmodel.screenStatus.showFinder();
          this.router.navigate(['/pages/album/explorer']);
          break;
        case "Preview":
          this.viewmodel.screenStatus.showPreview({});
          this.router.navigate(['/pages/album/preview']);
          break;
        case "ContentListPreview":
          this.viewmodel.screenStatus.showPreview({
            Position: parseInt(String(response.Parameter))
          });
          this.router.navigate(['/pages/album//preview']);
          break;
        default:
          console.warn(this.LOGEVENT, "[UpdateView$] 未定義の画面名", screenName);
          break;
      }
      console.groupEnd();
    })
  }
}
