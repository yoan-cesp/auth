import {
  LOGIN_CODE_PROCESING,
  LOGIN_CODE_REQUESTING,
  LOGIN_CODE_REQUEST_FAILURE,
  LOGIN_CODE_REQUEST_SUCCESS,
  OAUTH_LOGIN_TOKEN_REQUEST_SUCCESS,
  LOGOUT,
} from "../../constans/actionTypes";
import { generateCodesPKCE } from "../../helpers/loginHelper";
import authService from "../../services/authService/AuthServices";
import userService from "../../services/userService/UserService";

const processLoginAction = (payload: any) => {
  return {
    type: LOGIN_CODE_PROCESING,
    payload,
  };
};

const processLoginFailure = (payload: any) => {
  return {
    type: LOGIN_CODE_REQUEST_FAILURE,
    payload,
  };
};

const processCodeRequest = () => {
  return {
    type: LOGIN_CODE_REQUESTING,
  };
};

const getCodeAction = (payload: any) => {
  return {
    type: LOGIN_CODE_REQUEST_SUCCESS,
    payload,
  };
};

const getAccessTokenAction = (payload: any) => {
  return {
    type: OAUTH_LOGIN_TOKEN_REQUEST_SUCCESS,
    payload,
  };
};

const logout = () => {
  return {
    type: LOGOUT,
    payload: {},
  };
};

export const processLogin = async (dispatch: any) => {
  try {
    const { codeVerifier, codeChallenge } = await generateCodesPKCE();
    dispatch(processLoginAction({ codeVerifier, codeChallenge }));
  } catch (error) {
    console.error(error);
    dispatch(
      processLoginFailure({ errorCode: "User", customErrorMessage: "Error" })
    );
  }
};

export const processLogout = async (dispatch: any) => {
  try {
    dispatch(logout());
    await userService.closeSession();
    authService.clearSecurityData();
  } catch (error) {
    console.error(error);
  }
};

export const getCode = async (dispatch: any, userData: object) => {
  try {
    const dataU: any = userData;
    const clientId: string = process.env.REACT_APP_OAUTH_SERVER_CLIENT_ID || "";
    dataU["client_id"] = clientId;
    dataU["response_type"] = "code";
    dataU["scopes"] = "openid";
    dataU["code_challenge_method"] = "5256";
    dataU["noredirect"] = true;
    dispatch(processCodeRequest());
    const res: any = await authService.getCode(dataU);
    dispatch(getCodeAction({ code: res.data.code }));
  } catch (error) {}
};

export const getToken = async (
  dispatch: any,
  codeVerifier: string,
  code: string
) => {
  const clientId: string = process.env.REACT_APP_OAUTH_SERVER_CLIENT_ID || "";
  const data: any = {
    grant_type: "authorization_code",
    code_verifier: codeVerifier,
    code,
    client_id: clientId,
    redirect: false,
  };

  const res: any = await authService.login(data);
  dispatch(
    getAccessTokenAction({
      jwtToken: res.data.access_token,
      userData: res.data.user,
    })
  );
};
