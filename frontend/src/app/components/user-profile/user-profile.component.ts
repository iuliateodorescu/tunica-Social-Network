import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {UpdateProfileService} from '../../services/update-profile.service';
import {DomSanitizer} from '@angular/platform-browser';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {

  public profile = {
    firstname: '',
    lastname: '',
    username: '',
    university: '',
    description: ''
  };
  public photo;

  constructor(public updateProfileService: UpdateProfileService,
              private sanitizer: DomSanitizer,
              private cdr: ChangeDetectorRef) {
    this.updatePhoto();
    this.updateProfileService.getProfile().then(p => console.log(p));
  }

  ngOnInit() {
  }

  log(asd) {
    console.log(asd);
  }

  onSubmit() {
    if (this.profile['_id']) {
      this.updateProfileService.update(this.profile);
    } else {
      this.updateProfileService.setProfile(this.profile);
    }
    console.log(this.profile);
  }

  onFileChange(event) {
    if (event.target.files && event.target.files.length > 0) {
      const file: File = event.target.files[0];
      this.updateProfileService.uploadPhoto(file);
      setTimeout(this.updatePhoto, 2000);
    }
  }

  updatePhoto = () => {
    this.updateProfileService.getProfile().then(profile => {
      if (profile) {
        const profile2: any = profile;
        this.profile = profile2;
        if (profile2.photo) {
          this.photo = 'http://localhost:3000/api/profile/photo/' + profile2.photo;
          this.cdr.detectChanges();
        }
      }
    });
  };
}
