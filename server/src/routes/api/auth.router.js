/**
 *      /api/user/auth
 *
 *      MOUNTED on /api/user
 *
 *      DATA REQUIRED FOR RECEVING TOKEN
 *      {
 *          "username": "abcdg" [OR can be your email too 'someone@gmail.com'],
 *          "password":  "tarmjkajsh"
 *      }
 *
 *
 */

import { Router } from 'express';
import passport from '../../services/passport-auth';
import controllers from '../../controllers/auth.controller';
import { validateUserCredentials } from '../../services/validations/auth.validation';

const router = Router();

/**
 * ======================================
 *              MIDDLEWARE
 * ======================================
 */
router.use(passport.initialize());

/**
 * ======================================
 *              ENDPOINTS
 * ======================================
 */
router.get('/', (req, res) => res.send('Welcome to the auth. Here you get a token. use POST on this route'));
router.post('/', validateUserCredentials, passport.authenticate('local', { session: false }), controllers.giveToken);

export default router;
