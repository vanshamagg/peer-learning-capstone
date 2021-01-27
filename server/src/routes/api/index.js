/**
 *      /api
 *
 */
import { Router } from 'express';
import user from './user.router';
import resource from './resource.route';
import group from './group.route';
import bodyParser from 'body-parser';
const router = Router();

/**
 * ======================================
 *              MIDDLEWARE
 * ======================================
 */
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));

/**
 * ======================================
 *              MOUNTED ROUTERS
 * ======================================
 */
router.use('/user', user);
router.use('/resource', resource);
router.use('/group', group);

/**
 * ======================================
 *              ENDPOINTS
 * ======================================
 */
router.get('/', (req, res) => {
  res.send('You are on the right path, son');
});

export default router;
