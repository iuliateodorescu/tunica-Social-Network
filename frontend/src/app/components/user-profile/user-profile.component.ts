import { Component, OnInit } from '@angular/core';
import { UpdateProfileService } from '../../services/update-profile.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {

  public user_info = {
    username: '',
    university: '',
    interests: ''
  };

  constructor(public updateProfileService: UpdateProfileService) { }

  ngOnInit() {
  }

  /*onSubmit() {
    const profile = {
      username: this.user_info.username,
      university: this.user_info.university,
      interests: this.user_info.interests
    };
    console.log(profile);

    this.updateProfileService.update(profile);
  }*/
}
