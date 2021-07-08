import { Abstract } from "../abstract";

export class AuthRepository extends Abstract {
  constructor({ UserModel, TokenModel }) {
    super(UserModel);
    this.UserModel = UserModel;
    this.TokenModel = TokenModel;
  }

  findByEmail(email) {
    return this.UserModel.findOne({
      raw: true,
      where: {
        email,
      },
    });
  }

  getUserByActivationLink(activatedLink) {
    return this.UserModel.findOne({
      raw: true,
      where: {
        activatedLink,
      },
    });
  }
}
