import { Component, OnInit } from '@angular/core';
import { NbToastrService } from '@nebular/theme';
import { ZerodhaService } from '../zerodha.service';

@Component({
  selector: 'ngx-zerodha-orders',
  templateUrl: './zerodha-orders.component.html',
  styleUrls: ['./zerodha-orders.component.scss']
})
export class ZerodhaOrdersComponent implements OnInit {

  loading: boolean = false;
  ordersData: any = [];

  constructor(
    private zerodhaService: ZerodhaService,
    private toastrService: NbToastrService,
  ) { }

  ngOnInit(): void {
    this.getOrders();
  }

  getOrders() {
    this.loading = true;
    this.zerodhaService.getOrders().subscribe(
      response => {
        if (response.status == "success") {
          this.ordersData = response.data;
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
