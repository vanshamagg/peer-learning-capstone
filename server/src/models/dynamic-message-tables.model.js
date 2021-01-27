/**
 *      For every group, we need a table
 *      dynamically created where we can store the messages.
 *      Here we accomplish this.
 *
 *      This is just to manipulat the models which will hold the
 *      group specific messages
 */

import { sequelize, Sequelize, User } from './index';

/**
 * create a model dynamically or
 * get the exisiting one
 *
 * @param {String} modelName
 */
export const createOrGetModel = async (modelName) => {
  try {
    const DataTypes = Sequelize.DataTypes;
    const messageModel = sequelize.define(
      modelName,
      {
        text: { type: DataTypes.TEXT, allowNull: false },
      },
      {
        freezeTableName: true,
      },
    );

    // ASSOCIATIONS
    User.hasMany(messageModel);
    messageModel.belongsTo(User);

    // VERY IMPORTANT, if not used, it will not persist to database
    sequelize.sync();

    return Promise.resolve(messageModel);
  } catch (error) {
    return Promise.reject(error.message);
  }
};

/**
 * Delete a pre-exisiting model
 * @param {String} modelName name of the model
 */
export const deleteModel = async (modelName) => {
  try {
    // const isModelDefined = sequelize.isDefined(modelName);
    // console.log(isModelDefined);

    // const model = await createOrGetModel(modelName);
    // console.dir(model);
    // console.log("BEFORE DROPPING", sequelize.models)
    // await model.drop({ logging: (msg) => console.log(msg), cascade: true });
    const [results, metadata] = await sequelize.query(`DROP TABLE IF EXISTS ${modelName}`);
    // console.log(sequelize.models)
    return Promise.resolve(true);
    // return Promise.resolve({ results, metadata });
  } catch (error) {
    return Promise.reject(error.message);
  }
};
