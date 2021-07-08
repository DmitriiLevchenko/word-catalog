import {Sequelize} from "sequelize";
import {config} from "./config.js";
console.log(config)
export const client = new Sequelize({
  ...config,
});
