import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ZerodhaChartsComponent } from './zerodha-charts/zerodha-charts.component';
import { ZerodhaDashboardComponent } from './zerodha-dashboard/zerodha-dashboard.component';
import { ZerodhaFundsComponent } from './zerodha-funds/zerodha-funds.component';
import { ZerodhaInstrumentsComponent } from './zerodha-instruments/zerodha-instruments.component';
import { ZerodhaMarketwatchComponent } from './zerodha-marketwatch/zerodha-marketwatch.component';
import { ZerodhaOrdersComponent } from './zerodha-orders/zerodha-orders.component';
import { ZerodhaPositionsComponent } from './zerodha-positions/zerodha-positions.component';
import { ZerodhaComponent } from './zerodha.component';
import { Zerodha404Component } from './zerodha404/zerodha404.component';

const routes: Routes = [{
  path: '',
  component: ZerodhaComponent,
  children: [
    {
      path: 'dashboard',
      component: ZerodhaDashboardComponent,
    },
    {
      path: 'marketwatch',
      component: ZerodhaMarketwatchComponent,
    },
    {
      path: 'charts',
      component: ZerodhaChartsComponent,
    },
    {
      path: 'instruments',
      component: ZerodhaInstrumentsComponent,
    },
    {
      path: 'orders',
      component: ZerodhaOrdersComponent,
    },
    {
      path: 'positions',
      component: ZerodhaPositionsComponent,
    },
    {
      path: 'funds',
      component: ZerodhaFundsComponent,
    },
    {
      path: '',
      redirectTo: 'dashboard',
      pathMatch: 'full',
    },
    {
      path: '**',
      component: Zerodha404Component,
    },
  ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ZerodhaRoutingModule { }
