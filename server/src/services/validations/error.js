/**
 *  middlware for handling errors
 */

import { validationResult } from 'express-validator';
import { rmSync } from 'fs';


export const isRequestValidated = (req, res, next) => {
  const errors = validationResult(req);
  if (errors.array().length > 0) {
    // if there was a file uploaded and this error occured
    if (req.file) rmSync(req.file.path);

    let messages = errors.array().map((err) => err.msg);
    return res.status(400).json({ error: messages });
  }
  next();
};
