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
export class FriendsService {

  constructor(private rest: RestService,
              private http: HttpClient,
              private auth: AuthService,
              private gs: GeneralService) {
  }

  public getAll(): Observable<any> {
    return this.rest.getAll(`user/getAll`);
  }

  public async addFriend(receiverId) {
    const sender: any = await this.auth.getCurrentUser();
    const obj = {senderId: sender._id, receiverId};
    return this.http.post(`${backendUrl}/user/addFriend`, obj, this.gs.getHttpOptions()).toPromise();
  }

  public getFriendProfile(id: string) {
    return this.rest.postObserver(`user/getFriend`, {id});
  }

}
