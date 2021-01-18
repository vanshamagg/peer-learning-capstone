/**
 *      /api/user/auth
 *
 *      MOUNTED on /api/user
 */

import { Router } from 'express';
// import passport from 'passport';
import passport from '../../services/passport-auth';
import controllers from '../../controllers/auth.controller';
const router = Router();

// middlware
router.use(passport.initialize());
router.get('/', (req, res)=>  res.send("Welcome to the auth"))
router.post('/', passport.authenticate('local', { session: false }), controllers.giveToken);
export default router;
