import {
  Component,
  ComponentFactoryResolver,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { AlertComponent } from '../shered/alert/alert/alert.component';
import { PlaceHolderDirective } from '../shered/placeholder.directive';
import { AuthService, ResponseAuthData } from './auth.service';
import * as fromAppStore from '../store/app.reducer';
import { Store } from '@ngrx/store';
import * as AuthActions from './store/auth.actions';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css'],
})
export class AuthComponent implements OnInit, OnDestroy {
  @ViewChild('f') form: NgForm;
  @ViewChild(PlaceHolderDirective) errorHolder: PlaceHolderDirective;

  isLoginMode = true;
  isLoading = false;
  error = null;
  constructor(
    private authServise: AuthService,
    private router: Router,
    private componentFactoryResolver: ComponentFactoryResolver,
    private store: Store<fromAppStore.AppState>
  ) {}

  loginObservable: Observable<ResponseAuthData>;

  closeSub: Subscription;

  ngOnInit(): void {
    this.store.select('auth').subscribe((state) => {
      this.isLoading = state.loading;
      this.error = state.authError;
    });
  }

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
      // this.loginObservable = this.authServise.login(email, password);
      this.store.dispatch(
        new AuthActions.LoginStart({ email: email, password: password })
      );
    } else {
      this.loginObservable = this.authServise.signUp(email, password);
    }

    // this.loginObservable.subscribe(
    //   (response) => {
    //     console.log(response), (this.isLoading = false);
    //     this.router.navigate(['/recipies']);
    //   },
    //   (error) => {
    //     console.log(error);
    //     this.error = error;
    //     this.displayErrorMessage(error);
    //     this.isLoading = false;
    //   }
    // );
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
    const compRef = hostViewContainer.createComponent(cmpFactoryRes);
    compRef.instance.message = message;
    this.closeSub = compRef.instance.close.subscribe(() => {
      this.closeSub.unsubscribe();
      hostViewContainer.clear();
    });
  }

  ngOnDestroy(): void {
    if (this.closeSub) {
      this.closeSub.unsubscribe();
    }
  }
}
