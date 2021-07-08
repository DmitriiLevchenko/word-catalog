import { endpointEnum } from "../../common/enum/endpoints.enum";
import { $api } from "../../helpers";
import axios from "axios";
import { httpConstants } from "../../common/constants/htttp.constants";

export default class AuthService {
  static async login({ email, password }) {
    return $api.post(endpointEnum.LOGIN, { email, password });
  }

  static async registration({ email, password }) {
    return $api.post(endpointEnum.REGISTRATION, { email, password });
  }

  static async logout() {
    return $api.post(endpointEnum.LOGOUT);
  }
  static checkAuth() {
    //to avoid duplication of logic, use pure intance axios
    return axios.get(`${httpConstants.API_URL}${endpointEnum.REFRESH_TOKEN}`, {
      withCredentials: true,
    });
  }
}
