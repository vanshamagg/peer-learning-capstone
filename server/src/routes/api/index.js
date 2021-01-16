/**
 *      /api
 */
import { Router } from 'express';
import user from './user.router';
const router = Router();

// Mounted routes
router.use('/user', user);

router.get('/', (req, res) =>  {
    res.send('You are on the right path, son');
})

export default router;