import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { map } from "rxjs/operators";
import { webSocket } from "rxjs/webSocket";
import { environment } from "../../environments/environment";


@Injectable({
  providedIn: 'root'
})
export class ZerodhaService {

  api: any;
  constructor(private httpClient: HttpClient) {
    this.api = environment.api;
  }


  instruments_create(data) {
    var url = this.api + "instruments";
    return this.httpClient
      .post(url, data)
      .pipe(
        map((data: any) => {
          return data;
        })
      );
  }

  instruments_retrieve() {
    var url = this.api + "instruments";
    return this.httpClient
      .get(url)
      .pipe(
        map((data: any) => {
          return data;
        })
      );
  }

  instruments_update(data) {
    var url = this.api + "instruments/"+data.id;
    return this.httpClient
      .put(url, data)
      .pipe(
        map((data: any) => {
          return data;
        })
      );
  }

  instruments_delete(data) {
    var url = this.api + "instruments/"+data.id;
    return this.httpClient
      .delete(url, data)
      .pipe(
        map((data: any) => {
          return data;
        })
      );
  }


  getPrice() {
    const feedCode = "SBI";
    var url = "/mcapi/v1/stock/get-stock-price?scIdList=" + feedCode + "&scId=" + feedCode + "";
    return this.httpClient
      .get(url)
      .pipe(
        map((data: any) => {
          return data;
        })
      );
  }

  getCandles() {
    const from = (new Date()).toISOString().split('T')[0];
    const to = (new Date()).toISOString().split('T')[0];
    const instrumentCode = 779521;
    var url = "/oms/instruments/historical/" + instrumentCode + "/5minute?user_id=VM7727&oi=1&from=" + from + "&to=" + to + "";
    return this.httpClient
      .get(url)
      .pipe(
        map((data: any) => {
          return data;
        })
      );
  }

  getchartData(data){
    var url = this.api+"instruments/getChartData";
    return this.httpClient
      .post(url,data)
      .pipe(
        map((data: any) => {
          return data;
        })
      ); 
  }

  getProfile() {
    var url = "/oms/user/profile/full";
    return this.httpClient
      .get(url)
      .pipe(
        map((data: any) => {
          return data;
        })
      );
  }

  getOrders() {
    var url = "/oms/orders";
    return this.httpClient
      .get(url)
      .pipe(
        map((data: any) => {
          return data;
        })
      );
  }

  getPositions() {
    var url = "/oms/portfolio/positions";
    return this.httpClient
      .get(url)
      .pipe(
        map((data: any) => {
          return data;
        })
      );
  }

  getFunds() {
    var url = "/oms/user/margins";
    return this.httpClient
      .get(url)
      .pipe(
        map((data: any) => {
          return data;
        })
      );
  }

  getBankNifty() {
    var url = "/pricefeed/notapplicable/inidicesindia/in;nbx";
    return this.httpClient
      .get(url)
      .pipe(
        map((data: any) => {
          return data;
        })
      );
  }

  getSensex() {
    var url = "/pricefeed/notapplicable/inidicesindia/in;SEN";
    return this.httpClient
      .get(url)
      .pipe(
        map((data: any) => {
          return data;
        })
      );
  }

  getNifty50() {
    var url = "/pricefeed/notapplicable/inidicesindia/in;NSX";
    return this.httpClient
      .get(url)
      .pipe(
        map((data: any) => {
          return data;
        })
      );
  }





}
