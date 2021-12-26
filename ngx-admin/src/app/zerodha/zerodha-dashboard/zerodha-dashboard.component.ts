import { Component, OnInit } from '@angular/core';
import { NbToastrService } from '@nebular/theme';
import { ZerodhaService } from '../zerodha.service';

@Component({
  selector: 'ngx-zerodha-dashboard',
  templateUrl: './zerodha-dashboard.component.html',
  styleUrls: ['./zerodha-dashboard.component.scss']
})
export class ZerodhaDashboardComponent implements OnInit {

  loading: boolean = false;
  profileData: any = [];

  constructor(
    private zerodhaService: ZerodhaService,
    private toastrService: NbToastrService,
  ) { }

  ngOnInit(): void {
    this.getProfile();
  }

  getProfile() {
    this.loading = true;
    this.zerodhaService.getProfile().subscribe(
      response => {
        if (response.status == "success") {
          this.profileData = response.data;
          this.loading = false;
        } else {
          this.toastrService.danger(response.message, "KITE");
          this.loading = false;
        }
      },
      error => {
        this.loading = false;
        this.toastrService.danger(error.status + ' : ' + error.statusText, "KITE");
      });
  }

}
