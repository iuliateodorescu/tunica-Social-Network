import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {HomeComponent} from './pages/home/home.component';
import {RouterModule, Routes} from '@angular/router';
import {
  _MatMenuDirectivesModule,
  MatButtonModule,
  MatCardModule,
  MatFormFieldModule,
  MatInputModule,
  MatMenuModule, MatRadioModule, MatSelectModule, MatSidenavModule, MatSlideToggleModule,
  MatSnackBarModule, MatTabsModule,
  MatToolbarModule, MatTreeModule
} from '@angular/material';
import {HttpClient, HttpClientModule} from '@angular/common/http';
import { MenuComponent } from './components/menu/menu.component';
import {FlexLayoutModule, FlexModule} from '@angular/flex-layout';
import { AuthComponent } from './pages/auth/auth.component';
import { SigninComponent } from './components/signin/signin.component';
import { SignupComponent } from './components/signup/signup.component';
import {FormsModule} from '@angular/forms';
import { UserProfileComponent } from './components/user-profile/user-profile.component';
import { ProfileComponent } from './pages/profile/profile.component';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    MenuComponent,
    AuthComponent,
    SigninComponent,
    SignupComponent,
    UserProfileComponent,
    ProfileComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatToolbarModule,
    MatCardModule,
    FlexLayoutModule,
    FlexModule,
    HttpClientModule,
    MatSnackBarModule,
    MatMenuModule,
    MatFormFieldModule,
    FormsModule,
    MatInputModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
