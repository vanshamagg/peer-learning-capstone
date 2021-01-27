/**
 * This model is for storing the messages of all thr groups
 */

export default (sequelize, Sequelize) => {
  const DataTypes = Sequelize.DataTypes;
  const Post = sequelize.define('message', {
    text: { type: DataTypes.TEXT, allowNull: false },
  });

  return Post;
};
