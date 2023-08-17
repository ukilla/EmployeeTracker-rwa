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
          this.router.navigate(['/']);
          this.authService
            .getUserByCookie()
            .subscribe((user) =>
              localStorage.setItem('loggedUser', JSON.stringify(user))
            );
        })
      ),
    { dispatch: false }
  );

  logOutUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.logOutUser),
      mergeMap(() => {
        localStorage.removeItem('loggedUser');
        return this.authService.logout().pipe(
          map(() => AuthActions.logOutUser()),
          tap(() => {
            this.router.navigate(['/login']);
          })
        );
      })
    )
  );
}
