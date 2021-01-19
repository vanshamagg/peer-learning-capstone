/**
 *      controllers for /api/resource
 *
 */
import { User, Resource } from '../models';
import { Op } from 'sequelize';
import cloudinary from '../services/cloudinary';
import { rmSync } from 'fs';

// create a resource
async function create(req, res) {
  try {
    const user = await User.findOne({
      where: {
        [Op.or]: [
          {
            username: req.user.username,
          },
          {
            email: req.user.email,
          },
        ],
      },
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
        });

        res.json(reso.toJSON());
      } catch (error) {
        res.status(500).json({ message: 'Something happened while uploading the file to cloud', error });
      } finally {
        // remove the file from the server
        rmSync(FILE_PATH);
      }

      //remove file from server
    });
  } catch (error) {
    res.status(400).json({ error: error.message || error.errors[0].message || error  });
  }
}

// get all resources of the user based on the jwt
async function getAllUser(req, res) {
  try {
    const user = await User.findOne({
      where: {
        [Op.or]: [{ username: req.user.username }, { email: req.user.email }],
      },
      include: [
        {
          model: Resource,
          attributes: ['id', 'url', 'type'],
        },
      ],
      attributes: {
        exclude: ['password'],
      },
    });

    if (!user)
      throw new Error(
        'User not found. This has happened because, the token has some credentials which are not in the database.',
      );
    res.json(user.toJSON());
  } catch (error) {
    res.status(400).json({ error: error.message || error.errors[0].message });
  }
}

// get every single resource in db
async function getEverything(req, res) {
  try {
    const list = await Resource.findAll({
      attributes: {
        exclude: ['publicid', 'updatedAt', 'type', 'userId'],
      },
      include: [
        {
          model: User,
          attributes: ['username'],
        },
      ],
    });
    res.send(list);
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

    // the url of the resource
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
const controllers = {};

controllers.create = create;
controllers.getAllUser = getAllUser;
controllers.getEverything = getEverything;
controllers.deleteResource = deleteResource;

export default controllers;
