import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {AuthComponent} from './pages/auth/auth.component';
import {HomeComponent} from './pages/home/home.component';
import {GroupsPageComponent} from './pages/groups-page/groups-page.component';


const routes: Routes = [
  {path: 'auth', component: AuthComponent},
  {path: 'groups', component: GroupsPageComponent},
  {path: '', component: HomeComponent},
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
