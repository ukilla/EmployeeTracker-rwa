import { Component } from '@angular/core';
import { User } from '../models/user';
import { HttpClient } from '@angular/common/http';
import { AuthService } from 'src/services/auth.service';
import { Store, select } from '@ngrx/store';
import { UserStateInterface } from '../models/user.state';
import { selectUserFeature } from '../store/selectors/user.selectors';


@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent {
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

}
