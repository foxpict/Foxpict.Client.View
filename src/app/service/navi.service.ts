import { Injectable } from "@angular/core";
import { IpcUpdateViewResponse } from "./contract/response.contract";
import { CourierService } from "./courier.service";
import { ViewModel } from "./viewmodel";
import { Router } from "@angular/router";

@Injectable()
export class NaviService {
  private LOGEVENT: string = "[Foxpict][NaviService]";

  /**
   * コンストラクタ
   *
   * @param courierSrv
   * @param viewModel
   */
  constructor(
    private route: Router,
    private courierSrv: CourierService,
    private viewModel: ViewModel
  ) {
    this.courierSrv.updateView$.subscribe((response: IpcUpdateViewResponse) => {
      if (response == undefined) return;

      console.debug(this.LOGEVENT, "[UpdateView$] - IN");
      console.debug(this.LOGEVENT, "[UpdateView$] レスポンス:", response);

      let screenName = response.NextScreenName;
      console.debug(this.LOGEVENT, "[UpdateView$] ScrrenName:", screenName);

      switch (screenName) {
        case "Dashboard":
          this.viewModel.screenStatus.showDashboard();
          this.route.navigate(['/dashboards/v1']);
          break;
        case "Finder":
          this.viewModel.screenStatus.showFinder();
          this.route.navigate(['/finder']);
          break;
        case "Preview":
          this.viewModel.screenStatus.showPreview({});
          this.route.navigate(['/preview']);
          break;
        case "ContentListPreview":
          this.viewModel.screenStatus.showPreview({
            Position: parseInt(String(response.Parameter))
          });
          this.route.navigate(['/preview']);
          break;
        default:
          console.warn(this.LOGEVENT, "[UpdateView$] 未定義の画面名", screenName);
          break;
      }

      console.debug(this.LOGEVENT, "[UpdateView$] - OUT");
    });
  }
}
