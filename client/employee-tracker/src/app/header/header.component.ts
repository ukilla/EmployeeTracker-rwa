import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../models/user';
import { Store, select } from '@ngrx/store';
import { UserStateInterface } from '../models/user.state';
import * as AuthActions from '../store/actions/user.action';
import { AuthService } from 'src/services/auth.service';
import { HttpClient } from '@angular/common/http';
import { selectUserFeature } from '../store/selectors/user.selectors';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent {
  authenticated = true;
  user!: User | null;
  isLoggedIn!: boolean;

  constructor(
    private httpClient: HttpClient,
    private authService: AuthService,
    private store: Store<UserStateInterface>
  ) {}

  ngOnInit(): void {
    this.store.pipe(select(selectUserFeature)).subscribe((userState) => {
      this.isLoggedIn = userState.isLoggedIn;
      this.authenticated = userState.isLoggedIn;
    });
  }

  logout() {
    this.user = null;
    this.store.dispatch(AuthActions.logOutUser());
  }
}
