/**
 *      /api/user
 */

import {Router} from 'express'


const router = Router()

router.get('/', (req, res)=> {
    res.send('welcome to the user router');
})

export default router;