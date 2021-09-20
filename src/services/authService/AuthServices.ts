import { AxiosInstance, AxiosPromise } from "axios";
import qs from "qs";
import cookies from "../../helpers/cookiesHelper";
import { createHttpAxios } from "../httpService/http";

class AuthServiceAPI {
  public httpAxios: AxiosInstance;

  constructor() {
    this.httpAxios = createHttpAxios("", {
      baseURL: process.env.REACT_APP_OAUTH_SERVER_URL,
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        "Access-Control-Allow-Origin": "*",
        "response-Type": "json",
      },
    });
  }

  public getCode(data: object): AxiosPromise<any> {
    return this.httpAxios
      .post("", qs.stringify(data))
      .then((res) => {
        return res;
      })
      .catch((err) => {
        throw err;
      });
  }

  public login(data: object): AxiosPromise<any> {
    return this.httpAxios
      .post("/token", qs.stringify(data))
      .then((res) => {
        this.storeToken(res.data.access_token);
        this.storeUserCredentials(res.data.user);
        return res;
      })
      .catch((err) => {
        throw err;
      });
  }

  public getToken() {
    return cookies.get("jwtToken") || null;
  }

  public storeToken(token: string) {
    cookies.set("jwtToken", token);
  }

  public storeUserCredentials(userdata: any) {
    localStorage.setItem("userdata", JSON.stringify(userdata));
  }

  public isLoggedIn() {
    return !!localStorage.getItem("userdata");
  }

  public clearToken(): void {
    cookies.remove("jwtToken");
  }

  public clearUser(): void {
    localStorage.removeItem("userdata");
  }

  public clearSecurityData(): void {
    this.clearToken();
    this.clearUser();
  }

  public getUserName() {
    const userdata = localStorage.getItem("userdata");
    if (userdata) {
      return JSON.parse(userdata).userMap.user_name;
    }
    return "";
  }

  public getUser() {
    const userData = localStorage.getItem("userdata");
    return userData ? JSON.parse(userData) : null;
  }
}
const authService = new AuthServiceAPI();

export default authService;
