import { Component, OnInit } from '@angular/core';
import { BotService } from "../bot.service";
import { NbToastrService } from '@nebular/theme';

@Component({
  selector: 'ngx-bot-dashboard',
  templateUrl: './bot-dashboard.component.html',
  styleUrls: ['./bot-dashboard.component.scss']
})
export class BotDashboardComponent implements OnInit {

  constructor(
    private botService: BotService,
    private toastrService: NbToastrService
  ) { }

  ngOnInit(): void {
    this.getInstruments();
  }

  instruments: any = [];
  totalInstruments:number=0;
  activeInstruments:number=0;
  getInstruments() {
    this.botService.getInstruments().subscribe(
      response => {
        if(response.status){
          this.instruments = response.data;
          this.totalInstruments = this.instruments.length;
          this.instruments.forEach(element => {
            if(element.bucket > 0){
              this.activeInstruments++;
            }
          });
        }else{
          this.toastrService.danger(response.message,"API");
        }
      },
      error => {
        this.toastrService.danger(error.status +' : '+ error.statusText,"API");
      });
  }

}
