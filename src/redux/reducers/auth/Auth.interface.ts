export default interface AuthInfo {
  status: String;
  jwtToken: String | null;
  oauthLoginUrl: String | null;
  codeVerifier: String | null;
  code: String | null;
  errorCode: String | null;
  customErrorMessage: String | null;
  userData: Object;
}
