import axios from "axios";
import { httpConstants } from "../../common/constants/htttp.constants";
import { actionTypes } from "../../common/enum/action-types.enum";
import { endpointEnum } from "../../common/enum/endpoints.enum";

import { TokenHelper } from "../../helpers";
import { dispatch } from "../../store/store";

const $api = axios.create({
  withCredentials: true,
  baseURL: httpConstants.API_URL,
});

$api.interceptors.request.use((config) => {
  config.headers.Authorization = `Bearer ${localStorage.getItem("token")}`;
  return config;
});

$api.interceptors.response.use(
  (config) => {
    return config;
  },
  async (error) => {
    const originRequest = error.config;
    if (error.response.status === 401) {
      if (error.config && !error.config._isRetry) {
        originRequest._isRetry = true;
        try {
          const response = await axios.get(
            `${httpConstants.API_URL}${endpointEnum.REFRESH_TOKEN}`,
            {
              withCredentials: true,
            }
          );
          TokenHelper.saveToken(response.data.accessToken);
          return $api.request(originRequest);
        } catch (e) {
          //if token expired logout
          dispatch({ type: actionTypes.LOGOUT });
        }
      } else {
        //to prevent an endless cycle of token update requests
        dispatch({ type: actionTypes.LOGOUT });
      }
    }
    throw error;
  }
);

export default $api;
