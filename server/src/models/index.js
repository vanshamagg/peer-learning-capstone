import 'dotenv/config';
import { Sequelize } from 'sequelize';
import 'colors';
import UserModel from './User.model';
import ResourceModel from './Resource.model';
import LikeModel from './Like.model';
import GroupsModel from './Groups.model';
import PostModel from './Post.model';
import CategoryModel from './Category.model';

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

    await sequelize.sync({
      /* force: true */
    });
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
const Groups = GroupsModel(sequelize, Sequelize);
const Post = PostModel(sequelize, Sequelize);
const Category = CategoryModel(sequelize, Sequelize);
/**
 * ======================================
 *              RELATIONSHIPS
 * ======================================
 */

//  Users and Resources
User.hasMany(Resource, { onDelete: 'cascade' });
Resource.belongsTo(User);

// Users and Likes
Resource.hasMany(Like, { onDelete: 'cascade' });
Like.belongsTo(Resource);

// Resources and Likes
User.hasMany(Like, { onDelete: 'cascade' });
Like.belongsTo(User);

// Groups and Users (Admins) MANY-TO-MANY
User.belongsToMany(Groups, { through: 'admins', as: 'AdminGroups' });
Groups.belongsToMany(User, { through: 'admins', as: 'Admins' });

// Groups and Users (Members) MANY-TO-MANY
User.belongsToMany(Groups, { through: 'members', as: 'MemberGroups' });
Groups.belongsToMany(User, { through: 'members', as: 'Members' });

// Groups and Messages Many-To-One
Groups.hasMany(Post, { as: 'Posts' });
Post.belongsTo(Groups);

// User and Messages Mant -To- One
User.hasMany(Post, { as: 'GroupPosts' });
Post.belongsTo(User);

//  Resources and Categories - many to many
Resource.belongsToMany(Category, { through: 'rescatjoin', as: 'Categories' });
Category.belongsToMany(Resource, { through: 'rescatjoin', as: 'Resources' });

export default db;
export { sequelize, Sequelize, User, Resource, Like, Groups, Post, Category };
