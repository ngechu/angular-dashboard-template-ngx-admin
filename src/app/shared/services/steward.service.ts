import { Injectable } from "@angular/core";
import { Meta } from "@angular/platform-browser";
import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
  HttpParams,
  HttpResponse,
} from "@angular/common/http";
import { Observable, of } from "rxjs";
import { catchError } from "rxjs/operators";
import { GlobalParams } from "../globaparams";
import { ResponseWrapper } from "../wrappers/response-wrapper";
// import {DataTableWrapper} from '../../../entities/wrappers/data-table-wrapper';
import { MasterDataResponseWrapper } from "../wrappers/masterdata-wrapper";
import { Config } from "protractor";
// import {AppState} from '../redux/AppState';

@Injectable({
  providedIn: "root",
})
export class StewardService<T, E> {
  token: string;

  constructor(
    private http: HttpClient,
    private globalParam: GlobalParams,
    private meta: Meta
  ) // private _state: AppState
  {}

  getHeaders(header: string): HttpHeaders {
    // const csrf = this.meta.getTag('name=_csrf').content;
    const token = localStorage.getItem("access_token");
    switch (header) {
      case "clean":
        return new HttpHeaders({
          "Content-Type": "application/json; charset=utf-8",
          // 'X-CSRF-TOKEN': csrf
          Authorization: "Bearer " + token,
        });
        break;
      case "pdf":
        return new HttpHeaders({
          "Content-Type": "application/json; charset=utf-8",
          // 'X-CSRF-TOKEN': csrf
          Authorization: "Bearer " + token,
          Accept: "application/pdf",
        });
        break;

      case "no-token":
        return new HttpHeaders({
          "Content-Type": "application/json; charset=utf-8",
          // 'X-CSRF-TOKEN': csrf
        });
        break;

      case "login":
        return new HttpHeaders({
          "Content-type": "application/x-www-form-urlencoded; charset=utf-8",
          // 'X-CSRF-TOKEN': csrf
          Authorization: "Basic " + btoa("web-portal:Data2020."),
        });
        break;

      case "plain":
        return new HttpHeaders({
          "Content-type": "application/x-www-form-urlencoded; charset=utf-8",
          // 'X-CSRF-TOKEN': csrf
          Authorization: "Bearer " + token,
        });
        break;
      case "form-data":
        return new HttpHeaders({
          // 'X-CSRF-TOKEN': csrf
          Authorization: "Bearer " + token,
        });
        break;

      case "multi-part":
        return new HttpHeaders({
          "Content-type": "multipart/form-data; charset=utf-8",
          // 'X-CSRF-TOKEN': csrf
          Authorization: "Bearer " + token,
        });
        break;
      case "sendToken":
        return new HttpHeaders({
          "Content-type": "application/json; charset=utf-8",
          // 'X-CSRF-TOKEN': csrf
          // Authorization: 'Basic ' + btoa('client:secret'),
          Authorization:
            "Basic " +
            btoa(
              "miliki-Xw5tZBmm:9706ece7ece6f629003dc2eb54e9f546b668e07d39b8cec952f91f74fda46744"
            ),
        });
        break;

      default:
        return new HttpHeaders({
          "Content-Type": "application/json; charset=utf-8",
          // 'X-CSRF-TOKEN': csrf
          Authorization: "Bearer " + token,
        });
        break;
    }
  }

  /**
   * Used to handle http post requests
   */
  postResponse(endpoint: string, data: T): Observable<HttpResponse<Config>> {
    return this.http
      .post(this.globalParam.baseUrl + endpoint, JSON.stringify(data), {
        headers: this.getHeaders("clean"),
      })
      .pipe(catchError(this.handleError<any>()));
  }
  post(endpoint: string, data: T): Observable<ResponseWrapper<E>> {
    return this.http
      .post(this.globalParam.baseUrl + endpoint, JSON.stringify(data), {
        headers: this.getHeaders("clean"),
      })
      .pipe(catchError(this.handleError<any>()));
  }

