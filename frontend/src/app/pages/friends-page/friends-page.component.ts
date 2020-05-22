import { Component, OnInit } from '@angular/core';
import { RestService } from '../../services/rest.service';
import { FriendsService } from '../../services/friends.service'

@Component({
  selector: 'app-friends-page',
  templateUrl: './friends-page.component.html',
  styleUrls: ['./friends-page.component.scss']
})
export class FriendsPageComponent implements OnInit {

  public friends = [];
  public allfriends = [];
  public universities = [];
  public friends2;
  public filters = {
    university: {_id: ''}
  };

  constructor(public rest: RestService,
              public friendsService: FriendsService) {
      this.rest.getAll('university').subscribe( res => {
        this.universities = res;
      });
      this.refresh();
   }

  ngOnInit() {
  }

   public refresh() {
     this.friends2 = this.friendsService.getAll().subscribe();
    this.friends2 = this.friendsService.getAll().subscribe(res => {
      this.friends = res;
      this.allfriends = res;
      console.log(res)
    });
  }

  onUniChange(event) {
    this.friends = this.allfriends.filter(f => {
      console.log(f.profile.university, this.filters.university._id);
      return f.profile.university === this.filters.university._id;
    });
  }

}
