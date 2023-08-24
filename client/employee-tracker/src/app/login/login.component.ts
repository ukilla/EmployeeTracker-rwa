import { Component } from '@angular/core';
import { Store, select } from '@ngrx/store';
import * as AuthActions from '../store/actions/user.action';
import { AuthService } from 'src/services/auth.service';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { UserStateInterface } from '../models/user.state';
import {
  selectorLoading,
  selectorLoggedin,
} from '../store/selectors/user.selectors';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  form!: FormGroup;
  isLoading$: Observable<boolean>;
  isLoggedIn$: Observable<boolean>;
  constructor(
    private formBuilder: FormBuilder,
    private http: HttpClient,
    private router: Router,
    private loginService: AuthService,
    private store: Store<UserStateInterface>
  ) {
    this.isLoading$ = this.store.pipe(select(selectorLoading));
    this.isLoggedIn$ = this.store.pipe(select(selectorLoggedin));
  }
  ngOnInit(): void {
    this.form = this.formBuilder.group({
      username: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required),
    });
  }
  login(): void {
    const credentials = this.form.value;
    this.store.dispatch(
      AuthActions.logInUser({
        user: {
          username: credentials.username,
          password: credentials.password,
        },
      })
    );

    this.isLoggedIn$.subscribe((isLoggedIn) => {
      if (isLoggedIn) {
        this.router.navigate(['/']);
      }
    });
  }
}
