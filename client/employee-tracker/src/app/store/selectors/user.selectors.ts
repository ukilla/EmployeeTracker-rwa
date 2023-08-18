import { createFeatureSelector, createSelector } from '@ngrx/store';
import { UserStateInterface } from 'src/app/models/user.state';

export const selectUserFeature = createFeatureSelector<UserStateInterface>('user');
export const selectorLoading = createSelector(
  selectUserFeature,
  (state: UserStateInterface) => state.isLoading
);
export const selectorLoggedin = createSelector(
  selectUserFeature,
  (state: UserStateInterface) => state.isLoggedIn
);
export const selectorError = createSelector(
  selectUserFeature,
  (state: UserStateInterface) => state.error
);
