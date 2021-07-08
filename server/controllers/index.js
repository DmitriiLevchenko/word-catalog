import { AuthService, UserService } from "../services";
import { AuthController as Auth } from "./auth";
import { UserController as User } from "./user";

const AuthController = new Auth({ AuthService });
const UserController = new User({ UserService });

export { AuthController, UserController };
