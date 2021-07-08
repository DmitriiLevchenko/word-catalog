import { ApiError } from "../../exeptions/api-error";
import { tokenHelper } from "../../helpers/token/token.helper";

export default function(req, res, next){
  try {
    const authHeader = req.header('authorization');
    console.log("authHeader", authHeader);
    if (!authHeader) {
      return next(ApiError.UnathorizedError());
    }
    const accessToken = authHeader.split(" ")[1]; // Bearer token
    console.log("accessToken", accessToken);
    if (!accessToken) {
      return next(ApiError.UnathorizedError());
    }
    const userData = tokenHelper.validateAccessToken(accessToken);
    if (!userData) {
      return next(ApiError.UnathorizedError());
    }
    console.log("userData", accessToken);
    req.user = userData;
    next();
  } catch (err) {
    return next(ApiError.UnathorizedError());
  }
};
