import { UserModel, TokenModel } from "../models/index.js";
import { AuthRepository as Auth } from "./user/index.js";
import { TokenRepository as Token } from "./token/index.js";

const AuthRepository = new Auth({ UserModel,TokenModel });
const TokenRepository = new Token({ TokenModel });

export { AuthRepository, TokenRepository };
