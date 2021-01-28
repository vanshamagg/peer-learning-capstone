/**
 *
 *      controllers for /api/group
 */
import { Groups, User } from '../models';
/**
 *  Creates a group
 */
async function create(req, res) {
  try {
    const { name, description } = req.body;

    // check if a group exists by the name given
    const result = await Groups.findOne({
      where: { name },
    });

    // if it exisits throw an error
    if (result) throw new Error('A group by that name already exists');

    // name for the table that will hold this group's messsages
    // const messagetablename = cryptoRandomString({ length: 20, characters: 'abcdefghijklmnopqrstuvwxyz' }).toLowerCase();

    // entry in the groups table
    const group = await Groups.create({
      name,
      description,
    });

    // adding the current logged in user as the admin
    const user = await User.findByPk(req.user.id);
    await group.addAdmin(user);

    // adding the current logged in user as the first member of thr group
    await group.addMember(user);
    group.totalmembers += 1;
    await group.save();

    // creating a specific table for holding all the messages of this group
    // await createOrGetModel(messagetablename);

    return res.json(group);
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: error.message || error });
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
    // await deleteModel(group.messagetablename);

    // delete the group from the group list
    await group.destroy();

    // console.log(Object.keys(group.__proto__));
    res.json({ message: 'Group has been deleted' });
  } catch (error) {
    res.status(400).json({
      error: error.message || error,
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
      attributes: ['id', 'firstname', 'lastname', 'username'],
      joinTableAttributes: []
    });

    // counting number of members
    const totalmembers = await group.countMembers();
    members.unshift({ totalmembers });
    res.json(members);
  } catch (error) {
    res.status(400).json({ error: error.message || error });
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
      include: [
        {
          model: User,
          as: "Admins",
          attributes: ['firstname', 'lastname', 'username'],
          through: {
            attributes: []
          }
        },
        {
          model: User,
          as: "Members",
          attributes: ['id','firstname', 'lastname', 'username'],
          through: {
            attributes: []
          }
        }
      ],

    });

    if (!group) throw new Error('Invalid Group Id');
    res.json(group);
  } catch (error) {
    res.status(400).json({ error: error.message || error });
  }
}

/**
 *  Add one member to a group
 *  if the admin wants to add someone to the grouop
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

    if (!isAdmin) throw new Error('You are not authorised to add a member as you are not the admin of this group');

    // check if the member being try to add exists in the database
    const user = await User.findOne({
      where: { id },
    });

    if (!user) throw new Error('The user that you are trying to add does not exist in the database');

    // check if the user being added is already the member of this group
    const isMember = await group.hasMember(user);
    if (isMember) throw new Error('This user is already the member of this group');

    // add the member now to this group
    await group.addMember(user);
    group.totalmembers += 1;
    await group.save();

    res.json({ message: `Added user ${user.username} with id ${user.id} to the group ${group.name}` });
  } catch (error) {
    res.status(400).json({ error: error.message || error });
  }
}

/**
 * Delete one member from the group
 * If the admin wants to remove a member from the group
 */
async function deleteMember(req, res) {
  try {
    const gid = req.params.id;
    const uid = req.body.id;

    // get the group
    const group = await Groups.findByPk(gid);
    if (!group) throw new Error('Invalid Group ID');

    // check if the logged in user is the admin or not
    const isAdmin = await group.hasAdmin(req.user.id);
    if (!isAdmin) throw new Error('You are not authorised to add a member as you are not the admin of this group');

    // check if the user being remove is valid or not
    const user = await User.findByPk(uid);
    if (!user) throw new Error('The user that you are trying to remove does not exist in the datbase');

    // check if ther user being removed is the admin of the group
    // if he is the admin then for simplicity, he cannot be removed
    const isUserAdmin = await user.hasAdminGroup(group);
    if (isUserAdmin) throw new Error('This user is the admin of the group hence cannot be removed from here');

    // check if the user being removed from the group is a member or not
    const isMember = await group.hasMember(user);
    if (!isMember) throw new Error('This user is not the member of this group');

    // remove member from this group
    await group.removeMember(uid);
    group.totalmembers -= 1;
    await group.save();

    res.json({ message: `Removed user ${user.username} with id ${user.id} to the group ${group.name}` });
  } catch (error) {
    res.status(400).json({ error: error.message || error });
  }
}

