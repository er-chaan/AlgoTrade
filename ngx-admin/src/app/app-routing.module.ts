import { ExtraOptions, RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { AuthGuard } from './@core/guards/auth.guard';
import { GuestGuard } from './@core/guards/guest.guard';

export const routes: Routes = [
  {
    path: 'bot',
    loadChildren: () => import('./bot/bot.module')
      .then(m => m.BotModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'kite',
    loadChildren: () => import('./zerodha/zerodha.module')
      .then(m => m.ZerodhaModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.module')
      .then(m => m.AuthModule),
    canActivate: [GuestGuard]
  },
  { path: '', redirectTo: 'auth/kite', pathMatch: 'full' },
  { path: '**', redirectTo: 'auth/kite' },
];

const config: ExtraOptions = {
  useHash: false,
};

@NgModule({
  imports: [RouterModule.forRoot(routes, config)],
  exports: [RouterModule],
})
export class AppRoutingModule {
}
