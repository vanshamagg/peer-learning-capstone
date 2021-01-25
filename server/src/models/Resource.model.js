/**
 *  model for uploading any notes, pdf files, etc.
 */

export default (sequelize, Sequelize) => {
  const DataTypes = Sequelize.DataTypes;
  const Resource = sequelize.define('resource', {
    title: { type: DataTypes.STRING(100), allowNull: false },
    type: { type: DataTypes.STRING(10), default: 'Image', allowNull: 'false', default: '' },
    publicid: { type: DataTypes.STRING(50), allowNull: true },
    views: { type: DataTypes.INTEGER, default: 0 },
  });
  return Resource;
};
