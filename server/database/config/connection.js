import {Sequelize} from "sequelize";
import {config} from "./config.js";

export const client = new Sequelize({
  ...config,
});
