import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {MatSnackBar} from '@angular/material';
import {GeneralService} from './general.service';
import {Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public isLoggedIn = localStorage.getItem('token') || false;

  constructor(private http: HttpClient,
              private snackBar: MatSnackBar,
              private generalService: GeneralService,
              private router: Router) {
  }


  register(user) {
    this.http.post('/api/user/register', user)
      .subscribe(res => {
          this.storeToken(res);
          this.isLoggedIn = true;
        },
        error => {
          this.generalService.resolveError(error);
        });
  }

  login(user) {
    this.http.post('/api/user/login', user, {observe: 'response'})
      .subscribe(res => {
          this.storeToken(res);
          this.isLoggedIn = true;
        },
        error => {
          console.error(error);
          const message = this.generalService.formatError(error.error);
          this.generalService.openSnackBar(message, 1);
        });
  }

  storeToken(data) {
    const token = data.headers.get('x-auth-token');
    localStorage.setItem('token', token);
    this.isLoggedIn = true;
    this.router.navigate(['/']);
  }

  getCurrentUser() {
    return new Promise((resolve, reject) => {
      this.http.get('/api/user', this.generalService.getHttpOptions())
        .subscribe((res) => resolve(res), error => reject(error));
    });
  }

  signOut() {
    localStorage.clear();
    this.isLoggedIn = false;
  }
}
