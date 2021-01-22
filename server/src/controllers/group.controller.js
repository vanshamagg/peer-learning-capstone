/**
 *
 *      controllers for /api/group
 */
import { Groups, User, Sequelize } from '../models';
import { createOrGetModel, deleteModel } from '../models/dynamic-message-tables.model';
import { Op } from 'sequelize';
/**
 *  Creates a group
 */
async function create(req, res) {
  try {
    const { name, description, members } = req.body;

    // check if a group exists by the name given
    const result = await Groups.findOne({
      where: { name },
    });

    // if it exisits throw an error
    if (result) throw new Error('A group by that name already exists');

    // name for the table that will hold this group's messsages
    const messagetablename = req.body.name.split(' ').join('').toLowerCase() + 'messages';

    // entry in the groups table
    const group = await Groups.create({
      name,
      description,
      messagetablename,
    });

    // adding the current logged in user as the admin
    const user = await User.findByPk(req.user.id);
    await group.addAdmin(user);

    // adding the current logged in user as the first member of thr group
    await group.addMember(user);
    group.totalmembers += 1;
    await group.save();

    // creating a specific table for holding all the messages of this group
    await createOrGetModel(messagetablename);

    return res.json(group);
  } catch (error) {
    console.log(error);
    res.status(400).json({
      error: error.message || error.errors[0].message || error,
    });
  }
}

/**
 *
 *  Deletes a group
 */
async function deleteGroup(req, res) {
  try {
    const gid = req.params.id;

    // check if the group exists with that ID
    const group = await Groups.findByPk(gid);

    if (!group) throw new Error(`No Groups exists with id ${gid}`);

    // check if the logged in user is the admin of the group or not.
    const admins = await group.hasAdmin(req.user.id);

    // if the logged in user is not the admin, throw error
    if (!admins) throw new Error('Logged in user is not the admin of this group.');

    // delete the messages of the group
    await deleteModel(group.messagetablename);

    // delete the group from the group list
    await group.destroy();

    // console.log(Object.keys(group.__proto__));
    res.json({ message: 'Group has been deleted' });
  } catch (error) {
    res.status(400).json({
      error: error.message || error.errors[0].message || error,
    });
  }
}

/**
 *  Get all the members of the particular group
 */
async function getMembers(req, res) {
  try {
    const gid = req.params.id;
    const group = await Groups.findByPk(gid);
    const members = await group.getMembers({
      attributes: ['id', 'firstname', 'lastname'],
    });

    // counting number of members
    const totalmembers = await group.countMembers();
    members.unshift({ totalmembers });
    res.json(members);
  } catch (error) {
    res.status(400).json({
      error: error.message || error.errors[0].message || error,
    });
  }
}

/**
 *  Get all the details of the particular group
 */
async function get(req, res) {
  try {
    const gid = req.params.id;
    const group = await Groups.findByPk(gid, {
      attributes: {
        exclude: ['messagetablename'],
      },
    });

    if (!group) throw new Error('Invalid Group Id');
    res.json(group);
  } catch (error) {
    res.status(400).json({ error: error.message || error.errors[0].message || error });
  }
}

/**
 *  Add one member to a group
 */
async function addMember(req, res) {
  try {
    const gid = req.params.id;
    const { id } = req.body;

    // get the group
    const group = await Groups.findByPk(gid);

    if (!group) throw new Error('Invalid Group ID');

    // check if the logged in user is the admin
    const isAdmin = await group.hasAdmin(req.user.id);

    if (!isAdmin) throw new Error('You are not authorised to add a memeber as you are not the admin of this group');

    // check if the member being try to add exists in the database
    const user = await User.findOne({
      where: { id },
    });

    if (!user) throw new Error('The user that you are trying to add doesn not exist in the database');

    // check if the user being added is already the member of this group
    const isMember = await group.hasMember(user);

    if (isMember) throw new Error('This user is already the member of this group');

    // add the member now to this group
    await group.addMember(user);
    group.totalmembers += 1;
    await group.save();

    res.json({ message: `Added user ${user.username} with id ${user.id} to the group ${group.name}` });
  } catch (error) {
    res.status(400).json({ error: error.message || error.errors[0].message || error });
  }
}
const controllers = {};
controllers.create = create;
controllers.addMember = addMember;
controllers.deleteGroup = deleteGroup;
controllers.getMembers = getMembers;
controllers.get = get;
export default controllers;
