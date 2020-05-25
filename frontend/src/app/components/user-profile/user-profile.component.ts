import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {UpdateProfileService} from '../../services/update-profile.service';
import {DomSanitizer} from '@angular/platform-browser';
import {GeneralService} from '../../services/general.service';
import {RestService} from '../../services/rest.service';

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
    description: '',
    photo: ''
  };
  public photo;
  public universities;

  constructor(public updateProfileService: UpdateProfileService,
              private sanitizer: DomSanitizer,
              private cdr: ChangeDetectorRef,
              public gs: GeneralService,
              public rest: RestService) {
    this.updateProfileService.getProfile().then((p:any) => this.profile = p);

    this.rest.getAll('university').subscribe(res => {
      this.universities = res;
      // @ts-ignore
      this.locations = [...(new Set(res.map(u => u.city)))];
    });
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
      this.gs.uploadImage(file).subscribe((res: any) => {
        this.profile.photo = res.filename;
        console.log(res.filename);
      }, err => {
        this.gs.resolveError(err);
      });
    }
  }


}
