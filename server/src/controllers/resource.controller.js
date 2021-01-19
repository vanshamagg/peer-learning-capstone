/**
 *      controllers for /api/resources
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
      if (err) throw err;
      const reso = await user.createResource({
        url: resource.url,
        type: resource.format,
        size: req.file.size,
        description: req.body.description,
        publicid: resource.public_id,
      });

      rmSync(FILE_PATH);
      res.json(reso.toJSON());
    });
  } catch (error) {
    res.json({ error });
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

    res.json(user.toJSON());
  } catch (error) {
    console.log(error.message);
    res.json({ error });
  }
}

// get every single resource in db
async function getEverything(req, res) {
  try {
    const list = await Resource.findAll({});
    res.send(list);
  } catch (error) {
    res.send({ error });
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
    res.status(400);
    res.json({ error: error.message });
  }
}
const controllers = {};

controllers.create = create;
controllers.getAllUser = getAllUser;
controllers.getEverything = getEverything;
controllers.deleteResource = deleteResource;

export default controllers;
