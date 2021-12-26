import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AuthRoutingModule } from './auth-routing.module';
import { AuthComponent } from './auth.component';
import { ThemeModule } from '../@theme/theme.module';
import { AuthKiteComponent } from './auth-kite/auth-kite.component';

@NgModule({
  declarations: [
    AuthComponent,
    AuthKiteComponent,
  ],
  imports: [
    ThemeModule,
    CommonModule,
    AuthRoutingModule,
  ]
})
export class AuthModule { }
