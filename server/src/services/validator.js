/**
 *  validations for various create routes
 */

import { check, validationResult, body } from 'express-validator';
import {rmSync} from 'fs'

// constraints for the signup
export const validateSignup = [
  check('firstname').notEmpty().withMessage('First Name is Required'),
  check('lastname').notEmpty().withMessage('Last name is required'),
  check('email').notEmpty().withMessage('Not a valid email'),
  check('email').notEmpty().withMessage('Email is required'),
  check('username').notEmpty().withMessage('User is required'),
  check('username').isLength({ min: 6, max: 15 }).withMessage('Username should be between 6 and 15 chars'),
  check('password').isLength({ min: 6, max: 20 }).withMessage('Password should be between 6 and 20 chars'),
];

// validation for updating user details
export const validateUserUpdate = [
  check('firstname').notEmpty().withMessage('Firstname cannot be empty'),
  check('lastname').notEmpty().withMessage('Last name cannot be empty'),
  check('firstname').isAlpha().withMessage('firstname cannot have numbers'),
  check('lastname').isAlpha().withMessage('lastname cannot have numbers'),
];

// validation for login/ authentication
export const validateUserOnAuth = [
  check('username').notEmpty().withMessage('username/email cannot be empty'),
  check('password').notEmpty().withMessage('password cannot be empty'),
];

// validation for creating a resource
export const validateUpload = [
  check('title').notEmpty().withMessage("title cannot be empty"),
  check('title').isLength({ min: 10, max: 100 }).withMessage('title should be min 10 chars and max 100 chars'),
  check('description').isLength({ max: 250 }).withMessage('description can be max 100 chars'),
];

// send errors if any
export const isRequestValidated = (req, res, next) => {
  const errors = validationResult(req);
  
  if (errors.array().length > 0) {
    
    // if there was a file uploaded and this error occured
    if(req.file)  rmSync(req.file.path)

    let messages = errors.array().map((err) => err.msg);
    return res.status(400).json({ error: messages });
  }
  next();
};


