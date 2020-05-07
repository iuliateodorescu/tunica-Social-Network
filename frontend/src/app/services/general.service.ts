import {Injectable} from '@angular/core';
import {HttpHeaders} from '@angular/common/http';
import {MatSnackBar} from '@angular/material';

@Injectable({
  providedIn: 'root'
})
export class GeneralService {

  constructor(private snackBar: MatSnackBar) {
  }

  public getHttpOptions() {
    const httpOptions = {
      headers: new HttpHeaders({
        'x-auth-token': localStorage.getItem('token')
      }),
    };
    return httpOptions;
  }

  resolveError(error) {
    if (error && error.error) {
      this.openSnackBar(this.formatError(error.error), 1);
    } else {
      this.openSnackBar('error', 1);
    }
  }

  public formatError(error: string) {
    error = error.replace('"', '');
    error = error.replace('"', '');
    error = error.charAt(0).toUpperCase() + error.substring(1) + '.';
    return error;
  }

  public openSnackBar(message: string, duration: number = 1) {
    this.snackBar.open(message, '', {duration: duration * 1000});
  }

}
