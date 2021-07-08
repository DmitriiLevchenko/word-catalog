import { DataTypes, Deferrable } from "sequelize";


const init = (orm) => {
  const Token = orm.define(
    "Token",
    {
      refreshToken: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      user_id: {
        type: DataTypes.INTEGER,
      },
    },
    { freezeTableName: true }
  );
   
  return Token;
};

export default init
