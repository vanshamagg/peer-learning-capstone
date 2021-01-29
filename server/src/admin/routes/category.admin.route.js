/**
 * mounted at /admin/category
 *
 * allows the complete access for the CRUD of categories
 */

import { Router } from 'express';
import controllers from '../controllers/category.admin.controller'
const router = Router();

/**
 * ======================================
 *              ENDPOINTS
 * ======================================
 */
router.get('/all', controllers.getAll)
router.post('/', controllers.add)
router.put('/:id', controllers.update)
router.delete('/:id', controllers.remove)
export default router;
