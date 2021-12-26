import { Component, OnInit } from '@angular/core';
import { NbToastrService } from '@nebular/theme';
import { ZerodhaService } from '../zerodha.service';

@Component({
  selector: 'ngx-zerodha-positions',
  templateUrl: './zerodha-positions.component.html',
  styleUrls: ['./zerodha-positions.component.scss']
})
export class ZerodhaPositionsComponent implements OnInit {

  loading: boolean = false;
  positionsData: any = [];

  constructor(
    private zerodhaService: ZerodhaService,
    private toastrService: NbToastrService,
  ) { }

  ngOnInit(): void {
    this.getPositions();
  }

  getPositions() {
    this.loading = true;
    this.zerodhaService.getPositions().subscribe(
      response => {
        if (response.status == "success") {
          this.positionsData = response.data;
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
