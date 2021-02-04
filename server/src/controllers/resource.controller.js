/**
 *      controllers for /api/resource
 *
 */
import { User, Resource, Like, Category } from '../models';
import drive from '../services/google-drive';
import { rm } from 'fs/promises';
import googleDrive from '../services/google-drive';

// create a resource
async function create(req, res) {
  const FILE_PATH = req.file.path;
  try {
    if (!req.file) throw new Error('No File Received');

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
    console.log(Object.keys(resource.__proto__));
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
        {
          model: Category,
          as: 'Categories',
          attributes: ['name'],
          through: {
            attributes: [],
          },
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
        {
          model: Category,
          as: 'Categories',
          attributes: ['name', 'description'],
          through: {
            attributes: [],
          },
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

    const message = {};
    // if the like exists. we remove the like from DB
    if (like[0]) {
      await resource.removeLike(like[0].id);
      message['message'] = 'UNLIKED';
    }
    // if it doesn't exist, we create one
    else {
      await resource.createLike({ userId: user.id });
      message['message'] = 'LIKED';
    }

    // get the updated number of likes
    const likeCount = await resource.countLikes();
    message['likeCount'] = likeCount;

    res.json(message);
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: error.message || error });
  }
}

/**
 * add one single category to the resource
 */
async function addCategory(req, res) {
  try {
    const rid = req.params.id;

    // get the resource from the db
    const resource = await Resource.findByPk(rid);
    if (!resource) throw new Error(`Resource with id ${rid} does not exist`);

    // add the category to the resource
    const category = await Category.findOne({
      where: {
        name: req.body.category,
      },
    });
    if (!category) throw new Error(`cannot find category with name ${req.body.category} `);
    await resource.addCategory(category);

    res.json({ message: `added category ${category.name} to the resource ${resource.title}` });
  } catch (error) {
    res.status(400).json({ error: error.message || error });
  }
}

/**
 * remove category from the resource
 */
async function removeCategory(req, res) {
  try {
    const rid = req.params.id;

    // get the resource from the db
    const resource = await Resource.findByPk(rid);
    if (!resource) throw new Error(`Resource with id ${rid} does not exist`);

    // get the category from the db
    const category = await Category.findOne({
      where: {
        name: req.body.category,
      },
    });
    if (!category) throw new Error(`cannot find category with name ${req.body.category} `);

    // check if the resouce has the category sent or not
    const hasCategory = await resource.hasCategory(category);

    if (!hasCategory)
      throw new Error(`resource ${resource.title} id ${resource.id} doesn not have the category ${category.name} `);

    // remove the category from the resource
    await resource.removeCategory(category);

    res.json({ message: `removed category ${category.name} from the resource ${resource.title}` });
  } catch (error) {
    res.status(400).json({ error: error.message || error });
  }
}

/**
 * get resource category wise
 * 'q' is the query param in the URL string
 */

async function categoryWise(req, res) {
  try {
    const query = req.query.q;

    // get the category
    const list = await Category.findOne({
      where: {
        name: query,
      },
      include: [
        {
          model: Resource,
          as: 'Resources',
          through: {
            attributes: [],
          },
          attributes: {
            exclude: ['userId'],
          },
          include: [
            {
              model: User,
              attributes: ['firstname', 'lastname', 'username'],
            },
          ],
        },
      ],
    });

    if (!list) throw new Error(`No category exists by the name of ${query}`);

    const resources = list['Resources'];
    // fetching file information from the cloud for each file
    for  (let i = 0; i < resources.length; i++) {
      resources[i]['dataValues']['file'] = await googleDrive.getDetails(resources[i]['publicid']);
    }
    res.json(list);
  } catch (error) {
    console.log(error)
    res.status(400).json({ error: error.message || error });
  }
}

/**
 * get the list of all categories
 */
async function allCategories(req, res) {
  try {
    const list = await Category.findAll({});
    res.json(list);
  } catch (error) {
    res.status(500).json({ error: error.message || error });
  }
}
const controllers = {};

controllers.create = create;
controllers.addCategory = addCategory;
controllers.getSingle = getSingle;
controllers.allCategories = allCategories;
controllers.getEverything = getEverything;
controllers.deleteResource = deleteResource;
controllers.removeCategory = removeCategory;
controllers.categoryWise = categoryWise;
controllers.like = like;
export default controllers;
