import { Component, OnInit } from '@angular/core';
import { NbToastrService } from '@nebular/theme';
import { ZerodhaService } from '../zerodha.service';

@Component({
  selector: 'ngx-zerodha-funds',
  templateUrl: './zerodha-funds.component.html',
  styleUrls: ['./zerodha-funds.component.scss']
})
export class ZerodhaFundsComponent implements OnInit {

  loading: boolean = false;
  fundsData: any = [];

  constructor(
    private zerodhaService: ZerodhaService,
    private toastrService: NbToastrService,
  ) { }

  ngOnInit(): void {
    this.getFunds();
  }

  getFunds() {
    this.loading = true;
    this.zerodhaService.getFunds().subscribe(
      response => {
        if (response.status == "success") {
          this.fundsData = response.data;
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
