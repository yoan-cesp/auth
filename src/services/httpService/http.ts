import axios, { AxiosInstance, AxiosRequestConfig } from "axios";
import authService from "../authService/AuthServices";

const config: AxiosRequestConfig = {
  baseURL: "",
  headers: {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
  },
  maxContentLength: 2000,
  maxRedirects: 5,
  responseType: "json",
  timeout: 100000,
  validateStatus: (status: number) => status >= 200 && status < 300,
};

export function createHttpAxios(
  url: string,
  cnf?: AxiosRequestConfig
): AxiosInstance {
  const resultConfig = { ...config, ...cnf };
  resultConfig.baseURL += url;
  const axiosInstance = axios.create(resultConfig);
  axiosInstance.interceptors.request.use((conf: any) => {
    if (!conf.headers.Authorization) {
      conf.headers.Authorization = `Bearer ${authService.getToken()}`;
    }
    return conf;
  });
  axiosInstance.interceptors.response.use(
    (response: any) => {
      return response;
    },
    (error: any) => {
      let err = "";
      if (error.response && error.response.status) {
        const status = error.response.status!;
        if (401 === status || 403 === status) {
          if (window.location.pathname !== "/login") {
            console.error(error.response);
            return status;
          }
        } else {
          err =
            error.response.data && error.response.data.message
              ? error.response.data.message
              : "An error occurred on the server";
          console.error(err);
        }
      } else {
        err = "Network Error";
        console.error(err);
      }
      return Promise.reject(err);
    }
  );

  return axiosInstance;
}
