import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {GeneralService} from './general.service';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PostsService {

  constructor(private http: HttpClient,
              private gs: GeneralService) {
  }


}
