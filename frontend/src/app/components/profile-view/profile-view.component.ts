import { Component, Input, OnInit } from '@angular/core';
import {GeneralService} from '../../services/general.service';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-profile-view',
  templateUrl: './profile-view.component.html',
  styleUrls: ['./profile-view.component.scss']
})
export class ProfileViewComponent implements OnInit {

  @Input() userId;

  constructor(public gs: GeneralService,
              private route: ActivatedRoute) {
    this.userId = this.route.snapshot.params.id;
    console.log(this.userId);            
  }

  ngOnInit() {
  }

  
}
