import {Injectable} from '@angular/core';
import {RestService} from './rest.service';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {AuthService} from './auth.service';
import {GeneralService} from './general.service';
import {backendUrl} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class GroupsService {

  constructor(private rest: RestService,
              private http: HttpClient,
              private auth: AuthService,
              private gs: GeneralService) {
  }

  public create(group) {
    this.rest.addOne('groups/create', group);
  }

  public getAll(): Observable<any> {
    return this.rest.getAll('groups/getAll');
  }

  public async addUserToGroup(groupId) {
    const user: any = await this.auth.getCurrentUser();
    const obj = {userId: user._id, groupId};
    return this.http.post(`${backendUrl}/groups/addUserToGroup`, obj, this.gs.getHttpOptions()).toPromise();
  }
}
