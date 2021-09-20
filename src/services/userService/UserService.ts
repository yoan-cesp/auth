import { BaseService } from "../baseService/BaseServices";
import { AxiosPromise } from "axios";

class UserService extends BaseService {
  constructor(url: string) {
    super(url);
  }

  openSession(userData: Object): AxiosPromise<any> {
    return this.httpAxios
      .post("", userData)
      .then((response) => response)
      .catch((err) => {
        throw err;
      });
  }

  // TODO when the endpoint gets ready change this to the comments and catch the error, replase url for the real endpoint
  closeSession(): Promise<any> {
    // try {
    // return this.httpAxios.patch(`/close_session`, {});
    // } catch {
    return new Promise((resolve, reject) => {
      resolve("");
    });
    // }
  }
}

export default new UserService("");
