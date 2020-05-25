import {Component, Input, OnInit} from '@angular/core';
import {FriendsService} from '../../services/friends.service';
import {AuthService} from '../../services/auth.service';
import {GeneralService} from '../../services/general.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-profile-card',
  templateUrl: './profile-card.component.html',
  styleUrls: ['./profile-card.component.scss']
})
export class ProfileCardComponent implements OnInit {
  @Input() friend;
  @Input() userId;

  public disabled = false;

  constructor(private friendsService: FriendsService,
              private auth: AuthService,
              public gs: GeneralService,
              private router: Router) {
    this.auth.getCurrentUser().then((user: any) => this.disabled = user.friends.find(f => f === this.userId));

  }

  ngOnInit() {
  }

  async addFriend() {
    try {
      await this.friendsService.addFriend(this.userId);
      this.disabled = true;
      this.gs.openSnackBar('Success!');
    } catch (e) {
      this.gs.openSnackBar('An error has occured!');
      console.error(e);
    }
  }

  openProfile() {
    this.router.navigate(['friend/' + this.userId]);
  }

}
