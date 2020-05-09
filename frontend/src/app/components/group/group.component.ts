import {Component, Input, OnInit, Output} from '@angular/core';
import {GroupsService} from '../../services/groups.service';
import {AuthService} from '../../services/auth.service';
import {GeneralService} from '../../services/general.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-group',
  templateUrl: './group.component.html',
  styleUrls: ['./group.component.scss']
})
export class GroupComponent implements OnInit {
  @Input() group;

  public disabled = false;

  constructor(private groupsService: GroupsService,
              private auth: AuthService,
              private gs: GeneralService,
              private router: Router) {
    this.auth.getCurrentUser().then((user: any) => this.disabled = user.groups.find(g => g === this.group._id));
  }

  ngOnInit() {
  }

  async joinGroup() {
    try {
      await this.groupsService.addUserToGroup(this.group._id);
      this.disabled = true;
      this.gs.openSnackBar('Success!');
    } catch (e) {
      this.gs.openSnackBar('An error has occured!');
      console.error(e);
    }
  }

  openGroup() {
    console.log(this.group._id);
    this.router.navigate(['group/' + this.group._id]);
  }
}
