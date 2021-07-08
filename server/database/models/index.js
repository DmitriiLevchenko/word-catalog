import { client } from "../config/connection.js";
import UserModelBuilder from "./user/index.js";
import TokenModelBuilder from "./token/index.js";
import { associate } from "../config/associations.js";

const UserModel = UserModelBuilder(client);
const TokenModel = TokenModelBuilder(client);

associate({ UserModel, TokenModel });
//TODO refactor replace sync on migrations
async function sync() {
  try {
    console.log("db sync start...");
    await client.sync({ alter: true });
    console.log("db sync successful");
  } catch (e) {
    console.log(e);
  } finally {
    console.log("db sync finish");
  }
}
sync();
export { UserModel, TokenModel };

