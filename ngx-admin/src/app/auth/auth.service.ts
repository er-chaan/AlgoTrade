import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { environment } from "../../environments/environment";
import { map } from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  api:any;
  constructor(private httpClient: HttpClient) {
    this.api = environment.api;
  }

  auth(data) {
    var url = this.api+"auth";
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

}
