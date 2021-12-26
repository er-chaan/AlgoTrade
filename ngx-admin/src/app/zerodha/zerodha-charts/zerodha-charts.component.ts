import * as CanvasJS from './canvasjs.min.js';
import { ZerodhaService } from "../zerodha.service";
import { NbToastrService } from '@nebular/theme';
import { ChangeDetectionStrategy, Component, ViewChild, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'ngx-zerodha-charts',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './zerodha-charts.component.html',
  styleUrls: ['./zerodha-charts.component.scss']
})
export class ZerodhaChartsComponent implements OnInit {

  loading: boolean = false;
  selectedItem = '';
  instrumentsData: any = [];
  chartData: any = [];

  constructor(
    private zerodhaService: ZerodhaService,
    private toastrService: NbToastrService
  ) { }

  options: any = [];
  filteredOptions$: Observable<string[]>;

  @ViewChild('autoInput') input;

  ngOnInit(): void {
    this.instruments_retrieve();
    // this.processChart();
  }

  private filter(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.options.filter(optionValue => optionValue.toLowerCase().includes(filterValue));
  }

  getFilteredOptions(value: string): Observable<string[]> {
    this.selectedItem = this.input.nativeElement.value;

    return of(value).pipe(
      map(filterString => this.filter(filterString)),
    );
  }

  onChange() {
    this.filteredOptions$ = this.getFilteredOptions(this.input.nativeElement.value);
  }

  onSelectionChange($event) {
    this.filteredOptions$ = this.getFilteredOptions($event);
  }

  ohlc: any = [];
  volume: any = [];
  indicator_1: any = [];
  price:any = "";
  getChartData() {
    if (this.selectedItem) {
      this.chartData = [];
      this.ohlc = [];
      this.volume = [];
      this.indicator_1 = [];

      this.loading = true;
      this.zerodhaService.getchartData({ table: this.selectedItem }).subscribe(
        response => {
          this.loading = false;
          if (response.status == "success") {
            this.chartData = response.data;
            var i = 1;
            response.data.forEach(element => {
              this.price = element.close;
              this.ohlc.push(
                {
                  x: new Date(element.candle),
                  y: [
                    parseFloat(element.open),
                    parseFloat(element.high),
                    parseFloat(element.low),
                    parseFloat(element.close)
                  ]
                }
              );
              this.volume.push(
                { x: new Date(element.candle), y: element.volume, label: element.volume }
              );
              this.indicator_1.push(
                { x: new Date(element.candle), y: element.open+ Math.ceil(Math.random() * 10) * (Math.round(Math.random()) ? 1 : -1) }
              );
              i = i + 1;
            });
            this.processChart();
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
    } else {
      this.toastrService.danger("Invalid Input !", "KITE");
    }
  }

  processChart() {
    console.log("ohlc==>", this.ohlc);
    console.log("volume==>", this.volume);

    var chart = new CanvasJS.Chart("chartContainer", {
      animationEnabled: true,
      theme: "light1", // "light1", "light2", "dark1", "dark2"
      exportEnabled: false,
      title: {
        text: this.selectedItem + " : " + this.price
      },
      axisX: {
        interval: 1,
        valueFormatString: "hh:mm"
      },
      axisY: {
        // prefix: "",
        // title: "points"
      },
      toolTip: {
        // shared: true, 
        content:`
        <strong>Time: {x}</strong><br />
        Open: {y[0]}<br />
        High: {y[1]}<br />
        Low: {y[2]}<br />
        Close: {y[3]}<br />
        `,
      },
      data: [
        {
          type: "column",
          toolTipContent: `
          <strong>Time: {x}</strong><br />
          Volume: {label}<br />`,
          xValueFormatString: "hh:mm",
          axisYType: "secondary",
          axisXType: "secondary",
          dataPoints: this.volume,
          color: "lightgray",
        },
        {
          type: "line",
          toolTipContent:`
          <strong>Time: {x}</strong><br />
          Indicator 1 : {y}<br />
          `,
          xValueFormatString: "hh:mm",
          yValueFormatString: "##0.00",
          dataPoints : this.indicator_1,
          color: "purple",
        },
        {
          type: "candlestick",
          axisYType: "primary",
          axisXType: "primary",
          xValueFormatString: "hh:mm",
          yValueFormatString: "##0.00",
          dataPoints: this.ohlc,
          color: "blue",
        },
      ]
    });
    chart.render();
    return;
  }

  instruments_retrieve() {
    // this.loading = true;
    this.zerodhaService.instruments_retrieve().subscribe(
      response => {
        this.loading = false;
        if (response.status == "success") {
          this.instrumentsData = response.data;          
          response.data.forEach(element => {
            this.options.push(element.symbol);
          });
          this.filteredOptions$ = of(this.options);
        } else {
          this.toastrService.danger(response.message, "KITE");
        }
      },
      error => {
        this.loading = false;
        this.toastrService.danger(error.status + ' : ' + error.statusText, "KITE");
      });
  }


}
