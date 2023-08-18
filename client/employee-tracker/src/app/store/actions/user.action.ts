import { createAction, props } from '@ngrx/store';
import { User } from 'src/app/models/user';
import { UserStateInterface } from 'src/app/models/user.state';

export const logInUser = createAction(
  '[User] Log in user',
  props<{ user: { username: string; password: string } }>()
);
export const logInUserSuccess = createAction(
  '[User] Log in user success',
  props<{ user: { username: string; password: string } }>()
);
export const logInUserFailure = createAction(
  '[User] Log in user failure',
  props<{ error: string }>()
);

export const logOutUser = createAction('[User] Log Out User');
export const logOutUserSuccess = createAction('[User] Log Out User Success');
export const logOutUserFailure = createAction('[User] Log Out User Failure');

export const registerUser = createAction(
  '[User] Register user',
  props<{
    user: {
      firstName: string;
      lastName: string;
      username: string;
      password: string;
    };
  }>()
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
  }>()
);

export const rehydrateUser = createAction(
  '[User] Rehydrate',
  props<{ message: string }>()
);

export const rehydrateUserFailure = createAction(
  '[User] Rehydrate Failure',
  props<{ error: string }>()
);


