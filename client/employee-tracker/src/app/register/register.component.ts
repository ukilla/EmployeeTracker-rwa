import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/services/auth.service';
import { UserStateInterface } from '../models/user.state';
import { Store } from '@ngrx/store';
import * as AuthActions from '../store/actions/user.action';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent {
  registrationForm: FormGroup; 

  constructor(
    private formBuilder: FormBuilder,
    private http: HttpClient,
    private router: Router,
    private registerService: AuthService,
    private store: Store<UserStateInterface>
  ) {
    this.registrationForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      username: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(6)]],
      passwordAdmin: ['', [Validators.required]],
    });
  }

  onSubmit() {
    if (this.registrationForm.valid) {
      const formData = this.registrationForm.value;
      this.store.dispatch(
        AuthActions.registerUser({
          user: {
            username: formData.username,
            password: formData.password,
            firstName: formData.firstName,
            lastName: formData.lastName,
            passwordAdmin: formData.passwordAdmin,
          },
        })
      );
      this.registrationForm.reset();
    }
  }
}
