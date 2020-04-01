import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {AuthComponent} from './pages/auth/auth.component';
import {HomeComponent} from './pages/home/home.component';


const routes: Routes = [
  {path: 'auth', component: AuthComponent},
  {path: '', component: HomeComponent},
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
