/**
 *      Passport Strategies
 */

import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import { User } from '../models';
import { Op } from 'sequelize';
import bcrypt from 'bcryptjs';
import 'colors';

passport.use(
  new LocalStrategy({
    passReqToCallback: true
  },async (req, username, password, done) => {
    try {
      let user = await User.findOne({
        where: {
          [Op.or]: [
            {
              username: username,
            },
            {
              email: username,
            },
          ],
        },
      });
      if (!user) throw new Error('User not found');

      user = user.toJSON();
      const checkPassword = await bcrypt.compare(password, user.password) 
      if (checkPassword) {
        console.log(`${username} Authenticated.`.white.bold);
        delete user.password;
        done(null, user);
      } else {
        console.log(`Wrong password for ${username}`.bold.red);
        done(null, false, { message: 'Wrong Password' });
      }
    } catch (error) {
      console.log(error.message.red.bold);
      done(error, null);
    }
  }),
);

export default passport;
