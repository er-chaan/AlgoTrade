import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthKiteComponent } from './auth-kite/auth-kite.component';
import { AuthComponent } from './auth.component';

const routes: Routes = [{
  path: '',
  component: AuthComponent,
  children:[
    {
      path: 'kite',
      component: AuthKiteComponent,
    },
    {
      path: '',
      redirectTo: 'kite',
      pathMatch: 'full',
    },
  ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
