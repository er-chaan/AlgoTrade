import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ZerodhaRoutingModule } from './zerodha-routing.module';
import { ZerodhaDashboardComponent } from './zerodha-dashboard/zerodha-dashboard.component';
import { ZerodhaComponent } from './zerodha.component';
import { ThemeModule } from '../@theme/theme.module';
import { NbMenuModule } from '@nebular/theme';
import { Zerodha404Component } from './zerodha404/zerodha404.component';
import { ZerodhaOrdersComponent } from './zerodha-orders/zerodha-orders.component';
import { ZerodhaPositionsComponent } from './zerodha-positions/zerodha-positions.component';
import { ZerodhaFundsComponent } from './zerodha-funds/zerodha-funds.component';
import { ZerodhaMarketwatchComponent } from './zerodha-marketwatch/zerodha-marketwatch.component';
import { ZerodhaInstrumentsComponent } from './zerodha-instruments/zerodha-instruments.component';
import { ZerodhaChartsComponent } from './zerodha-charts/zerodha-charts.component';


@NgModule({
  declarations: [
    ZerodhaDashboardComponent,
    ZerodhaComponent,
    Zerodha404Component,
    ZerodhaOrdersComponent,
    ZerodhaPositionsComponent,
    ZerodhaFundsComponent,
    ZerodhaMarketwatchComponent,
    ZerodhaInstrumentsComponent,
    ZerodhaChartsComponent,
  ],
  imports: [
    CommonModule,
    ZerodhaRoutingModule,
    ThemeModule,
    NbMenuModule,
  ]
})
export class ZerodhaModule { }
