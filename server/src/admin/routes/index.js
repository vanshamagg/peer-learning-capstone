/**
 *  mounted at /admin
 */

import { Router } from 'express';
import bodyParser from 'body-parser';
import category from './category.admin.route';
import user from './user.admin.route';
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
router.use('/category', category)
router.use('/user', user)
/**
 * ======================================
 *              ENDPOINTS
 * ======================================
 */
router.get('/', (req, res)=> {
    res.send("Welcome to the admin route. Beyond this you need a admin authentication to feel the power.")
})

export default router;
