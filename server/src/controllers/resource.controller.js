/**
 *      controllers for /api/resource
 *
 */
import { User, Resource, Like } from '../models';
import { Op } from 'sequelize';
import cloudinary from '../services/cloudinary';
import { rmSync } from 'fs';
import { rm } from 'fs/promises';
import { sequelize } from '../models';
import Sequelize from 'sequelize';

// create a resource
async function create(req, res) {
  try {
    const user = await User.findOne({
      where: { id: req.user.id },
    });

    const FILE_PATH = req.file.path;

    cloudinary.v2.uploader.upload(FILE_PATH, async (err, resource) => {
      try {
        if (err) throw err;
        const reso = await user.createResource({
          url: resource.url,
          type: resource.format,
          size: req.file.size,
          description: req.body.description,
          publicid: resource.public_id,
          title: req.body.title,
        });

        res.json(reso.toJSON());
      } catch (error) {
        console.log(error);
        // delete file from the server if a database error occurs
        // cloudinary.v2.uploader.destroy(resource.public_id)
        res.status(500).json({ message: 'Something happened while uploading the file to cloud', error });
      } finally {
        // remove the file from the server
        // rmSync(FILE_PATH);
        await rm(FILE_PATH);
      }
    });
  } catch (error) {
    res.status(400).json({ error: error.message || error.errors[0].message || error });
  }
}

// get every single resource in db
async function getEverything(req, res) {
  try {
    const list = await Resource.findAll({
      attributes: {
        exclude: ['publicid', 'updatedAt', 'userId'],
      },
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
    res.send(list);
  } catch (error) {
    res.status(400).json({ error: error.message || error.errors[0].message });
  }
}

// get a single resource using primary key
async function getSingle(req, res) {
  try {
    const pk = req.params.pk;
    const reso = await Resource.findByPk(pk, {
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
    res.send(reso);
  } catch (error) {
    res.status(400).json({ error: error.message || error.errors[0].message });
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
    cloudinary.v2.uploader.destroy(publicid, async (err, asset) => {
      try {
        if (err) throw err;
        await Resource.destroy({ where: { id: pk } });
        res.json({ message: 'Destroyed' });
      } catch (error) {
        res.status(400).json({ error });
      }
    });
  } catch (error) {
    res.status(400).json({ error: error.message || error.errors[0].message });
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
    res.status(400).json({ error: error.message || error.errors[0].message || error });
  }
}
const controllers = {};

controllers.create = create;
controllers.getSingle = getSingle;
controllers.getEverything = getEverything;
controllers.deleteResource = deleteResource;
controllers.like = like;

export default controllers;
