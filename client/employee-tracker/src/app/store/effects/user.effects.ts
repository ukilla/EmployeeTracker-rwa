import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap, switchMap } from 'rxjs/operators';
import { AuthService } from 'src/services/auth.service';
import * as AuthActions from '../actions/user.action';
import { of, tap } from 'rxjs';
import { Router } from '@angular/router';

@Injectable()
export class UserEffects {
  constructor(
    private actions$: Actions,
    private authService: AuthService,
    private router: Router
  ) {}

  login$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.logInUser),
      switchMap((action) =>
        this.authService.login(action.user.username, action.user.password).pipe(
          map((user) => AuthActions.logInUserSuccess({ user })),
          catchError((error) => of(AuthActions.logInUserFailure({ error })))
        )
      )
    )
  );
  loginSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AuthActions.logInUserSuccess),
        tap(() => {
          this.authService.getUserByCookie().subscribe((user) => {
            localStorage.setItem('loggedUser', JSON.stringify(user));
            localStorage.setItem('isLoggedIn', 'true');
          });
          this.router.navigate(['/']);
        })
      ),
    { dispatch: false }
  );

  logOutUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.logOutUser),
      switchMap(() =>
        this.authService.logout().pipe(
          map(() => AuthActions.logOutUserSuccess()),
          catchError((error) => of(AuthActions.logOutUserFailure()))
        )
      )
    )
  );
  logOutUserSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AuthActions.logOutUserSuccess),
        tap(() => {
          localStorage.removeItem('loggedUser');
          localStorage.removeItem('isLoggedIn');
          this.router.navigate(['/']);
        })
      ),
    { dispatch: false }
  );

  rehydrateUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.rehydrateUser),
      map(() => {
        const userData = localStorage.getItem('loggedUser');
        if (userData) {
          const user = JSON.parse(userData);
          return AuthActions.logInUserSuccess({ user: user });
        } else {
          return AuthActions.logOutUser();
        }
      }),
      catchError((error) => of(AuthActions.rehydrateUserFailure({ error })))
    )
  );

  register$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.registerUser),
      switchMap((action) =>
        this.authService
          .register(
            action.user.username,
            action.user.password,
            action.user.firstName,
            action.user.lastName
          )
          .pipe(
            map((user) => AuthActions.registerUserSucess({ user })),
            catchError((error) => of(AuthActions.registerUserFailure()))
          )
      )
    )
  );
  registerSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AuthActions.registerUserSucess),
        tap(() => {
          this.router.navigate(['/login']);
        })
      ),
    { dispatch: false }
  );
}
