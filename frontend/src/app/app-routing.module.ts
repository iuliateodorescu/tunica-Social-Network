import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProfileComponent } from './pages/profile/profile.component';
import {AuthComponent} from './pages/auth/auth.component';
import {HomeComponent} from './pages/home/home.component';
import {GroupsPageComponent} from './pages/groups-page/groups-page.component';
import {FeedComponent} from './pages/feed/feed.component';
import {GroupPageComponent} from './pages/group-page/group-page.component';
import {FriendsPageComponent} from './pages/friends-page/friends-page.component';
import {ProfileViewComponent} from './components/profile-view/profile-view.component';


const routes: Routes = [
  {path: 'feed', component: FeedComponent},
  {path: 'profile', component: ProfileComponent},
  {path: 'friends', component: FriendsPageComponent},
  {path: 'friend/:id', component: ProfileViewComponent},
  {path: 'auth', component: AuthComponent},
  {path: 'groups', component: GroupsPageComponent},
  {path: 'group/:id', component: GroupPageComponent},
  {path: '', component: HomeComponent},
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
