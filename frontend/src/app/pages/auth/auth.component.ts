import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../services/auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit {

  public useLoginComponent = false;

  constructor(public authService: AuthService) {
  }

  ngOnInit() {
  }

  switchComponent() {
    this.useLoginComponent = !this.useLoginComponent;
  }

}
