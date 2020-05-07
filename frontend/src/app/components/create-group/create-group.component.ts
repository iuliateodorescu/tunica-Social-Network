import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {GroupsService} from '../../services/groups.service';
import {GeneralService} from '../../services/general.service';
import {RestService} from '../../services/rest.service';

@Component({
  selector: 'app-create-group',
  templateUrl: './create-group.component.html',
  styleUrls: ['./create-group.component.scss']
})
export class CreateGroupComponent {

  public group = {
    name: '',
    description: '',
    location: '',
    university: {city: ''},
    members: []
  };

  public universities = [];
  public locations = [];
  public allUnis = [];
  public allLocs = [];

  constructor(public dialogRef: MatDialogRef<CreateGroupComponent>,
              public groupsService: GroupsService,
              public rest: RestService) {
    this.rest.getAll('university').subscribe(res => {
      this.allUnis = res;
      this.universities = res;
      this.locations = [...(new Set(this.universities.map(u => u.city)))];
      this.allLocs = [...(new Set(this.universities.map(u => u.city)))];
    });
  }

  onNoClick() {
    this.dialogRef.close();
  }

  submit() {
    console.log(this.group);
    this.groupsService.create(this.group);
  }

  onLocationChange(event) {
    console.log(':(');
    this.universities = this.allUnis.filter(u => u.city === this.group.location);
  }

  onUniChange(event) {
    this.group.location = this.group.university.city;
  }

}
