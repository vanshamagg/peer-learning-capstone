/**
 *      /api/group
 *
 *      For the CRUD of groups and the message in them
 *
 */

import { Router } from 'express';
import jwt from '../../services/jwt';
import controllers from '../../controllers/group.controller';
const router = Router();

/**
 * ======================================
 *         MIDDLWARES
 * ======================================
 */
router.use(jwt);

/**
 * ======================================
 *         ENDPOINTS
 * ======================================
 */

router.get('/:id/members', controllers.getMembers) 
router.get('/:id', controllers.get)
router.post('/', controllers.create);
router.post('/:id/member', controllers.addMember);
router.delete('/:id', controllers.deleteGroup);
export default router;
