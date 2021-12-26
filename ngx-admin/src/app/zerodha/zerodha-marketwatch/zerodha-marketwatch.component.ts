import { Component, OnInit } from '@angular/core';
import { ZerodhaService } from "../zerodha.service";
import { NbToastrService } from '@nebular/theme';

@Component({
  selector: 'ngx-zerodha-marketwatch',
  templateUrl: './zerodha-marketwatch.component.html',
  styleUrls: ['./zerodha-marketwatch.component.scss']
})
export class ZerodhaMarketwatchComponent implements OnInit {

  loading: boolean = false;
  marketwatchData: any = [];

  constructor(
    private zerodhaService: ZerodhaService,
    private toastrService: NbToastrService,
  ) { }

  ngOnInit(): void {

  }



}
