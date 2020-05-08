import {Component, OnInit} from '@angular/core';
import {RestService} from '../../services/rest.service';

@Component({
  selector: 'app-feed',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.scss']
})
export class FeedComponent implements OnInit {

  public posts = [];

  constructor(private rest: RestService) {
    this.rest.getAll('/post/getOwn').subscribe(posts => this.posts = posts);
  }

  ngOnInit() {
  }

}
