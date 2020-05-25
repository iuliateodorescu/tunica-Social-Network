import {Component, Input, OnInit} from '@angular/core';
import {RestService} from '../../services/rest.service';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-group-page',
  templateUrl: './group-page.component.html',
  styleUrls: ['./group-page.component.scss']
})
export class GroupPageComponent implements OnInit {
  public posts;
  @Input() groupId;

  constructor(private rest: RestService,
              private route: ActivatedRoute) {
    this.groupId = this.route.snapshot.params.id;
    console.log(this.groupId);
  }

  ngOnInit() {
    this.rest.getAll('groups/getPosts/' + this.groupId).subscribe(posts => {
      this.posts = posts.reverse();
      console.log(posts);
    });
  }

}
