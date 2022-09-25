import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from './auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css'],
})
export class AuthComponent implements OnInit {
  @ViewChild('f') form: NgForm;

  isLoginMode = true;

  constructor(private authServise: AuthService) {}

  ngOnInit(): void {}

  swithLoginMode() {
    this.isLoginMode = !this.isLoginMode;
  }

  onSubmit() {
    if (this.form.invalid) {
      return;
    }
    const email = this.form.value.email;
    const password = this.form.value.password;

    if (this.isLoginMode) {
      console.log('loginMode');
    } else {
      this.authServise.signUp(email, password).subscribe(
        (response) => console.log(response),
        (error) => console.log(error)
      );
    }
    this.form.reset();
  }
}
