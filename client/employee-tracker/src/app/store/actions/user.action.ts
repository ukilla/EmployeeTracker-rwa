import { createAction, props } from '@ngrx/store';
import { User } from 'src/app/models/user';

export const logInUser = createAction(
  '[User] Log in user',
  props<{ user: { username: string; password: string } }>(),
);
export const logInUserSuccess = createAction(
  '[User] Log in user success',
  props<{ user: { username: string; password: string } }>(),
);
export const logInUserFailure = createAction(
  '[User] Log in user failure',
  props<{ error: string }>(),
);

export const registerUser = createAction(
  '[User] Register user',
  props<{
    user: {
      firstName: string;
      lastName: string;
      username: string;
      password: string;
    };
  }>(),
);
export const registerUserFailure = createAction('[User] Register user failure');

export const registerUserSucess = createAction(
  '[User] Register user success',
  props<{
    user: {
      firstName: string;
      lastName: string;
      username: string;
      password: string;
    };
  }>(),
);