  postPdf(endpoint: string, data: T): Observable<any> {
    return this.http
      .post(this.globalParam.baseUrl + endpoint, JSON.stringify(data), {
        headers: this.getHeaders("clean"),
        responseType: "blob" as "json",
        observe: "response" as "body",
        reportProgress: true,
      })
      .pipe(catchError(this.handleError<any>()));
  }

  postNoToken(endpoint: string, data: T): Observable<ResponseWrapper<E>> {
    return this.http
      .post(this.globalParam.baseUrl + endpoint, JSON.stringify(data), {
        headers: this.getHeaders("no-token"),
      })
      .pipe(catchError(this.handleError<any>()));
  }

  postLogin(endpoint: string, data: T): Observable<any> {
    return this.http
      .post(this.globalParam.baseUrl + endpoint, data, {
        headers: this.getHeaders("login"),
      })
      .pipe(catchError(this.handleError<any>()));
  }

  postFormData(endpoint: string, data: T): Observable<ResponseWrapper<E>> {
    const formData: FormData = new FormData();
    Object.keys(data).forEach((key) => {
      formData.append(key, data[key]);
    });

    return this.http
      .post(this.globalParam.baseUrl + endpoint, formData, {
        headers: this.getHeaders("form-data"),
      })
      .pipe(catchError(this.handleError<any>()));
  }

  postFormDataNoToken(
    endpoint: string,
    data: T
  ): Observable<ResponseWrapper<E>> {
    const formData: FormData = new FormData();
    Object.keys(data).forEach((key) => {
      formData.append(key, data[key]);
    });

    return this.http
      .post(this.globalParam.baseUrl + endpoint, formData, {
        headers: this.getHeaders("form-data"),
      })
      .pipe(catchError(this.handleError<any>()));
  }

  postFormAuthorized(
    endpoint: string,
    data: T,
    options?: HttpHeaders
  ): Observable<any> {
    if (!options) {
      options = this.getHeaders("plain");
    }
    return this.http
      .post(this.globalParam.baseUrl + endpoint, data, { headers: options })
      .pipe(catchError(this.handleError<any>()));
  }

  postFormDataMultipart(
    endpoint: string,
    data: T
  ): Observable<ResponseWrapper<E>> {
    const formData: FormData = new FormData();
    Object.keys(data).forEach((key) => {
      if (Array.isArray(data[key])) {
        data[key].forEach((k2) => {
          formData.append(key, k2);
        });
      } else {
        formData.append(key, data[key]);
      }
    });

    return this.http
      .post(this.globalParam.baseUrl + endpoint, formData, {
        headers: this.getHeaders("form-data"),
      })
      .pipe(catchError(this.handleError<any>()));
  }

  sendFile(endpoint: string, data: T): Observable<ResponseWrapper<E>> {
    return this.http
      .post(this.globalParam.baseUrl + endpoint, data, {
        headers: this.getHeaders("form-data"),
      })
      .pipe(catchError(this.handleError<any>()));
  }

  putFormDataMultiPart(
    endpoint: string,
    data: T
  ): Observable<ResponseWrapper<E>> {
    const formData: FormData = new FormData();
    Object.keys(data).forEach((key) => {
      if (Array.isArray(data[key])) {
        data[key].forEach((k2) => {
          formData.append(key, k2);
        });
      } else {
        formData.append(key, data[key]);
      }
    });
    return this.http
      .put(this.globalParam.baseUrl + endpoint, formData, {
        headers: this.getHeaders("form-data"),
      })
      .pipe(catchError(this.handleError<any>()));
  }

  /**
   * Used to handle http post requests
   */
  put(endpoint: string, data: T): Observable<ResponseWrapper<E>> {
    return this.http
      .put(this.globalParam.baseUrl + endpoint, JSON.stringify(data), {
        headers: this.getHeaders("clean"),
      })
      .pipe(catchError(this.handleError<any>()));
  }

