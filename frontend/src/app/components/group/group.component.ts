import {Component, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-group',
  templateUrl: './group.component.html',
  styleUrls: ['./group.component.scss']
})
export class GroupComponent implements OnInit {
  @Input() group;


  constructor() { }
  ngOnInit() {
  }

}
