/**
 *      /api/user
 */

import { Router } from 'express';
import controllers  from '../../controllers/user.controllers';

const router = Router();

router.get('/', (req, res) => {
  res.send('welcome to the user router');
});

router.post('/', controllers.create);
router.get('/:username', controllers.get);
router.put('/', controllers.update);
export default router;
