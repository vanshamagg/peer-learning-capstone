/**
 *      /api/user/auth
 *
 *      MOUNTED on /api/user
 */

import { Router } from 'express';
import passport from '../../services/passport-auth';
import controllers from '../../controllers/auth.controller';
import {validateUserOnAuth, isRequestValidated} from '../../services/validator'

const router = Router();

// middlware
router.use(passport.initialize());

// endpoints
router.get('/', (req, res)=>  res.send("Welcome to the auth. Here you get a token. use POST on this route"))
router.post('/',validateUserOnAuth, isRequestValidated, passport.authenticate('local', { session: false }), controllers.giveToken);


export default router;
