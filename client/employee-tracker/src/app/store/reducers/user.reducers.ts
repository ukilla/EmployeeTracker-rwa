import { EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { createReducer, on } from '@ngrx/store';
import { User } from 'src/app/models/user';
import { UserStateInterface } from 'src/app/models/user.state';
import * as UserActions from '../actions/user.action';
export const adapter: EntityAdapter<User> = createEntityAdapter<User>();

export const initialState: UserStateInterface = adapter.getInitialState({
  isLoading: false,
  error: null,
  isLoggedIn: false,
});

export const reducers = createReducer(
  initialState,
  on(UserActions.logInUser, (state) => ({ ...state, isLoading: true })),
  on(UserActions.logInUserSuccess, (state) => ({
    ...state,
    isLoading: false,
    isLoggedIn: true,
  })),
  on(UserActions.logInUserFailure, (state,action) => ({
    ...state,
    isLoading: false,
    isLoggedIn: false,
    error:action.error
  })),
);
