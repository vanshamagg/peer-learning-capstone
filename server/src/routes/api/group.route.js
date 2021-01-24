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
router.patch("/:id/join", controllers.join);
router.patch("/:id/leave", controllers.leave);
router.delete('/:id', controllers.deleteGroup);
router.delete('/:id/member', controllers.deleteMember)
export default router;
