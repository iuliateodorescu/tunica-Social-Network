import {Component, OnInit} from '@angular/core';
import {MatDialog} from '@angular/material';
import {CreateGroupComponent} from '../../components/create-group/create-group.component';
import {GroupsService} from '../../services/groups.service';

@Component({
  selector: 'app-groups-page',
  templateUrl: './groups-page.component.html',
  styleUrls: ['./groups-page.component.scss']
})
export class GroupsPageComponent implements OnInit {

  public groups;

  constructor(public dialog: MatDialog,
              public groupsService: GroupsService) {
    this.groups = this.groupsService.getAll();
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
    this.groups = this.groupsService.getAll();
  }

}
