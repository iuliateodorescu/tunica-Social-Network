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

  public disabled = false;

  constructor(private friendsService: FriendsService,
              private auth: AuthService,
              private gs: GeneralService,
              private router: Router) { 
    this.auth.getCurrentUser().then((user: any) => this.disabled = user.friends.find(f => f === this.friend._id));
  }

  ngOnInit() {
  }

  async addFriend() {
    try {
      await this.friendsService.addFriend(this.friend._id);
      this.disabled = true;
      this.gs.openSnackBar('Success!');
    } catch (e) {
      this.gs.openSnackBar('An error has occured!');
      console.error(e);
    }
  }

  openProfile() {
    console.log(this.friend._id);
    this.router.navigate(['users/' + this.friend._id]);
  }

}
