import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from 'src/app/models/user';
import * as AuthActions from '../app/store/actions/user.action';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = 'http://localhost:3000/api';

  constructor(private http: HttpClient) {}

  login(username: string, password: string): Observable<User> {
    const loginData = { username, password };
    return this.http.post<User>(`${this.apiUrl}/user/login`, loginData, {
      withCredentials: true,
    });
  }

  logout() {
    return this.http.post(
      'http://localhost:3000/api/user/logout',
      {},
      { withCredentials: true }
    );
  }

  register(
    username: string,
    password: string,
    firstName: string,
    lastName: string
  ): Observable<User> {
    const registerData = { username, password, firstName, lastName };
    return this.http.post<User>(`${this.apiUrl}/user`, registerData);
  }

  getUserByCookie() {
    const user = this.http.get(
      'http://localhost:3000/api/user/getUserByCookie',
      {
        withCredentials: true,
      }
    );
    return user;
  }
}
