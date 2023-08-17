import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../models/user';
import { Store } from '@ngrx/store';
import { UserStateInterface } from '../models/user.state';
import * as AuthActions from '../store/actions/user.action';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent {
  user: User | null;

  constructor(private store: Store<UserStateInterface>) {
    const storedUser = localStorage.getItem('loggedUser');
    this.user = storedUser ? JSON.parse(storedUser) : null;
  }

  ngOnInit(): void {}

  logout() {
    this.user = null;
    this.store.dispatch(AuthActions.logOutUser());
    window.location.reload();
  }
}
