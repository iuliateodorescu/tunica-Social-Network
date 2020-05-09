import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {RestService} from '../../services/rest.service';
import {GeneralService} from '../../services/general.service';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.scss']
})
export class CommentsComponent implements OnInit {

  public comment = {text: ''};
  public comments;

  constructor(public dialogRef: MatDialogRef<CommentsComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any,
              private rest: RestService,
              private gs: GeneralService) {
  }

  ngOnInit() {
    this.refreshComments();
  }

  public addComment() {
    if (this.comment.text) {
      this.rest.post('post/addComment/' + this.data.post._id, this.comment);
      setTimeout(() => this.refreshComments(), 1000);
    } else {
      this.gs.openSnackBar('Can\'t comment without any text');
    }
  }

  public refreshComments() {
    this.rest.postObserver('post/comments/' + this.data.post._id, this.data.post).subscribe(comments => {
      this.comments = comments;
    });
  }

}
