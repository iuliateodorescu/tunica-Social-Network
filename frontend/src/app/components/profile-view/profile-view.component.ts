import { Component, OnInit } from '@angular/core';
import { UpdateProfileService } from '../../services/update-profile.service';

@Component({
  selector: 'app-profile-view',
  templateUrl: './profile-view.component.html',
  styleUrls: ['./profile-view.component.scss']
})
export class ProfileViewComponent implements OnInit {

  public profile;

  constructor(public updateProfileService: UpdateProfileService) { 
    updateProfileService.getProfile().then( profile => this.profile = profile ).catch( err => console.log(err) );
  }

  ngOnInit() {
  }


}
