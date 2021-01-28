/**
 * Validations for the group route
 */
import { body } from 'express-validator';
import { isRequestValidated } from './error';

export const validateGroupCreation = [
  body('name').trim().escape().isLength({ min: 10, max: 30 }).withMessage('Title should be between 10 and 30 chars'),
  body('description')
    .trim()
    .escape()
    .isLength({ min: 20, max: 100 })
    .withMessage('description should be between 20 and 100 chars'),
  isRequestValidated,
];

export const validateGroupPost = [body('text').escape(), isRequestValidated];
