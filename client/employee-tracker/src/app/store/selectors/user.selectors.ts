import { createFeatureSelector, createSelector } from '@ngrx/store';
import { UserStateInterface } from 'src/app/models/user.state';

export const selectUserState = (state: UserStateInterface) => state;

export const selectorLoading = createSelector(
  selectUserState,
  (state: UserStateInterface) => state.isLoading
);
export const selectorLoggedin = createSelector(
  selectUserState,
  (state: UserStateInterface) => state.isLoggedIn
);
export const selectorError = createSelector(
  selectUserState,
  (state: UserStateInterface) => state.error
);
