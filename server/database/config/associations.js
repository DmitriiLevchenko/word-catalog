export function associate(models) {
  console.log(models);
  const { UserModel, TokenModel } = models;
  UserModel.hasOne(TokenModel, {
    foreignKey: {
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
      name: "user_id",
    },
  });
  TokenModel.belongsTo(UserModel, { onDelete: "CASCADE", onUpdate: "CASCADE" });
}
