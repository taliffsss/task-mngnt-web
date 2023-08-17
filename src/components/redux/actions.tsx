import authTokenDatabase from '../indexDB/authDatabase';
import {
  SetEmailAction,
  SetPasswordAction,
  SetRememberMeAction,
  SetAuthTokenAction,
  ClearAuthTokenAction,
  ShowHidePasswordAction,
  LogoutAction,
  Loader
} from '../interface/DataInterface';
// Action types enum
export enum LoginActionTypes {
  SET_EMAIL = 'SET_EMAIL',
  SET_PASSWORD = 'SET_PASSWORD',
  SET_REMEMBER_ME = 'SET_REMEMBER_ME',
  SET_AUTH_TOKEN = 'SET_AUTH_TOKEN',
  CLEAR_AUTH_TOKEN = 'CLEAR_AUTH_TOKEN',
  SHOW_HIDE_PASSWORD = 'SHOW_HIDE_PASSWORD',
  LOGOUT = 'LOGOUT',
  LOADER = 'LOADER',
}

// Define a union type for all possible actions
export type LoginAction =
  | SetEmailAction
  | SetPasswordAction
  | SetRememberMeAction
  | SetAuthTokenAction
  | ClearAuthTokenAction
  | ShowHidePasswordAction
  | LogoutAction
  | Loader;
  
// Action creators
export const setEmail = (email: string): SetEmailAction => ({
  type: LoginActionTypes.SET_EMAIL,
  payload: email,
});

export const setPassword = (password: string): SetPasswordAction => ({
  type: LoginActionTypes.SET_PASSWORD,
  payload: password,
});

export const setRememberMe = (rememberMe: boolean): SetRememberMeAction => ({
  type: LoginActionTypes.SET_REMEMBER_ME,
  payload: rememberMe,
});

export const setAuthToken = (token: string): SetAuthTokenAction => {
  // Save the token to IndexedDB using Dexie
  authTokenDatabase.authToken.put({ token });

  return {
    type: LoginActionTypes.SET_AUTH_TOKEN,
    payload: token,
  };
};

export const clearAuthToken = (): ClearAuthTokenAction => ({
  type: LoginActionTypes.CLEAR_AUTH_TOKEN,
});

export const showHidePassword = (showPassword: boolean): ShowHidePasswordAction => ({
  type: LoginActionTypes.SHOW_HIDE_PASSWORD,
  payload: showPassword,
});

// Action creator for logout
export const logout = (): LogoutAction => ({
  type: LoginActionTypes.LOGOUT,
});

export const setLoader = (show: boolean): Loader => ({
  type: LoginActionTypes.LOADER,
  payload: show,
});