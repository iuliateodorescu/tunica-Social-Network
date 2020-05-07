import {Component, OnInit} from '@angular/core';
import {MatDialog} from '@angular/material';
import {CreateGroupComponent} from '../../components/create-group/create-group.component';
import {GroupsService} from '../../services/groups.service';
import {RestService} from '../../services/rest.service';
import {group} from '@angular/animations';

@Component({
  selector: 'app-groups-page',
  templateUrl: './groups-page.component.html',
  styleUrls: ['./groups-page.component.scss']
})
export class GroupsPageComponent implements OnInit {

  public groups = [];
  public allgroups = [];
  public locations = [];
  public universities = [];
  public filters = {
    university: {_id: ''},
    location: ''
  };

  constructor(public dialog: MatDialog,
              public groupsService: GroupsService,
              public rest: RestService) {
    this.rest.getAll('university').subscribe(res => {
      this.universities = res;
      // @ts-ignore
      this.locations = [...(new Set(res.map(u => u.city)))];
    });
    this.refresh();
  }

  ngOnInit() {
  }

  public showCreateModal() {
    const dialogRef = this.dialog.open(CreateGroupComponent, {
      width: '250px',
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.refresh();
    });

  }

  public refresh() {
    this.groupsService.getAll().subscribe(res => {
      this.groups = res;
      this.allgroups = res;
    });
  }

  onLocationChange(event) {
    this.groups = this.allgroups.filter(g => {
      return g.location === this.filters.location;
    });
  }

  onUniChange(event) {
    this.groups = this.allgroups.filter(g => {
      console.log(g.university, this.filters.university._id);
      return g.university === this.filters.university._id;
    });
  }

}
