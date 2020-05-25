import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {MatSnackBar} from '@angular/material';
import {backendUrl} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class GeneralService {

  constructor(private snackBar: MatSnackBar,
              private http: HttpClient) {
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
    if (error) {
      error = error.replace('"', '');
      error = error.replace('"', '');
      error = error.charAt(0).toUpperCase() + error.substring(1) + '.';
      return error;
    } else {
      console.error(error);
    }
  }

  public openSnackBar(message: string, duration: number = 1) {
    this.snackBar.open(message, '', {duration: duration * 1000});
  }

  public uploadPhoto(file) {
    const formData = new FormData();
    formData.append('file', file);
    console.log(file, formData);
    this.http.post(`${backendUrl}/photo`, formData, this.getHttpOptions())
      .subscribe(res => {
        console.log(res);
      }, error => {
        this.resolveError(error);
      });
  }

  public uploadImage(file) {
    const formData = new FormData();
    formData.append('file', file);
    return this.http.post(`${backendUrl}/general/image`, formData, this.getHttpOptions());
  }

  public formImageLink(fileName) {
    const url = `${backendUrl}/general/image/${fileName}`;
    return url;
  }

}
