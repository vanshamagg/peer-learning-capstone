/**
 * mounted at /admin/user
 *
 * allows the complete access for the CRUD of users
 */

import { Router } from 'express';
import controllers from '../controllers/user.admin.controller'
const router = Router();

/**
 * ======================================
 *              ENDPOINTS
 * ======================================
 */
router.get('/all', controllers.getAll)
router.delete('/:id', controllers.destroy)

export default router;
