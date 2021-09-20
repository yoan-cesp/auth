import {
  LOGIN_CODE_PROCESING,
  LOGIN_CODE_REQUEST_FAILURE,
  LOGIN_CODE_REQUEST_SUCCESS,
  LOGIN_CODE_REQUESTING,
  LOGOUT,
  OAUTH_LOGIN_TOKEN_REQUEST,
  OAUTH_LOGIN_TOKEN_REQUEST_FAILURE,
  OAUTH_LOGIN_TOKEN_REQUEST_SUCCESS,
} from "../../../constans/actionTypes";
import { STATUS } from "../../../constans/common";

const authState = (state = {}, action: any) => {
  switch (action.type) {
    case LOGIN_CODE_PROCESING:
      return {
        ...state,
        status: STATUS.Procesing,
        codeVerifier: action.payload.codeVerifier,
        codeChallenge: action.payload.codeChallenge,
        // oauthLoginUrl: action.payload.oauthLoginUrl,
      };
    case LOGIN_CODE_REQUESTING:
      return {
        ...state,
        status: STATUS.Loading,
      };
    case LOGIN_CODE_REQUEST_SUCCESS:
      return {
        ...state,
        code: action.payload.code,
      };
    case LOGIN_CODE_REQUEST_FAILURE:
      return {
        ...state,
        errorCode: action.payload.errorCode,
        customErrorMessage: action.payload.customErrorMessage,
        status: STATUS.Error,
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
