import {Injectable} from '@angular/core';
import {RestService} from './rest.service';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GroupsService {

  constructor(private rest: RestService) {
  }

  public create(group) {
    this.rest.addOne('groups/create', group);
  }

  public getAll(): Observable<any> {
    return this.rest.getAll('groups/getAll');
  }
}
