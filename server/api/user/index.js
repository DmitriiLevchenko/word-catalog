import { body } from "express-validator";

export const init = (Router, controllers, middlewares) => {
  const router = new Router();
  const { UserController } = controllers;

  const { responseMiddleware, authMiddleware } = middlewares;

  router.get(
    "/all",
    authMiddleware,
    (req, res, next) => UserController.getAllUsers(req, res, next),
    responseMiddleware
  );

  return router;
};
