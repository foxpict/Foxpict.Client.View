import { Injectable, EventEmitter } from '@angular/core';
import { IpcResponse, IpcUpdateViewResponse, IpcUpdatePropResponse } from './contract/response.contract';
import { BehaviorSubject } from 'rxjs';
import { CourierService } from './courier.service';
import { IpcMessage } from './contract/delivery.contract';
import { HttpClientService } from '../http-client.service';

/**
 * BFFからのIPCメッセージ受信と、内部イベントの発行を行うメッセージングサービスです。
 */
@Injectable()
export class MessagingService {
  private LOGEVENT: string = "[Foxpict][MessagingService]";

  /**
   * ElectronNETのRendererで使用するIPCオブジェクト
   */
  private electronIpcRenderer: any | null;

  private localIpcRenderer: { [index: string]: (event: any, arg: any) => void; } = {};

  /**
   * コンストラクタ
   */
  constructor(private courier: CourierService, private httpClientService: HttpClientService) {
    this.localIpcRenderer["MSG_SHOW_CONTENTPREVIEW"] = (_, _2) => this.onMSG_SHOW_CONTENTPREVIEW(_, _2);
    this.localIpcRenderer["MSG_SHOW_CONTENLIST"] = (_, _2) => this.onMSG_SHOW_CONTENLIST(_, _2);
    this.localIpcRenderer["IPC_ALIVE"] = (_, _2) => this.onIPC_ALIVE(_, _2);
    this.localIpcRenderer["IPC_UPDATEVIEW"] = (_, _2) => this.onIPC_UPDATEVIEW(_, _2);
    this.localIpcRenderer["IPC_UPDATEPROP"] = (_, _2) => this.onIPC_UPDATEPROP(_, _2);
  }

  /**
   * BFFへIPCメッセージを送信する
   *
   * @param ipcMessage 送信するIPCメッセージ
   */
  sendIpc(ipcMessage: IpcMessage) {
    if (this.electronIpcRenderer != null) {
      // ElectronNETのRendererを使用する
      this.electronIpcRenderer.send("PIXS_INTENT_MESSAGE", ipcMessage);
    } else {
      // HttpClientを使用する
      this.httpClientService.send("PIXS_INTENT_MESSAGE", ipcMessage).then(
        (response) => {

        })
        .catch(
          (error) => console.log(error)
        );
    }
  }

