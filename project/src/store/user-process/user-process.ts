import { createSlice } from '@reduxjs/toolkit';
import { AuthorizationStatus, NameSpace } from 'const/const';
import { checkAuthAction, loginAction, logoutAction } from 'store/api-actions';

type UserProcessType = {
  authorizationStatus: AuthorizationStatus;
  userEmail: string | null;
};

const initialState: UserProcessType = {
  authorizationStatus: AuthorizationStatus.Unknown,
  userEmail: null,
};

export const userProcess = createSlice({
  name: NameSpace.User,
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(checkAuthAction.fulfilled, (state, action) => {
        state.authorizationStatus = AuthorizationStatus.Auth;
        state.userEmail = action.payload.email;
      })
      .addCase(checkAuthAction.rejected, (state) => {
        state.authorizationStatus = AuthorizationStatus.NoAuth;
      })
      .addCase(loginAction.fulfilled, (state, action) => {
        state.authorizationStatus = AuthorizationStatus.Auth;
        state.userEmail = action.payload?.email;
      })
      .addCase(loginAction.rejected, (state) => {
        state.authorizationStatus = AuthorizationStatus.NoAuth;
      })
      .addCase(logoutAction.fulfilled, (state) => {
        state.authorizationStatus = AuthorizationStatus.NoAuth;
        state.userEmail = null;
      });
  }
});
