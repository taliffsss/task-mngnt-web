import { combineReducers, createStore, compose, applyMiddleware } from 'redux';
import {
  loginReducer,
  authReducer,
  passwordReducer,
  loaderReducer
} from './reducer';
import authTokenDatabase from '../indexDB/authDatabase';
import authMiddleware from '../middleware/authMiddleware';

// Combine the reducers
const rootReducer = combineReducers({
  loginPayload: loginReducer,
  auth: authReducer,
  hideShow: passwordReducer,
  loader: loaderReducer,
});

// Enable Redux DevTools extension
const composeEnhancers =
  (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

// Async initialization function for the store
const initializeStore = async () => {
  const authToken = await loadAuthToken();

  // Create the initial state using the retrieved auth token
  const initialState = {
    loginPayload: { email: '', password: '', rememberMe: false },
    auth: { authToken },
    hideShow: { showPassword: false },
  };

  // Create the store with combined reducers and apply the middleware
  const store = createStore(rootReducer, initialState, composeEnhancers(applyMiddleware(authMiddleware)));

  return store;
};

// Retrieve the auth token from IndexedDB on application load
export const loadAuthToken = async (): Promise<string> => {
  try {
    const tokenRecord = await authTokenDatabase.authToken.orderBy('id').last()
    return tokenRecord?.token || '';
  } catch (error) {
    return '';
  }
};

// Export the async initialization function to be used in the application
export default initializeStore;
