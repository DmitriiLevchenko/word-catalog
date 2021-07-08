import { ApiError } from "../../exeptions/api-error";
import { tokenHelper } from "../../helpers/token/token.helper";

export default function(req, res, next){
  try {
    const authHeader = req.header('authorization');

    if (!authHeader) {
      return next(ApiError.UnathorizedError());
    }
    const accessToken = authHeader.split(" ")[1]; // Bearer token

    if (!accessToken) {
      return next(ApiError.UnathorizedError());
    }
    const userData = tokenHelper.validateAccessToken(accessToken);
    if (!userData) {
      return next(ApiError.UnathorizedError());
    }

    req.user = userData;
    next();
  } catch (err) {
    return next(ApiError.UnathorizedError());
  }
};
