import { Middleware } from 'redux';
import { LoginActionTypes } from '../redux/actions';
import authTokenDatabase from '../indexDB/authDatabase';

const authMiddleware: Middleware = (store) => (next) => (action) => {
  if (action.type === LoginActionTypes.SET_AUTH_TOKEN) {
    const { authToken } = store.getState().auth;
    if (authToken) {
      authTokenDatabase.authToken.put({ token: authToken });
    }
  }
  
  return next(action);
};

export default authMiddleware;
