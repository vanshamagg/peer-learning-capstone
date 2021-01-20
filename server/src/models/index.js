import 'dotenv/config';
import { Sequelize } from 'sequelize';
import 'colors';
import UserModel from './User.model';
import ResourceModel from './Resource.model';
import LikeModel from './Like.model'

// const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
//   dialect: process.env.DB_DIALECT,
//   host: process.env.DB_HOST,
//   logging: false,
// });

const sequelize = new Sequelize(process.env.HEROKU_DB_URI, {
  logging: false,
  dialectOptions: {
    ssl: {
      ssl: true,
      rejectUnauthorized: false,
    },
  },
});
// some preflight
(async () => {
  try {
    await sequelize.authenticate();
    console.log('Connection to the Db Established'.bold.white);

  await sequelize.sync({  /*force: true */ });
    console.log('All models synchronized'.bold.white);
  } catch (err) {
    console.log(`ERROR : ${err.message}`.bold.red);
  }
})();

const db = {};

db.sequelize = sequelize;
db.Sequelize = Sequelize;

const User = UserModel(sequelize, Sequelize);
const Resource = ResourceModel(sequelize, Sequelize);
const Like = LikeModel(sequelize, Sequelize);

// relationships
User.hasMany(Resource, { onDelete: 'cascade' });
Resource.belongsTo(User);

Resource.hasMany(Like, {onDelete: 'cascade' })
Like.belongsTo(Resource)

User.hasMany(Like, {onDelete: 'cascade'})
Like.belongsTo(User)


export default db;
export { sequelize, Sequelize, User, Resource, Like };
