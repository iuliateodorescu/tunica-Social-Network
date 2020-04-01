import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../services/auth.service';
import {MatSnackBar} from '@angular/material';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  public credentials = {
    email: '',
    password: '',
    password2: ''
  };

  constructor(public authService: AuthService, private snackBar: MatSnackBar) {
  }

  ngOnInit() {
  }

  onSubmit() {
    const user = {
      email: this.credentials.email,
      password: this.credentials.password
    };
    console.log(user);
    if (this.credentials.password === this.credentials.password2) {
      this.authService.register(user);
    } else {
      this.snackBar.open('Passwords do not match');
    }
  }
}
