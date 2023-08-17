import { LoginActionTypes } from '../redux/actions';

export interface SetEmailAction {
  type: LoginActionTypes.SET_EMAIL;
  payload: string;
}

export interface SetPasswordAction {
  type: LoginActionTypes.SET_PASSWORD;
  payload: string;
}

export interface SetRememberMeAction {
  type: LoginActionTypes.SET_REMEMBER_ME;
  payload: boolean;
}

export interface SetAuthTokenAction {
  type: LoginActionTypes.SET_AUTH_TOKEN;
  payload: string;
}

export interface ClearAuthTokenAction {
  type: LoginActionTypes.CLEAR_AUTH_TOKEN;
}

export interface ShowHidePasswordAction {
  type: LoginActionTypes.SHOW_HIDE_PASSWORD; // Action type
  payload: boolean; // A boolean flag to indicate whether to show or hide the password
}

// Action interface for logout action
export interface LogoutAction {
  type: LoginActionTypes.LOGOUT;
}

export interface Loader {
  type: LoginActionTypes.LOADER; // Action type
  payload: boolean; // A boolean flag to indicate whether to show or hide the password
}

export interface CloseProps {
  close: () => void;
}

export interface FormData {
  email: string;
  password: string;
  cpassword?: string;
  rememberMe?: boolean;
}

export interface hideShowData {
  showPassword: boolean;
}

export interface isLoading {
  show: boolean;
}

export interface authData {
  authToken: string;
}

export interface airlines {
  id: number;
  name: string;
  logo: string;
  iata_code: string;
  icao_code: string;
}

export interface departTime {
  id: number;
  name: string;
  duration: string;
}

export interface InputErrorMsgProps {
  children?: string;
}

export interface TasksFormData {
  id: number;
  title: string;
  description: string;
  task_status_id?: number;
  ordering?: number;
  image?: File | null | string;
}

export interface FilteringTask {
  search?: string;
  sort?: string;
}

export interface ResponseType {
  result: {
    data: any;
  };
}

export interface TaskEditModalProps {
    task: TasksFormData | null;
    onClose: () => void;
    onSave: (updatedTask: TasksFormData) => void;
}