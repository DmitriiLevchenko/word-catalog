import { DataTypes } from "sequelize";


const init = (orm) => {
  const User = orm.define(
    "User",
    {
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      activated: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      activatedLink: {
        type: DataTypes.STRING,
      },
    },
    { freezeTableName: true }
  );

  return User;
};

export default init
