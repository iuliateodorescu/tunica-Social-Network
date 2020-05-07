import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProfileComponent } from './pages/profile/profile.component';
import {AuthComponent} from './pages/auth/auth.component';
import {HomeComponent} from './pages/home/home.component';
import {GroupsPageComponent} from './pages/groups-page/groups-page.component';
import {FeedComponent} from './pages/feed/feed.component';


const routes: Routes = [
  {path: 'feed', component: FeedComponent},
  {path: 'profile', component: ProfileComponent},
  {path: 'auth', component: AuthComponent},
  {path: 'groups', component: GroupsPageComponent},
  {path: '', component: HomeComponent},
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
