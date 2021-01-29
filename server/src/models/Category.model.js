/**
 *  Model for adding storing various categories of resource
 */
export default (sequelize, Sequelize) => {
  const DataTypes = Sequelize.DataTypes;
  const Category = sequelize.define('category', {
    name: { type: DataTypes.TEXT, allowNull: false, unique: true },
    description: { type: DataTypes.TEXT, allowNull: false, unique: true },
  });
  return Category;
};
