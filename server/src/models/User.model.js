
export default (sequelize, Sequelize) => {
  const DataTypes = Sequelize.DataTypes;
  const User = sequelize.define('user', {
    firstname: { type: DataTypes.STRING(20), allowNull: false },
    lastname: { type: DataTypes.STRING(20), allowNull: false },
    email: { type: DataTypes.STRING(40), allowNull: false, unique: true },
    username: { type: DataTypes.STRING(15), allowNull: false, unique: true },
    password: { type: DataTypes.TEXT, allowNull: false, default: '' },
  });

  return User;
};
