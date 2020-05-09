import {Component, Input, OnInit} from '@angular/core';
import {GeneralService} from '../../services/general.service';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.scss']
})
export class CommentComponent implements OnInit {
  @Input() comment;

  constructor(public gs: GeneralService) {
  }

  ngOnInit() {
    console.log(this.comment)
  }

}
