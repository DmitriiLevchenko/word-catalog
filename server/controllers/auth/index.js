import dotenv from "dotenv";
import {
  cookieNamesConstants,
  lifetimesConstants,
} from "../../common/constants";

dotenv.config();

export class AuthController {
  constructor({ AuthService }) {
    this.AuthService = AuthService;
  }

  async registration(req, res, next) {
    try {
      const data = await this.AuthService.registration(req.body);

      res.cookie(cookieNamesConstants.REFRESH_TOKEN, data.refreshToken, {
        maxAge: lifetimesConstants.COOKIE_LIFE_TIME,
        httpOnly: true,
      });

      res.data = data;
      return next();
    } catch (err) {
      return next(err);
    }
  }

  async login(req, res, next) {
    try {
      const { password, email } = req.body;
      const data = await this.AuthService.logIn({ password, email });

      res.cookie(cookieNamesConstants.REFRESH_TOKEN, data.refreshToken, {
        maxAge: lifetimesConstants.COOKIE_LIFE_TIME,
        httpOnly: true,
      });

      res.data = data;
      return next();
    } catch (err) {
      return next(err);
    }
  }

  async logout(req, res, next) {
    try {
      const { refreshToken } = req.cookies;

      res.clearCookie(cookieNamesConstants.REFRESH_TOKEN);

      const data = await this.AuthService.logOut({ refreshToken });
      res.data = data;
      return next();
    } catch (err) {
      return next(err);
    }
  }

  async activate(req, res, next) {
    try {
      await this.AuthService.activate(req.params.link);
      return res.redirect(process.env.CLIENT_URL);
    } catch (err) {
      return next(err);
    }
  }

  async getAllUsers() {}

  async refresh(req, res, next) {
    const { refreshToken } = req.cookies;
    try {
      const data = await this.AuthService.refresh({ refreshToken });
      res.data = data;
      return next();
    } catch (err) {
      return next(err);
    }
  }
}
