import {Component, OnInit} from '@angular/core';
import {PostsService} from '../../services/posts.service';

@Component({
  selector: 'app-create-post',
  templateUrl: './create-post.component.html',
  styleUrls: ['./create-post.component.scss']
})
export class CreatePostComponent implements OnInit {

  public post = {};

  constructor(private ps: PostsService) {
  }

  ngOnInit() {
  }

  onFileChange(event) {
    if (event.target.files && event.target.files.length > 0) {
      const file: File = event.target.files[0];
      this.ps.uploadPhoto(file);
    }
  }


}
