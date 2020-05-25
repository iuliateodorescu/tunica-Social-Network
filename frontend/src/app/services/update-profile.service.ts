import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {MatSnackBar} from '@angular/material';
import {GeneralService} from './general.service';
import {Router} from '@angular/router';
import {AuthService} from './auth.service';
import {backendUrl} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UpdateProfileService {
  private user;
  public profileSet = false;

  constructor(private http: HttpClient,
              private snackBar: MatSnackBar,
              private generalService: GeneralService,
              private authService: AuthService) {
    authService.getCurrentUser().then(user => this.user = user).catch(err => console.log(err));
  }

  setProfile(profile) {
    this.http.post(`${backendUrl}/profile`, profile, this.generalService.getHttpOptions())
      .subscribe(res => {
          this.generalService.openSnackBar('Success!');
        },
        error => {
          console.error(error);
          this.snackBar.open(this.generalService.formatError(error.error));
        });
  }

  getProfile() {
    return new Promise((resolve, reject) => {
      this.http.get(`${backendUrl}/profile`, this.generalService.getHttpOptions())
        .subscribe(res => {
            resolve(res);
          },
          error => {
            console.error(error);
            this.snackBar.open(this.generalService.formatError(error.error));
            reject(error);
          });
    });
  }

  uploadPhoto(file) {
    const formData = new FormData();
    formData.append('file', file);
    console.log(file, formData);
    this.http.post(`${backendUrl}/profile/photo`, formData, this.generalService.getHttpOptions())
      .subscribe(res => {
          console.log(res);
        },
        error => {
          this.generalService.resolveError(error);
        });
  }

  update(profile) {
    console.log(profile);
    this.http.put(`${backendUrl}/profile`, profile, this.generalService.getHttpOptions())
      .subscribe(res => {
          this.generalService.openSnackBar('Success!');
        },
        error => {
          console.error(error);
          this.snackBar.open(this.generalService.formatError(error.error));
        });
  }

  async getPhoto() {
    const profile: any = await this.getProfile();
    this.http.get(`${backendUrl}/profile/photo/` + profile.photo, this.generalService.getHttpOptions())
      .subscribe(res => {
          return res;
        },
        err => this.generalService.resolveError(err));
  }
}
