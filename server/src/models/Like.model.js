/**
 *      A separate model for keeping the track of like
 */

export default (sequelize, Sequelize) => {
  const DataTypes = Sequelize.DataTypes;
  const Like = sequelize.define('like', {
  });
  return Like;
};
