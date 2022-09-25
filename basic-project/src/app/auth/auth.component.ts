import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css'],
})
export class AuthComponent implements OnInit {
  @ViewChild('f') form: NgForm;

  isLoginMode = true;

  constructor() {}

  ngOnInit(): void {}

  swithLoginMode() {
    this.isLoginMode = !this.isLoginMode;
  }

  onSubmit() {
    console.log(this.form.value);
  }
}