  /**
   * サービスの初期化
   *
   * @param ipcRenderer IPCオブジェクト
   * @param isRpcInitialize IPCオブジェクトのイベントハンドラ登録を行うかどうかのフラグ
   */
  initialize(_ipcRenderer: any, _isRpcInitialize: boolean) {
    this.electronIpcRenderer = _ipcRenderer;

    let w: any = window;
    if (!w['angularComponentRef_PixstockNetService']) {
      w['angularComponentRef_PixstockNetService'] = {
        // NOTE: VFFに送信するIPCイベントをすべて登録する
        componentFn_MSG_SHOW_CONTENTPREVIEW: (event: any, arg: any) => this.onMSG_SHOW_CONTENTPREVIEW(event, arg),
        componentFn_MSG_SHOW_CONTENLIST: (event: any, arg: any) => this.onMSG_SHOW_CONTENLIST(event, arg),
        componentFn_IPC_ALIVE: (event: any, arg: any) => this.onIPC_ALIVE(event, arg),
        componentFn_IPC_UPDATEVIEW: (event: any, arg: any) => this.onIPC_UPDATEVIEW(event, arg),
        componentFn_IPC_UPDATEPROP: (event: any, arg: any) => this.onIPC_UPDATEPROP(event, arg)
      };
    }

    if (_isRpcInitialize) {
      console.info("IPCイベントの初期化");

      this.electronIpcRenderer.removeAllListeners(["MSG_SHOW_CONTENTPREVIEW", "MSG_SHOW_CONTENLIST"]);

      this.electronIpcRenderer.on('MSG_SHOW_CONTENTPREVIEW', (event: any, arg: any) => {
        var ntv_window: any = window;
        ntv_window.angularComponentRef.zone.run(() => {
          ntv_window.angularComponentRef_PixstockNetService.componentFn_MSG_SHOW_CONTENTPREVIEW(event, arg);
        });
      });

      this.electronIpcRenderer.on('MSG_SHOW_CONTENLIST', (event: any, arg: any) => {
        var ntv_window: any = window;
        ntv_window.angularComponentRef.zone.run(() => {
          ntv_window.angularComponentRef_PixstockNetService.componentFn_MSG_SHOW_CONTENLIST(event, arg);
        });
      });

      // IPC_ALIVEメッセージ
      this.electronIpcRenderer.on('IPC_ALIVE', (event: any, arg: any) => {
        var ntv_window: any = window;
        ntv_window.angularComponentRef.zone.run(() => {
          ntv_window.angularComponentRef_PixstockNetService.componentFn_IPC_ALIVE(event, arg);
        });
      });

      // IPC_UPDATEVIEWメッセージ
      this.electronIpcRenderer.on('IPC_UPDATEVIEW', (event: any, arg: any) => {
        var ntv_window: any = window;
        ntv_window.angularComponentRef.zone.run(() => {
          ntv_window.angularComponentRef_PixstockNetService.componentFn_IPC_UPDATEVIEW(event, arg);
        });
      });

      // IPC_UPDATEPROPメッセージ
      this.electronIpcRenderer.on('IPC_UPDATEPROP', (event: any, arg: any) => {
        var ntv_window: any = window;
        ntv_window.angularComponentRef.zone.run(() => {
          ntv_window.angularComponentRef_PixstockNetService.componentFn_IPC_UPDATEPROP(event, arg);
        });
      });

    }
  }

  /**
   * 任意のIPCイベントを実行します。
   * 未定義のIPCイベント名を指定した場合は処理を行いません。
   *
   * @param eventName IPCイベント名
   * @param args IPCイベントハンドラに渡すパラメータ
   */
  localSend(eventName: string, args: any) {
    if (eventName in this.localIpcRenderer) {
      this.localIpcRenderer[eventName](null, args);
    }
  }

  private onMSG_SHOW_CONTENTPREVIEW(event: any, args: any) {
    console.debug(this.LOGEVENT, "[onMSG_SHOW_CONTENTPREVIEW] : Execute");
    // TODO: IPC_UPDATEPROPと同様に、Courierを使用してイベントを発火する
  }

  private onMSG_SHOW_CONTENLIST(event: any, args: any) {
    console.debug(this.LOGEVENT, "[onMSG_SHOW_CONTENLIST] : Execute");
    // TODO: IPC_UPDATEPROPと同様に、Courierを使用してイベントを発火する
  }

  private onIPC_ALIVE(event: any, args: any) {
    console.debug(this.LOGEVENT, "[onIPC_ALIVE] : Execute");
    // TODO: IPC_UPDATEPROPと同様に、Courierを使用してイベントを発火する
  }

  private onIPC_UPDATEVIEW(event: any, args: IpcResponse) {
    console.debug(this.LOGEVENT, "[onIPC_UPDATEVIEW] : Execute", args);

    // "IPC_UPDATEVIEW"メッセージの、本文をインスタンス化する。
    var responseObj = JSON.parse(args.body) as IpcUpdateViewResponse;
    this.courier.fireUpdateView(responseObj);
  }

  private onIPC_UPDATEPROP(event: any, args: IpcResponse) {
    console.debug(this.LOGEVENT, "[onIPC_UPDATEPROP] : Execute", args);

    // "IPC_UPDATEPROP"メッセージの、本文をインスタンス化する。
    var responseObj = JSON.parse(args.body) as IpcUpdatePropResponse;
    this.courier.fireInvalidateProp(responseObj);
  }
}
