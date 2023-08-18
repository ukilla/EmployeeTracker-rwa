import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { UserStateInterface } from './models/user.state';
import { rehydrateUser } from './store/actions/user.action';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'employee-tracker';
  constructor(private store: Store<UserStateInterface>) {}

  ngOnInit(): void {
    const userData = localStorage.getItem('loggedUser');
    if (userData) {
      this.store.dispatch(rehydrateUser({message: JSON.stringify(userData)}));
    }
  }
}
