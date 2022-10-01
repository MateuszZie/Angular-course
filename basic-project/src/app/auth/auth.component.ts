import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Observable } from 'rxjs';
import { AuthService, ResponseAuthData } from './auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css'],
})
export class AuthComponent implements OnInit {
  @ViewChild('f') form: NgForm;

  isLoginMode = true;
  isLoading = false;
  error = null;
  constructor(private authServise: AuthService) {}

  loginObservable: Observable<ResponseAuthData>;

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
    this.isLoading = true;
    if (this.isLoginMode) {
      this.loginObservable = this.authServise.login(email, password);
    } else {
      this.loginObservable = this.authServise.signUp(email, password);
    }

    this.loginObservable.subscribe(
      (response) => {
        console.log(response), (this.isLoading = false);
      },
      (error) => {
        console.log(error);
        this.error = error;
        this.isLoading = false;
      }
    );
    this.form.reset();
  }
}
