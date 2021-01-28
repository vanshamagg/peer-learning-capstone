/**
 * validations for the /api/resource route
 */

import { body, param } from 'express-validator';
import { isRequestValidated } from './error';

export const isResourceIdValid = [
  param('pk').isNumeric().withMessage('THe Resource ID should be a number.').trim(),
  isRequestValidated,
];

export const isFileUploadValid = [
  body('title')
    .notEmpty()
    .withMessage('title should not be empty')
    .isLength({ min: 10, max: 100 })
    .withMessage('title should lie between 10 and 100 chars')
    .trim(),
  body('description')
    .notEmpty()
    .withMessage('file description cannot be empty')
    .isLength({ min: 0, max: 500 })
    .withMessage('description can be maximum 500 chars')
    .trim()
    .escape(),
  isRequestValidated,
];
