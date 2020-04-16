import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {GroupsService} from '../../services/groups.service';

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
    university: '',
    topic: '',
    members: []
  };
  public universities = ['Uni1', 'Uni2'];
  public topics = ['topic1', 'topic2'];
  public locations = ['loc1', 'loc2'];

  constructor(public dialogRef: MatDialogRef<CreateGroupComponent>,
              public groupsService: GroupsService) {
  }

  onNoClick() {
    this.dialogRef.close();
  }

  submit() {
    console.log(this.group);
    this.groupsService.create(this.group);
  }

}
