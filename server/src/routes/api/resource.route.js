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
 *      GET /api/resource/all       gets every single PDF, image from the database      no extra information required
 *      GET /api/resource/:pk       gets the details of only the resource belonging to the primary key 'pk'
 *      POST /api/resource          uploads a single file to the cloud      {'file', 'description'} attributes are required
 *      POST  /api/resource/:pk/like    toggles the like for the resource reffered to the primary key 'pk'
 *      DELETE /api/resource/:pk    deletes a resource using its primary key        only pk is required
 *
 */

router.get('/category', controllers.categoryWise);
router.get('/all', controllers.getEverything);
router.get('/:pk', isResourceIdValid, controllers.getSingle);
router.post('/', multer.single('asset'), isFileUploadValid, controllers.create);
router.post('/:id/category', controllers.addCategory)
router.post('/:pk/like', isResourceIdValid, controllers.like);
router.delete('/:pk', isResourceIdValid, controllers.deleteResource);
router.delete('/:id/category', controllers.removeCategory)

export default router;
