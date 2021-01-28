/**
 *  validations for user authentication
 */

import { body } from 'express-validator';
import { User } from '../../models';
import { isRequestValidated } from './error';

export const validateUserCredentials = [body('username').trim().custom(checkUsernameExists), isRequestValidated];

/**
 * checks if the username exists in the database or not
 * @param {String} username username
 */
async function checkUsernameExists(username) {
  try {
    const user = await User.findOne({ where: { username } });

    if (!user) throw new Error(`Invalid Username ${username}`);

    return Promise.resolve(true);
  } catch (error) {
    return Promise.reject(error.message);
  }
}
