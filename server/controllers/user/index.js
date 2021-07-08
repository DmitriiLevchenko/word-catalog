export class UserController {
  constructor({ UserService }) {
    this.UserService = UserService;
  }

  async getAllUsers(req, res, next) {
    try {
      const users = await this.UserService.getAllUsers();
      res.data = users;
      return next();
    } catch (err) {
      return next(err);
    }
  }
}
