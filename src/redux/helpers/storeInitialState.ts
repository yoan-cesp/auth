import { STATUS } from "../../constans/common";
import authService from "../../services/authService/AuthServices";
import AuthInfo from "../reducers/auth/Auth.interface";
import SystemInfo from "../reducers/global/Global.interface";

const Auth: AuthInfo = {
  jwtToken: authService.getToken(),
  errorCode: null,
  codeVerifier: null,
  oauthLoginUrl: null,
  codeChanllenge: null,
  code: null,
  status: STATUS.Initial,
  userData: authService.getUser(),
  customErrorMessage: null,
};

const Global: SystemInfo = {
  loading: false,
  activeCd: "",
  error: "",
  data: {},
};

const initialState: any = {
  Auth,
  Global,
};

export default initialState;
