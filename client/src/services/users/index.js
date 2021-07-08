import { endpointEnum } from "../../common/enum/endpoints.enum";
import { $api } from "../../helpers";


export default class UsersService{
    static getAllUsers(){
      return $api.get(endpointEnum.GET_ALL_USERS)
    }
}