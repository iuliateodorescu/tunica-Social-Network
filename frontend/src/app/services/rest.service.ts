import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {GeneralService} from './general.service';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RestService {

  constructor(private http: HttpClient,
              private generalService: GeneralService) {
  }

  public addOne(route: string, object: any) {
    this.http.post(`/api/${route}`, object, this.generalService.getHttpOptions())
      .subscribe(res => this.generalService.openSnackBar('Success!'), err =>
        this.generalService.resolveError(err));
  }

  public getAll(route: string): Observable<any> {
    return this.http.get(`/api/${route}`, this.generalService.getHttpOptions());
  }
}