/**
 * Join a discussion group
 * any logged in member can join a group
 */
async function join(req, res) {
  try {
    const gid = req.params.id;
    const uid = req.user.id;

    //  get the user
    const user = await User.findByPk(uid);

    // get the group
    const group = await Groups.findByPk(gid);
    if (!group) throw error('Invalid Group ID');

    // whether the user is member of this group or not
    const isMember = await group.hasMember(user);

    if (isMember)
      throw new Error(
        `User ${user.firstname} ${user.lastname} with id ${user.id} is already the member of group ${group.name}`,
      );

    // add the current logged in user as the member of this group
    await group.addMember(user);
    group.totalmembers += 1;
    await group.save();

    res.json({ message: `user ${user.firstname} ${user.lastname} (You) has been added to the ${group.name} ` });
  } catch (error) {
    res.status(400).json({ error: error.message || error });
  }
}

/**
 *  Leave a discussion group
 *  A logged in member can leave a discussion group
 */
async function leave(req, res) {
  try {
    const gid = req.params.id;
    const uid = req.user.id;

    //  get the user
    const user = await User.findByPk(uid);

    // get the group
    const group = await Groups.findByPk(gid);
    if (!group) throw error('Invalid Group ID');

    // whether the user is member of this group or not
    const isMember = await group.hasMember(user);

    if (!isMember)
      throw new Error(`This User ${user.firstname} ${user.lastname} (you) is not the member of group ${group.name}`);

    // check if the logged in user is the admin of the group
    const isAdmin = await group.hasAdmin(user);
    if (isAdmin)
      throw new Error(
        `User ${user.firstname} ${user.lastname} (You) is the admin of this group and hence cannot be removed from here`,
      );

    // remove the logged in user from the group
    await group.removeMember(user);
    group.totalmembers -= 1;
    await group.save();

    const successMesasge = `user ${user.firstname} ${user.lastname} has been removed from ther group ${group.name}`;

    res.json({ message: successMesasge });
  } catch (error) {
    res.status(400).json({ error: error.message || error });
  }
}

/**
 *  Post a message to a group
 */
async function postMessage(req, res) {
  try {
    const uid = req.user.id;
    const gid = req.params.id;
    const text = req.body.text;

    // get the group;
    const group = await Groups.findByPk(gid);
    if (!group) throw new Error('Invalid Group ID');

    // get the user
    const user = await User.findByPk(uid);
    if (!user) throw new Error('Invalid user ID hence invalid token');

    // create the message for the user
    const post = await user.createGroupPost({
      text,
    });

    // add the message for the group
    // and reload the instance from the database
    await group.addPost(post);
    await post.reload();

    // increase the number of posts in the group
    await group.increment('totalmessages')

    res.json(post);
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: error.message || error });
  }
}

/**
 * Get all message of a group
 */
async function getPosts(req, res) {
  try {
    const gid = req.params.id;

    // get the group
    const group = await Groups.findByPk(gid);
    if (!group) throw new Error('Invalid Group ID');

    // get all the posts of the group
    const posts = await group.getPosts({
      attributes: {
        exclude: ['groupId', 'userId'],
      },
      include: [
        {
          model: User,
          attributes: ['id', 'firstname', 'lastname', 'username']
        }
      ]
    });

    res.json(posts);
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: error.message || error });
  }
}
const controllers = {};
controllers.create = create;
controllers.addMember = addMember;
controllers.join = join;
controllers.deleteGroup = deleteGroup;
controllers.deleteMember = deleteMember;
controllers.leave = leave;
controllers.getMembers = getMembers;
controllers.get = get;
controllers.postMessage = postMessage;
controllers.getPosts = getPosts;

export default controllers;
