/**
 *      /api/user
 *
 *      This route deals with the creation and updation of normal users.
 *      Its has a sub-route called 'auth' which will issue JWT to the user
 *
 */

import { Router } from 'express';
import controllers from '../../controllers/user.controllers';
import authRouter from './auth.router';
import jwt from '../../services/jwt';
import { validateSignup, validateUserUpdate, isRequestValidated } from '../../services/validator';
import {  ValidateUserSignUp } from '../../services/validations/user.validations';
const router = Router();

/**
 * ======================================
 *         MOUNTING api/user/auth
 * ======================================
 */
router.use('/auth', authRouter);

/**
 * ======================================
 *              ENDPOINTS
 * ======================================
 *
 * 
 */
router.post('/', ValidateUserSignUp, controllers.create);
router.get('/', jwt, controllers.get);
router.get('/:query', jwt, controllers.getUser)
router.put('/', jwt, validateUserUpdate, isRequestValidated, controllers.update);
router.get('/resource', jwt, controllers.getResources);
export default router;
