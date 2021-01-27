/**
 *      GROUP MODEL
 *
 *      This table will only have the meta data for all discussion group.
 *      
 *      
 */

export default (sequelize, Sequelize) => {
  const DataTypes = Sequelize.DataTypes;
  const Groups = sequelize.define(
    'groups',
    {
      name: { type: DataTypes.STRING, allowNull: false },
      description: { type: DataTypes.TEXT, allowNull: false },
      totalmessages: { type: DataTypes.INTEGER, defaultValue: 0 },
      totalmembers: { type: DataTypes.INTEGER, defaultValue: 0 },
    },
    {
      freezeTableName: true,
    },
  );

  return Groups;
};
