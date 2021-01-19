/**
 *      /api/resource
 * 
 *      THIS IS A PROTECTED ROUTE REQUIRES jwt
 */

import 'dotenv/config';
import {Router} from 'express';
import jwt from '../../services/jwt';
import controllers from '../../controllers/resource.controller'
import multer from '../../services/multer-file-upload';

const router = Router();

// middleware
router.use(jwt);

router.get('/all', controllers.getEverything)
router.get('/', controllers.getAllUser);
router.post('/', multer.single('file'), controllers.create)
router.delete('/:pk', controllers.deleteResource);



export default router;