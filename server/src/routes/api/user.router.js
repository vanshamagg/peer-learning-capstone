/**
 *      /api/user
 */

import { Router } from 'express';
import controllers  from '../../controllers/user.controllers';
import authRouter from './auth.router';
import jwt from '../../services/jwt';

const router = Router();



// Mounting /api/user/auth 
router.use('/auth', authRouter);


// endpoints

router.post('/', controllers.create);
router.get('/', jwt, controllers.get);
router.put('/', jwt, controllers.update);
export default router;
