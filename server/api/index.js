import { init as InitAuthRout } from "./auth/index.js";
import { init as InitUserRoute } from "./user/index.js";
import {
  responseMiddleware,
  validationCheckerMiddleware,
  authMiddleware,
} from "../middlewares/index.js";
import { AuthController, UserController } from "../controllers/index.js";

export const init = (Router) => {
  const router = new Router();

  router.use(
    "/auth",
    InitAuthRout(
      Router,
      { AuthController },
      {
        responseMiddleware,
        validationCheckerMiddleware,
      }
    )
  );

  router.use(
    "/users",
    InitUserRoute(
      Router,
      { UserController },
      {
        responseMiddleware,
        authMiddleware,
      }
    )
  );

  return router;
};
