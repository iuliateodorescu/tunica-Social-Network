import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {GeneralService} from './general.service';

@Injectable({
  providedIn: 'root'
})
export class PostsService {

  constructor(private http: HttpClient,
              private gs: GeneralService) { }

  public uploadPhoto(file) {
    const formData = new FormData();
    formData.append('file', file);
    this.http.post('api/general/image', formData, this.gs.getHttpOptions())
      .subscribe(res => {
        console.log(res);
      }, error => {
        this.gs.resolveError(error);
      });
  }
}
