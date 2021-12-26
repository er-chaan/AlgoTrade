import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { environment } from "../../environments/environment";
import { map } from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class BotService {

  api: any;
  constructor(private httpClient: HttpClient) {
    this.api = environment.api;
  }

  // instruments starts
  refreshInstruments() {
    var url = this.api + "instruments/refresh";
    return this.httpClient
      .get(url)
      .pipe(
        map((data: any) => {
          return data;
        })
      );
  }
  getInstruments() {
    var url = this.api + "instruments";
    return this.httpClient
      .get(url)
      .pipe(
        map((data: any) => {
          return data;
        })
      );
  }
  putInstruments(data:any) {
    var url = this.api + "instruments";
    return this.httpClient
      .get(url, data)
      .pipe(
        map((data: any) => {
          return data;
        })
      );
  }
  // instruments ends

}
