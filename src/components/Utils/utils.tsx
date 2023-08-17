import { InputErrorMsgProps } from '../interface/DataInterface'

export const InputErrorMsg: React.FC<InputErrorMsgProps> = ({ children }) => {
  return children ? <span className="text-rose-600">{children}</span> : null;
};
