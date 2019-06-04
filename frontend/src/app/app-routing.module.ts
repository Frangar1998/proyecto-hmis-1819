import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';

const routes: Routes = [
  {path:  'auth', loadChildren:  './auth/auth.module#AuthModule'},
  {path: '',pathMatch: 'full',redirectTo: 'login'}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
