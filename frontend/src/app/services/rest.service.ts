import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {GeneralService} from './general.service';
import {Observable} from 'rxjs';
import {backendUrl} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RestService {

  constructor(private http: HttpClient,
              private generalService: GeneralService) {
  }

  public addOne(route: string, object: any) {
    this.http.post(`${backendUrl}/${route}`, object, this.generalService.getHttpOptions())
      .subscribe(res => this.generalService.openSnackBar('Success!'), err =>
        this.generalService.resolveError(err));
  }

  public getAll(route: string): Observable<any> {
    return this.http.get(`${backendUrl}/${route}`, this.generalService.getHttpOptions());
  }

  public getOne(route: string): Observable<any> {
    return this.http.get(`${backendUrl}/${route}`, this.generalService.getHttpOptions())
  }

  public post(route: string, object: any) {
    this.http.post(`${backendUrl}/${route}`, object, this.generalService.getHttpOptions())
      .subscribe(res => this.generalService.openSnackBar('Success!'), err =>
        this.generalService.resolveError(err));
  }

  public postObserver(route: string, object: any) {
    return this.http.post(`${backendUrl}/${route}`, object, this.generalService.getHttpOptions());
  }

}

