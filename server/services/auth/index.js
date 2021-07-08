import bcrypt, { compareSync } from "bcrypt";
import dotenv from "dotenv";
import { v4 as uuidv4 } from "uuid";
import { UserDto } from "../../helpers/dtos/user.dto.js";
import { ApiError } from "../../exeptions/api-error.js";
import { mailHelper } from "../../helpers/mail/mail.helper.js";
import { tokenHelper } from "../../helpers/token/token.helper.js";

dotenv.config();

export class AuthService {
  constructor({ AuthRepository, TokenRepository }) {
    this.AuthRepository = AuthRepository;
    this.TokenRepository = TokenRepository;
  }

  async registration(body) {
    //TODO add validation
    const { email, password } = body;
    const candidate = await this.AuthRepository.findByEmail(email);
    //check is user already exists
    if (candidate) {
      throw new Error(`user with same email ${email}  already exists`);
    }

    const hashPassword = bcrypt.hashSync(
      password,
      Number(process.env.PASS_SALT)
    );

    const activatedLink = uuidv4();
    const user = { email, password: hashPassword, activatedLink };

    const response = await this.AuthRepository.create(user);
    const userModel = response.dataValues;

    // prepare response data
    const userDto = new UserDto(userModel); //id email isActivated
    const { refreshToken, accessToken } = tokenHelper.generateTokens({
      ...userDto,
    });


    await tokenHelper.saveToken(refreshToken, userModel.id);

    await mailHelper.sendActivationMail(
      email,
      `${process.env.APP_URL}/api/auth/activate/${activatedLink}`
    );

    return { refreshToken, accessToken, user: userDto };
  }

  async logIn({ email, password }) {

    const candidate = await this.AuthRepository.findOneByParams({ email });
    if (!candidate) {
      throw ApiError.BadRequest("User with same email not found");
    }

    const isEqualPasswords = await bcrypt.compare(password, candidate.password);
    if (!isEqualPasswords) {
      throw ApiError.BadRequest("User password or email incorrect");
    }
    const userDto = new UserDto(candidate);
    const { refreshToken, accessToken } = tokenHelper.generateTokens({
      ...userDto,
    });

    await tokenHelper.saveToken(refreshToken, candidate.id);

    return { refreshToken, accessToken, user: userDto };
  }

  async logOut({ refreshToken }) {

    return tokenHelper.removeToken(refreshToken);
  }

  async activate(activationLink) {
    const candidate = await this.AuthRepository.getUserByActivationLink(
      activationLink
    );

    if (!candidate) {
      throw ApiError.BadRequest({ message: "Incorrect activation link" });
    }
    const user = { ...candidate, activated: true };

    const response = await this.AuthRepository.updateById(user.id, user);
    if (!response) {
      throw new Error("Api error");
    }
    return "Ok";
  }



  async refresh({ refreshToken }) {

    if (!refreshToken) {
      throw ApiError.UnathorizedError();
    }
    const userData = tokenHelper.validateRefreshToken(refreshToken);
    const tokenFromDb = await this.TokenRepository.findOneByParams({
      refreshToken,
    });

    if (!userData || !tokenFromDb) {
      throw new ApiError.UnathorizedError();
    }

    const userModel = await this.AuthRepository.getById(userData.id);

    const userDto = new UserDto(userModel); //id email isActivated
    const tokens = tokenHelper.generateTokens({
      ...userDto,
    });

    await tokenHelper.saveToken(refreshToken, userModel.id);

    return { ...tokens, user: userDto };
  }
}
