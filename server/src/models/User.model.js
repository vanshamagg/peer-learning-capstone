export default (sequelize, Sequelize) => {
  const DataTypes = Sequelize.DataTypes;
  const User = sequelize.define('user', {
    firstname: { type: DataTypes.STRING(50), allowNull: false },
    lastname: { type: DataTypes.STRING(50), allowNull: false },
    email: { type: DataTypes.STRING(40), allowNull: false, unique: true },
    username: { type: DataTypes.STRING(15), allowNull: false, unique: true },
    password: { type: DataTypes.TEXT, allowNull: false, defaultValue: '' },
    role: { type: DataTypes.STRING(10), defaultValue: 'student' },
    insti_name: { type: DataTypes.STRING(70), allowNull: true },
    insti_type: { type: DataTypes.STRING(10), allowNull: true },
    gender: { type: DataTypes.STRING(7), allowNull: false },
    mobile: { type: DataTypes.STRING, allowNull: true },
    city: { type: DataTypes.STRING, allowNull: false },
    state: { type: DataTypes.STRING, allowNull: false },
    country: { type: DataTypes.STRING, allowNull: false },
    dob: { type: DataTypes.DATE, allowNull: false },
  });

  return User;
};
