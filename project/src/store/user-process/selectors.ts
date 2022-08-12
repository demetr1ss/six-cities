import { AuthorizationStatus, NameSpace } from 'const/const';
import { StateType } from 'types/state';

export const getAuthorizationStatus = (state: StateType): AuthorizationStatus =>
  state[NameSpace.User].authorizationStatus;

export const getUserEmail = (state: StateType): string | undefined =>
  state[NameSpace.User].userEmail;
