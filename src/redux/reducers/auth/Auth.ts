import {
  LOGIN_PROCESING,
  LOGIN_REQUEST_SUCCESS,
  LOGOUT,
  OAUTH_LOGIN_TOKEN_REQUEST,
  OAUTH_LOGIN_TOKEN_REQUEST_FAILURE,
  OAUTH_LOGIN_TOKEN_REQUEST_SUCCESS,
} from "../../../constans/actionTypes";
import { STATUS } from "../../../constans/common";
import AuthInfo from "./Auth.interface";

const initialState = (): AuthInfo => {
  return {
    jwtToken: null,
    errorCode: null,
    codeVerifier: null,
    oauthLoginUrl: null,
    code: null,
    status: STATUS.Initial,
    userData: {},
    customErrorMessage: null,
  };
};

const authState = (state = initialState, action: any) => {
  switch (action.type) {
    case LOGIN_PROCESING:
      return {
        ...state,
        status: STATUS.Procesing,
      };
    case LOGIN_REQUEST_SUCCESS:
      return {
        ...state,
        codeVerifier: action.payload.codeVerifier,
        oauthLoginUrl: action.payload.oauthLoginUrl,
        code: action.payload.codeChallenge,
        status: STATUS.Success,
      };
    case LOGOUT:
      return {
        ...state,
        jwtToken: "",
        codeVerifier: null,
        code: null,
        errorCode: "User",
        status: STATUS.Initial,
        userData: null,
        customErrorMessage: action.payload.message || null,
      };
    case OAUTH_LOGIN_TOKEN_REQUEST:
      return {
        ...state,
        status: STATUS.Loading,
      };
    case OAUTH_LOGIN_TOKEN_REQUEST_SUCCESS:
      return {
        ...state,
        jwtToken: action.payload.jwtToken,
        status: STATUS.Success,
        userData: action.payload.userData,
      };
    case OAUTH_LOGIN_TOKEN_REQUEST_FAILURE:
      return {
        ...state,
        status: STATUS.Error,
        errorCode: "User",
        customErrorMessage: action.payload.message || null,
      };
    default:
      return state;
  }
};

export default authState;
