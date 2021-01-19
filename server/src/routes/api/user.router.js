/**
 *      /api/user
 */

import { Router } from 'express';
import controllers from '../../controllers/user.controllers';
import authRouter from './auth.router';
import jwt from '../../services/jwt';
import { validateSignup, validateUserUpdate, isRequestValidated } from '../../services/validator';

const router = Router();

// Mounting /api/user/auth
router.use('/auth', authRouter);

// endpoints

router.post('/', validateSignup, isRequestValidated, controllers.create);
router.get('/', jwt, controllers.get);
router.put('/', jwt, validateUserUpdate, isRequestValidated, controllers.update);
export default router;
