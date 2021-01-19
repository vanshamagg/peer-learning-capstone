/**
 *  checking jwt from the authorization header
 */

import 'dotenv/config';
import jwt from 'express-jwt';

const config = {
  secret: process.env.JWT_SECRET_DEV,
  algorithms: ['HS256'],
};
function handleError(err, req, res, next) {
  if (err.name) res.status(400).json({error: err.message});
  else next();
}

const stack = [jwt(config), handleError];

export default stack;
