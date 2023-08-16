import { User } from '../models/user';
import { EntityState } from '@ngrx/entity';

export interface UserStateInterface extends EntityState<User> {
  isLoading: boolean;
  error: string | null;
  isLoggedIn:boolean;
}
