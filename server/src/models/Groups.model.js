/**
 *      GROUP MODEL
 *
 *      This table will only have the meta data for all discussion group.
 *      The table for the messages is dynamically created and deleted when
 *      specific routes are accessed.
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
      messagetablename: { type: DataTypes.STRING, allowNull: false, unique: true },
    },
    {
      freezeTableName: true,
    },
  );

  return Groups;
};
