import { userProcess, UserProcessType } from './user-process';
import { AuthorizationStatus } from 'const/const';
import { checkAuthAction, loginAction, logoutAction } from 'store/api-actions';
import { createRandomUser } from 'utils/mocks';

const mockUser = createRandomUser();

describe('Reducer: user', () => {
  let state: UserProcessType;

  beforeEach(() => {
    state = {
      authorizationStatus: AuthorizationStatus.Unknown,
      userEmail: null
    };
  });

  it('without additional parameters should return initial state', () => {
    expect(userProcess.reducer(undefined, {type: 'UNKNOWN_ACTION'}))
      .toEqual({
        authorizationStatus: AuthorizationStatus.Unknown,
        userEmail: null
      });
  });

  describe('checkAuthAction test', () => {
    it('should update authorizationStatus to "AUTH" and set userEmail if checkAuthAction fulfilled', () => {
      expect(userProcess.reducer(state, {type: checkAuthAction.fulfilled.type, payload: mockUser}))
        .toEqual({
          authorizationStatus: AuthorizationStatus.Auth,
          userEmail: mockUser.email
        });
    });
    it('should update authorizationStatus to "NO_AUTH" if checkAuthAction rejected', () => {
      expect(userProcess.reducer(state, { type: checkAuthAction.rejected.type }))
        .toEqual({
          authorizationStatus: AuthorizationStatus.NoAuth,
          userEmail: null
        });
    });
  });

  describe('loginAction test', () => {
    it('should update authorizationStatus to "AUTH" and set userEmail if loginAction fulfilled', () => {
      expect(userProcess.reducer(state, { type: loginAction.fulfilled.type, payload: mockUser }))
        .toEqual({
          authorizationStatus: AuthorizationStatus.Auth,
          userEmail: mockUser.email
        });
    });
    it('should update authorizationStatus to "NO_AUTH" if loginAction rejected', () => {
      expect(userProcess.reducer(state, { type: loginAction.rejected.type }))
        .toEqual({
          authorizationStatus: AuthorizationStatus.NoAuth,
          userEmail: null
        });
    });
  });

  describe('logoutAction test', () => {
    it('should update authorizationStatus to "NO_AUTH" if logoutAction fulfilled', () => {
      expect(userProcess.reducer(state, { type: logoutAction.fulfilled.type }))
        .toEqual({
          authorizationStatus: AuthorizationStatus.NoAuth,
          userEmail: null
        });
    });
  });
});
