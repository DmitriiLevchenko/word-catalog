import {
  AuthRepository,
  TokenRepository,
} from "../database/repository/index.js";
import { AuthService as Auth } from "./auth/index.js";
import { UserService as User } from "./user/index.js";

const UserService = new User({ AuthRepository });
const AuthService = new Auth({ AuthRepository, TokenRepository });

export { AuthService, UserService };
