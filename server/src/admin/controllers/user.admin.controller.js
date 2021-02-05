/**
 *  controllers for /admin/user
 */

import { User } from '../../models';

/**
 * get every single user from the database
 */
async function getAll(req, res) {
    try {
        const list = await User.findAll();
        res.json(list);
    } catch (error) {
        res.status(400).json({ error: error.message || message })
    }
}
/**
 * deletes any one single user from the database
 */
async function destroy(req, res) {
    try {
        const id = req.params.id;

        // get the user from the db
        const user = await User.findByPk(id);

        // delete the user from the db
        await user.destroy()

        res.json({ message: `user ${user.firstname} ${user.lastname} with id ${user.id} has been deleted from the database.` })
    } catch (error) {
        res.status(400).json({ error: error.message || error })
    }
}
const controllers = {}
controllers.getAll = getAll;
controllers.destroy = destroy;

export default controllers;