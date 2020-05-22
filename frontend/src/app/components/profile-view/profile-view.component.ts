import { Component, Input, OnInit } from '@angular/core';
import {GeneralService} from '../../services/general.service';
import {ActivatedRoute} from '@angular/router';
import {FriendsService} from '../../services/friends.service';

@Component({
  selector: 'app-profile-view',
  templateUrl: './profile-view.component.html',
  styleUrls: ['./profile-view.component.scss']
})
export class ProfileViewComponent implements OnInit {
  public profile;
  @Input() userId;

  constructor(public friendsService: FriendsService,
              public gs: GeneralService,
              private route: ActivatedRoute) {
    this.userId = this.route.snapshot.params.id;
    console.log(this.userId);
  }

  ngOnInit() {
    this.friendsService.getFriendProfile(this.userId).subscribe(res => {
      this.profile = res;
      console.log(res);
    });
  }


}
