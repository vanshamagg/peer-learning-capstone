/**
 *  controllers for /api/user
 */

import 'dotenv/config';
import { User, Resource, Like, Groups } from '../models';
import bcrypt from 'bcryptjs';

// CREATE A USER
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

    await User.create({
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
    const username = req.user.username;
    const user = await User.findOne({
      where: { username },
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

// UPDATE DETAILS EXCEPT username, email, password,
async function update(req, res) {
  try {
    const { firstname, lastname } = req.body;
    if (!req.body) throw new Error('Request body is empty');

    const user = await User.findOne({ where: { username: req.user.username } });
    if (!user) throw new Error(`User with username ${username} not found.`);

    await User.update(
      {
        firstname,
        lastname,
      },
      {
        where: {
          username: req.user.username,
        },
      },
    );

    res.send({ message: 'user updated except username, email, password' });
  } catch (error) {
    res.status(400).json({ error: error.message || error });
  }
}

// GET ONLY USER's RESOURCES
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

const controllers = {};
controllers.create = create;
controllers.get = get;
controllers.getUser = getUser;
controllers.update = update;
controllers.getResources = getResources;
export default controllers;
