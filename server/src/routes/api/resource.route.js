/**
 *      /api/resource
 *
 *      THIS IS A PROTECTED ROUTE. REQUIRES jwt. JWT must be included in the 'Authorization' Header as Bearer Token
 *
 *
 */

import 'dotenv/config';
import { Router } from 'express';
import jwt from '../../services/jwt';
import controllers from '../../controllers/resource.controller';
import multer from '../../services/multer-file-upload';
import { isResourceIdValid, isFileUploadValid } from '../../services/validations/resource.validations';
const router = Router();

/**
 * ======================================
 *              MIDDLEWARE
 * ======================================
 */
router.use(jwt);

/**
 * ======================================
 *              ENDPOINTS
 * ======================================
 *
 */

router.get('/category', controllers.categoryWise);
router.get('/all', controllers.getEverything);
router.get('/categories', controllers.allCategories)
router.get('/:pk', isResourceIdValid, controllers.getSingle);
router.post('/', multer.single('asset'), isFileUploadValid, controllers.create);
router.post('/:id/category', controllers.addCategory)
router.post('/:pk/like', isResourceIdValid, controllers.like);
router.delete('/:pk', isResourceIdValid, controllers.deleteResource);
router.delete('/:id/category', controllers.removeCategory)

export default router;
