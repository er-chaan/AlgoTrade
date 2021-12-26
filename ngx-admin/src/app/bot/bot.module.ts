import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NbMenuModule } from '@nebular/theme';

import { ThemeModule } from '../@theme/theme.module';
import { BotRoutingModule } from './bot-routing.module';
import { BotComponent } from './bot.component';
import { BotDashboardComponent } from './bot-dashboard/bot-dashboard.component';
import { Bot404Component } from './bot404/bot404.component';
import { BotInstrumentsComponent } from './bot-instruments/bot-instruments.component';
import { BotBucketsComponent } from './bot-buckets/bot-buckets.component';
import { BotChartsComponent } from './bot-charts/bot-charts.component';


@NgModule({
  declarations: [
    BotComponent,
    BotDashboardComponent,
    Bot404Component,
    BotInstrumentsComponent,
    BotBucketsComponent,
    BotChartsComponent
  ],
  imports: [
    ThemeModule,
    NbMenuModule,
    CommonModule,
    BotRoutingModule
  ]
})
export class BotModule { }





// import { NgModule } from '@angular/core';

// import { PagesComponent } from './pages.component';
// import { DashboardModule } from './dashboard/dashboard.module';
// import { ECommerceModule } from './e-commerce/e-commerce.module';
// import { PagesRoutingModule } from './pages-routing.module';
// import { MiscellaneousModule } from './miscellaneous/miscellaneous.module';

// @NgModule({
//   imports: [
//     PagesRoutingModule,
//     ThemeModule,
//     NbMenuModule,
//     DashboardModule,
//     ECommerceModule,
//     MiscellaneousModule,
//   ],
//   declarations: [
//     PagesComponent,
//   ],
// })
// export class PagesModule {
// }
