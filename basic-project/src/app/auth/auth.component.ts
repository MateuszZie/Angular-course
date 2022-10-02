import {
  Component,
  ComponentFactoryResolver,
  OnInit,
  ViewChild,
} from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AlertComponent } from '../shered/alert/alert/alert.component';
import { PlaceHolderDirective } from '../shered/placeholder.directive';
import { AuthService, ResponseAuthData } from './auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css'],
})
export class AuthComponent implements OnInit {
  @ViewChild('f') form: NgForm;
  @ViewChild(PlaceHolderDirective) errorHolder: PlaceHolderDirective;

  isLoginMode = true;
  isLoading = false;
  error = null;
  constructor(
    private authServise: AuthService,
    private router: Router,
    private componentFactoryResolver: ComponentFactoryResolver
  ) {}

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
        this.router.navigate(['/recipies']);
      },
      (error) => {
        console.log(error);
        this.error = error;
        this.displayErrorMessage(error);
        this.isLoading = false;
      }
    );
    this.form.reset();
  }

  handleError() {
    this.error = null;
  }

  private displayErrorMessage(message: string) {
    const cmpFactoryRes =
      this.componentFactoryResolver.resolveComponentFactory(AlertComponent);

    const hostViewContainer = this.errorHolder.viewContainerRef;
    hostViewContainer.clear();
    hostViewContainer.createComponent(cmpFactoryRes);
  }
}
