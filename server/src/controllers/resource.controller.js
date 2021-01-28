/**
 *      controllers for /api/resource
 *
 */
import { User, Resource, Like } from '../models';
import drive from '../services/google-drive';
import { rm } from 'fs/promises';
import googleDrive from '../services/google-drive';

// create a resource
async function create(req, res) {
  console.log('FILE CONTROLLER HITTING >>>>>>>>>>>>>>>');
  console.log('FILE PROPS CONTROLLER >>>>>>>>>>>>>>>>', req.file);
  console.log('REQ BODY >>>>>>>>>>>>>>>>', req.body);
  const FILE_PATH = req.file.path;
  if (!req.file) throw new Error('No File Received');
  try {
    // find the user
    const user = await User.findOne({
      where: { id: req.user.id },
    });

    const { title, description } = req.body;

    // uploading the file in the drive in getting the details
    const file = await drive.uploadFile(req.file.originalname, description, FILE_PATH);

    // inserting resource in the database
    let resource = await user.createResource({
      title,
      type: req.file.type,
      publicid: file.id,
    });

    resource = resource.toJSON();
    resource['file'] = file;
    res.json(resource);
  } catch (error) {
    console.log(error.message);
    res.status(400).json({ error: error.message || error });
  } finally {
    // delete the temp file from the server
    await rm(FILE_PATH);
  }
}

// get every single resource in db
async function getEverything(req, res) {
  try {
    const list = await Resource.findAll({
      attributes: {
        exclude: ['updatedAt', 'userId'],
      },
      include: [
        {
          model: User,
          attributes: ['username', 'firstname', 'lastname'],
        },
        {
          model: Like,
          attributes: [],
          include: [
            {
              model: User,
              attributes: ['firstname', 'lastname'],
            },
          ],
        },
      ],
    });

    // attaching file details to every file
    for (let i = 0; i < list.length; i++) {
      list[i] = list[i].toJSON();
      list[i]['file'] = await googleDrive.getDetails(list[i].publicid);
    }
    res.send(list);
  } catch (error) {
    res.status(400).json({ error: error.message || error });
  }
}

// get a single resource using primary key
async function getSingle(req, res) {
  try {
    const pk = req.params.pk;
    let reso = await Resource.findByPk(pk, {
      include: [
        {
          model: User,
          attributes: ['username', 'firstname', 'lastname'],
        },
        {
          model: Like,
          attributes: ['userId'],
          include: [
            {
              model: User,
              attributes: ['firstname', 'lastname'],
            },
          ],
        },
      ],
    });
    if (!reso) throw new Error('No Resource found for that Pk');
    reso.views += 1;
    await reso.save();

    // count the number of likes and attach it to the outgoing object
    reso.dataValues.likeCount = await reso.countLikes();

    // fetching and attaching cloud file details
    reso = reso.toJSON();
    reso['file'] = await googleDrive.getDetails(reso.publicid);

    res.send(reso);
  } catch (error) {
    res.status(400).json({ error: error.message || error });
  }
}

// delete a resource using its primary key
async function deleteResource(req, res) {
  try {
    const pk = req.params.pk;
    const resource = await Resource.findByPk(pk);

    if (!resource) throw new Error('No resource exists by that primary key');

    // check is the uploaded deleting the resource or what
    if (resource.userId !== req.user.id)
      throw new Error('You are not authorized to delete this resource. Only the owner can');

    // the cloud id of the resource
    const publicid = resource.publicid;

    // deleting the file from cloud
    await googleDrive.deleteFile(publicid);

    // deleting the file record from datbase too
    await resource.destroy();

    res.json({ message: `file ${resource.id} destroyed. Khatam! Finish! Goodbye! tata!` });
  } catch (error) {
    res.status(400).json({ error: error.message || error });
  }
}

async function like(req, res) {
  try {
    // getting the user
    const user = await User.findOne({
      where: {
        username: req.user.username,
      },
    });

    // getting the resource
    const resource = await Resource.findByPk(req.params.pk);
    if (!resource) throw new Error("The resource doesn't exist");

    //  let's see if the user has liked this resource or not
    const like = await resource.getLikes({ where: { userId: user.id } });

    // if the like exists. we remove the like from DB
    if (like[0]) {
      await resource.removeLike(like[0].id);
      return res.json({ mesasge: 'UNLIKED' });
    }
    // if it doesn't exist, we create one
    else {
      await resource.createLike({ userId: user.id });
      return res.json({ mesasge: 'LIKED' });
    }
    res.json(like);
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: error.message || error });
  }
}
const controllers = {};

controllers.create = create;
controllers.getSingle = getSingle;
controllers.getEverything = getEverything;
controllers.deleteResource = deleteResource;
controllers.like = like;

export default controllers;
