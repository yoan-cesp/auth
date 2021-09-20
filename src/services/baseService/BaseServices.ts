import { AxiosInstance, AxiosPromise } from "axios";
import { createHttpAxios } from "../httpService/http";

const baseURL: string = process.env.REACT_APP_BASE_URL || "";

export class BaseService {
  public httpAxios: AxiosInstance;

  constructor(url: string) {
    this.httpAxios = createHttpAxios(url, {
      baseURL: baseURL,
    });
  }

  public create(url: string, item: any): AxiosPromise<any> {
    return this.httpAxios
      .post(url, item)
      .then((response) => response)
      .catch((err) => {
        throw err;
      });
  }

  public update(url: string, item: any): AxiosPromise<any> {
    const itemId = item.id || item.get("id");
    return this.httpAxios
      .put(`${url}/${itemId}/`, item)
      .then((response) => response)
      .catch((err) => {
        throw err;
      });
  }

  public delete(url: string, itemId: string | number): AxiosPromise<void> {
    return this.httpAxios
      .delete(`${url}/${itemId}/`)
      .then((response) => response)
      .catch((err) => {
        throw err;
      });
  }

  public getAll(url: string, params: any): AxiosPromise<any[]> {
    return this.httpAxios
      .get(url, { params })
      .then((response) => response)
      .catch((err) => {
        throw err;
      });
  }

  public getById(url: string, itemId: string | number): AxiosPromise<any> {
    return this.httpAxios
      .get(`${url}/${itemId}/`)
      .then((response) => response)
      .catch((err) => {
        throw err;
      });
  }
}
