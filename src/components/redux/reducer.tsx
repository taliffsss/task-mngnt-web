import { LoginActionTypes, LoginAction } from './actions';
import authTokenDatabase from '../indexDB/authDatabase';
import {
  FormData,
  hideShowData,
  authData,
  isLoading
} from '../interface/DataInterface';

const initialState: FormData = {
  email: '',
  password: '',
  rememberMe: false,
};

const hideShowState: hideShowData = {
  showPassword: false,
};

const loader: isLoading = {
  show: false,
};

const authInitialState: authData = {
  authToken: '',
};

export const authReducer = (state = authInitialState, action: LoginAction) => {
  switch (action.type) {
    case LoginActionTypes.SET_AUTH_TOKEN:
      return { ...state, authToken: action.payload };
    case LoginActionTypes.CLEAR_AUTH_TOKEN:
      return { ...state, authToken: '' };
    case LoginActionTypes.LOGOUT:
      // Clear the auth token from IndexedDB
      authTokenDatabase.clearAuthToken();
      return authInitialState;
    default:
      return state;
  }
};

export const loginReducer = (state = initialState, action: LoginAction) => {
  switch (action.type) {
    case LoginActionTypes.SET_EMAIL:
      return { ...state, email: action.payload };
    case LoginActionTypes.SET_PASSWORD:
      return { ...state, password: action.payload };
    case LoginActionTypes.SET_REMEMBER_ME:
      return { ...state, rememberMe: action.payload };
    default:
      return state;
  }
};

export const passwordReducer = (state = hideShowState, action: LoginAction) => {
  switch (action.type) {
    case LoginActionTypes.SHOW_HIDE_PASSWORD:
      return {
        ...state,
        showPassword: action.payload,
      };
    default:
      return state;
  }
};

export const loaderReducer = (state = loader, action: LoginAction) => {
  switch (action.type) {
    case LoginActionTypes.LOADER:
      return {
        ...state,
        show: action.payload,
      };
    default:
      return state;
  }
};
