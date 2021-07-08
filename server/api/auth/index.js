import { body } from "express-validator";

export const init = (Router, controllers, middlewares) => {
  const router = new Router();
  const { AuthController } = controllers;

  const { responseMiddleware, validationCheckerMiddleware, authMiddleware } =
    middlewares;


  router.post(
    "/registration",
    body("email").isEmail(),
    body("password").isLength({ min: 5 }),
    validationCheckerMiddleware,
    (req, res, next) => AuthController.registration(req, res, next),
    responseMiddleware
  );
  router.post(
    "/login",
    body("email").isEmail(),
    body("password").isLength({ min: 5 }),
    validationCheckerMiddleware,
    (req, res, next) => AuthController.login(req, res, next),
    responseMiddleware
  );
  router.get("/activate/:link", (req, res, next) =>
    AuthController.activate(req, res, next)
  );
  router.get(
    "/refresh",
    (req, res, next) => AuthController.refresh(req, res, next),
    responseMiddleware
  );

  router.post(
    "/logout",
    (req, res, next) => AuthController.logout(req, res, next),
    responseMiddleware
  );
  return router;
};
