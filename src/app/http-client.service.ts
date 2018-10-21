import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { IpcMessage } from './service/contract/delivery.contract';

@Injectable()
export class HttpClientService {

  /**
   * intermittentリクエストのクエリに付与するパラメータ
   *
   * 値はintermittentが処理されるたびにリセットします。
   * 空文字の場合は、クエリへの付与は行ないません。
   */
  intermittentParameterQuery: string = "";

  /**
   * リクエストヘッダを定義
   *
   * @private
   * @memberof HttpClientService
   */
  //private headers: any = new Headers({'Content-Type': 'application/json'});

  //private host: string = 'https://foxpict-bff-web.herokuapp.com/api';
  private host: string = 'http://localhost:5011/api';
  //private host: string = 'http://localhost:3000'; // ローカルMOCKサーバ

  /**
   * コンストラクタ. HttpClientService のインスタンスを生成する
   *
   * @param {Http} http Httpサービスを DI する
   * @memberof HttpClientService
   */
  constructor(private http: HttpClient) { }

  /**
   * intermittentインターフェースを実行する
   * (toPromise.then((res) =>{}) を利用する場合のコード)
   *
   * @returns {Promise<any[]>}
   * @memberof HttpClientService
   */
  public intermittent(): Promise<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'text/plain'
      })
    };

    let requestUrl = this.host + '/ipc/intermittent';
    if (this.intermittentParameterQuery != "") {
      // クエリーは、ローカルMOCKサーバ使用時のみ指定できる
      requestUrl += "?" + this.intermittentParameterQuery;
      this.intermittentParameterQuery = "";

      return this.http.get(requestUrl, httpOptions)
        .toPromise()
        .then((res) => {
          const response: any = res;
          console.debug("response", res);
          return response;
        })
        .catch(this.errorHandler);
    } else {
      // TODO: MOCKサーバのintermittentがPOSTなのでGETに修正するまでは、MOCKサーバに対してはクエリーは処理しない。
      return this.http.post(requestUrl, httpOptions)
        .toPromise()
        .then((res) => {
          const response: any = res;
          console.debug("response", res);
          return response;
        })
        .catch(this.errorHandler);
    }


  }

  /**
   * sendインターフェースを実行する
   * (toPromise.then((res) =>{}) を利用する場合のコード)
   *
   * @returns {Promise<any[]>}
   * @memberof HttpClientService
   */
  public send(ipcMessageName: string, ipcMessage: IpcMessage): Promise<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };

    return this.http.post(this.host + '/Ipc/send/' + ipcMessageName, ipcMessage, httpOptions)
      .toPromise()
      .then((res) => {
        const response: any = res;
        return response;
      })
      .catch(this.errorHandler);
  }

  /**
   * REST-API 実行時のエラーハンドラ
   * (toPromise.then((res) =>{}) を利用する場合のコード)
   *
   * @private
   * @param {any} err エラー情報
   * @memberof HttpClientService
   */
  private errorHandler(err) {
    console.log('Error occured.', err);
    return Promise.reject(err.message || err);
  }
}
