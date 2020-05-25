import {Component, Input, OnInit} from '@angular/core';
import {GeneralService} from '../../services/general.service';
import {RestService} from '../../services/rest.service';
import {AuthService} from '../../services/auth.service';
import {MatDialog} from '@angular/material';
import {CreateGroupComponent} from '../create-group/create-group.component';
import {CommentsComponent} from '../comments/comments.component';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss']
})
export class PostComponent implements OnInit {
  @Input() post: any;
  public liked;

  constructor(public gs: GeneralService,
              public rest: RestService,
              public auth: AuthService,
              public dialog: MatDialog) {
  }

  ngOnInit() {
    this.liked = this.post.likes.includes(this.auth.userId);
    console.log(this.post)
  }

  like() {
    if (this.post.likes.includes(this.auth.userId)) {
      this.post.likes.pop(this.auth.userId);
    } else {
      this.post.likes.push(this.auth.userId);
    }
    this.liked = !this.liked;
    this.rest.post('/post/like/' + this.post._id, {});
  }

  public openComments() {
    const dialogRef = this.dialog.open(CommentsComponent, {
      width: '350px',
      data: {post: this.post}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });

  }
}
