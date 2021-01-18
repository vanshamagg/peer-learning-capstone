/**
 *      /api/user
 */

import { Router } from 'express';
import controllers  from '../../controllers/user.controllers';
import authRouter from './auth.router';

const router = Router();



// Mounting /api/user/auth 
router.use('/auth', authRouter);


// endpoints

router.get('/', (req, res) => {
  res.send('welcome to the user router');
});



router.post('/', controllers.create);
router.get('/:username', controllers.get);
router.put('/', controllers.update);
export default router;
