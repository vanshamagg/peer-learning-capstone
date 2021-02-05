/**
 *  controllers for /api/user
 */

import 'dotenv/config';
import { User, Resource, Like, Groups } from '../models';
import bcrypt from 'bcryptjs';
import { sendWelcomeEmail } from '../services/email'
/**
 *  creates a new user from the database
 */
async function create(req, res) {
  try {
    let {
      firstname,
      lastname,
      username,
      email,
      password,
      insti_name,
      insti_type,
      gender,
      mobile,
      city,
      state,
      country,
      dob,
    } = req.body;

    const salt = await bcrypt.genSalt(parseInt(process.env.SALT_ROUNDS));
    password = await bcrypt.hash(password, salt);

    const user = await User.create({
      firstname,
      lastname,
      username,
      email,
      password,
      insti_name,
      insti_type,
      gender,
      mobile,
      city,
      state,
      country,
      dob,
    });

    

    res.status(200).json({ messge: 'User has been created successfully' });

    // sending a welcome message to the user
    await sendWelcomeEmail(user);
  } catch (error) {
    console.log(error.parent.message);
    res.status(400).json({
      error: error,
    });
  }
}

// GET USER DETAILS USING JWT
async function get(req, res) {
  try {
    const id = req.user.id;
    const user = await User.findOne({
      where: { id },
      attributes: {
        exclude: ['password'],
      },
    });
    if (!user) throw new Error('No User Exists by that username');
    res.json(user.toJSON());
  } catch (error) {
    res.status(400).json({ error: error.message || error });
  }
}

/**
 *  update user's every detail except email,username and password
 */
async function update(req, res) {
  try {
    const id = req.user.id;

    // destructure the details
    const {
      firstname,
      middlename,
      lastname,
      insti_name,
      insti_type,
      gender,
      mobile,
      country,
      city,
      state,
      dob,
    } = req.body;

    // update user
    const user = await User.update(
      {
        firstname,
        middlename,
        lastname,
        insti_type,
        insti_name,
        gender,
        mobile,
        country,
        city,
        state,
        dob,
      },
      {
        where: { id },
      },
    );
    res.send({ message: `details of the user ${id} have been updated.` });
  } catch (error) {
    res.status(400).json({ error: error.message || error });
  }
}

/**
 *  get only logged in user's resources
 */
async function getResources(req, res) {
  try {
    const list = await Resource.findAll({
      where: {
        userId: req.user.id,
      },
      include: [
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
    res.status(400).json({ error: error.message || error });
  }
}

/**
 * get details of a partiuclar user basis of query
 */

async function getUser(req, res) {
  try {
    const query = req.params.query;

    const toNumber = parseInt(query);
    let user;
    // query is a string (username)
    if (isNaN(toNumber)) {
      user = await User.findOne({
        where: {
          username: query,
        },
        attributes: {
          exclude: ['password'],
        },
        include: [
          {
            model: Resource,
            attributes: {
              exclude: ['userId'],
            },
          },
          {
            model: Groups,
            as: 'MemberGroups',
            through: {
              attributes: [],
            },
          },
        ],
      });
    } else {
      // query is a number
      user = await User.findByPk(query, {
        attributes: {
          exclude: ['password'],
        },
        include: [
          {
            model: Resource,
            attributes: {
              exclude: ['userId'],
            },
          },
          {
            model: Groups,
            as: 'MemberGroups',
            through: {
              attributes: [],
            },
          },
        ],
      });
    }

    if (!user) throw new Error('User not found!');
    res.json(user);

    // res.json(user);
  } catch (error) {
    res.status(400).json({ error: error.message || error });
  }
}
/**
 * deletes the current logged in
 * user permanantly
 */
async function destroy(req, res) {
  try {
    const id = req.user.id;

    // get the user
    const user = await User.findByPk(id);

    // destroy the user from db
    await user.destroy();

    res.json({ message: `user ${user.firstname} ${user.lastname} has been removed from the database` })
  } catch (error) {
    res.status(400).json({ error: error.message || error })
  }
}
const controllers = {};
controllers.create = create;
controllers.get = get;
controllers.getUser = getUser;
controllers.update = update;
controllers.getResources = getResources;
controllers.destroy = destroy;
export default controllers;
