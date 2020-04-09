import { Component, OnInit } from '@angular/core';
import { UpdateProfileService } from '../../services/update-profile.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  constructor(public updateProfileService: UpdateProfileService) { }

  ngOnInit() {
  }

}