  putNoToken(endpoint: string, data: T): Observable<ResponseWrapper<E>> {
    return this.http
      .put(this.globalParam.baseUrl + endpoint, JSON.stringify(data), {
        headers: this.getHeaders("no-token"),
      })
      .pipe(catchError(this.handleError<any>()));
  }

  delete(endpoint: string, data: T): Observable<ResponseWrapper<E>> {
    return this.http
      .request("delete", this.globalParam.baseUrl + endpoint, {
        headers: this.getHeaders("clean"),
        body: JSON.stringify(data),
      })
      .pipe(catchError(this.handleError<any>()));
  }

  get(
    endpoint: string,
    data?: Map<string, string>
  ): Observable<ResponseWrapper<E>> {
    const options = {
      headers: this.getHeaders("clean"),
      params: this.getHttpParams(data),
    };
    return this.http
      .get(this.globalParam.baseUrl + endpoint, options)
      .pipe(catchError(this.handleError<any>()));
  }

  getMasterData(
    endpoint: string,
    data?: Map<string, string>
  ): Observable<MasterDataResponseWrapper<E>> {
    const options = {
      headers: this.getHeaders("plain"),
      params: this.getHttpParams(data),
    };
    return this.http
      .get(this.globalParam.baseUrl + endpoint, options)
      .pipe(catchError(this.handleError<any>()));
  }

  getWithCustomeHeader(
    endpoint: string,
    data?: Map<string, string>,
    options?: HttpHeaders
  ): Observable<ResponseWrapper<E>> {
    let opt;
    if (!options) {
      opt = {
        headers: options,
        params: this.getHttpParams(data),
      };
    } else {
      opt = {
        headers: this.getHeaders("clean"),
        params: this.getHttpParams(data),
      };
    }

    return this.http
      .get(this.globalParam.baseUrl + endpoint, opt)
      .pipe(catchError(this.handleError<any>()));
  }

  getNoToken(
    endpoint: string,
    data?: Map<string, string>
  ): Observable<ResponseWrapper<E>> {
    const options = {
      headers: this.getHeaders("no-token"),
      params: this.getHttpParams(data),
    };
    return this.http
      .get(this.globalParam.baseUrl + endpoint, options)
      .pipe(catchError(this.handleError<any>()));
  }
  getToken(
    endpoint: string,
    data?: Map<string, string>
  ): Observable<ResponseWrapper<E>> {
    const options = {
      headers: this.getHeaders("clean"),
      params: this.getHttpParams(data),
    };
    return this.http
      .get(this.globalParam.baseUrl + endpoint, options)
      .pipe(catchError(this.handleError<any>()));
  }
  sendToken(endpoint: string, data: T): Observable<any> {
    return this.http
      .post(this.globalParam.baseUrl + endpoint, data, {
        headers: this.getHeaders("sendToken"),
      })
      .pipe(catchError(this.handleError<any>()));
  }
  sendTokenOtp(endpoint: string, data: T): Observable<any> {
    return this.http
      .post(this.globalParam.baseUrl + endpoint, data, {
        headers: this.getHeaders("clean"),
        // observe: 'response' as 'body'
      })
      .pipe(catchError(this.handleError<any>()));
  }
  private getHttpParams(data: Map<string, string>): HttpParams {
    if (data === undefined) {
      return new HttpParams();
    }
    let httpParams: HttpParams = new HttpParams();
    data.forEach((value: string, key: string) => {
      httpParams = httpParams.append(key, value);
    });
    return httpParams;
  }

  /**
   * Used to catch exception thrown by http client returns internal server error
   * if status 500 is encountered
   */
  // tslint:disable-next-line:no-shadowed-variable
  private handleError<ResponseWrapper>() {
    return (error: HttpErrorResponse): Observable<any> => {
      const res = new ResponseWrapper();
      // tslint:disable-next-line:triple-equals
      if (error.status == 500) {
        res.code = error.status;
        res.message =
          "Sorry internal server error occured please try again later";
      } else {
        res.code = error.status;
        res.message = error.error.message;
        res.data = error.error.data;
      }
      return of(res);
    };
  }
}
