import {Component, Input, OnInit} from '@angular/core';
import {PostsService} from '../../services/posts.service';
import {GeneralService} from '../../services/general.service';
import {RestService} from '../../services/rest.service';

@Component({
  selector: 'app-create-post',
  templateUrl: './create-post.component.html',
  styleUrls: ['./create-post.component.scss']
})
export class CreatePostComponent implements OnInit {
  @Input() type;
  public post = {
    image: '',
    text: '',
    type: this.type
  };

  constructor(private ps: PostsService,
              private gs: GeneralService,
              private rest: RestService) {
  }

  ngOnInit() {
    this.post.type = this.type;
  }

  onFileChange(event) {
    if (event.target.files && event.target.files.length > 0) {
      const file: File = event.target.files[0];
      this.gs.uploadImage(file).subscribe((res: any) => {
        this.post.image = res.filename;
        console.log(res.filename);
      }, err => {
        this.gs.resolveError(err);
      });
    }
  }

  submit() {
    if (!this.post.image && !this.post.text) {
      this.gs.openSnackBar('Can\'t create an empty post');
    } else {
      this.rest.addOne('post/', this.post);
      console.log(this.type);
    }
  }


}
