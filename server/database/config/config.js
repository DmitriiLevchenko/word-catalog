import dotenv from 'dotenv'
dotenv.config()


const logging = false // log sequalize 
const {
  DB_NAME: database,
  DB_USERNAME: username,
  DB_PASSWORD: password,
  DB_HOST: host,
  DB_PORT: port,
  DB_DIALECT: dialect,

} = process.env;

export const config = { database, username, password, host, port, dialect,logging };