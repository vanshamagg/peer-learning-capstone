/**
 *      /api
 */
import { Router } from 'express';
import user from './user.router';
import resource from './resource.route';
import bodyParser from 'body-parser';

const router = Router();

// middlewares
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));

// Mounted routes
router.use('/user', user);
router.use('/resource', resource);

router.get('/', (req, res) => {
  res.send('You are on the right path, son');
});

export default router;
