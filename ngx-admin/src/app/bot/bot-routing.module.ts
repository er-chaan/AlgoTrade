import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BotBucketsComponent } from './bot-buckets/bot-buckets.component';
import { BotDashboardComponent } from './bot-dashboard/bot-dashboard.component';
import { BotInstrumentsComponent } from './bot-instruments/bot-instruments.component';
import { BotComponent } from './bot.component';
import { Bot404Component } from './bot404/bot404.component';

const routes: Routes = [{
  path: '',
  component: BotComponent,
  children:[
    {
      path: 'dashboard',
      component: BotDashboardComponent,
    },
    {
      path: 'instruments',
      component: BotInstrumentsComponent,
    },
    {
      path: 'buckets',
      component: BotBucketsComponent,
    },
    {
      path: 'buckets',
      component: BotBucketsComponent,
    },
    {
      path: '',
      redirectTo: 'dashboard',
      pathMatch: 'full',
    },
    {
      path: '**',
      component: Bot404Component,
    },
  ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BotRoutingModule { }
