/**
 *  controllers for /api/user
 */

import 'dotenv/config';
import { User, Resource, Like } from '../models';
import bcrypt from 'bcryptjs';
import { Op } from 'sequelize';

// CREATE A USER
async function create(req, res) {
  try {
    let { firstname, lastname, username, email, password } = req.body;

    const salt = await bcrypt.genSalt(parseInt(process.env.SALT_ROUNDS));
    password = await bcrypt.hash(password, salt);

    await User.create({ firstname, lastname, username, email, password });
    res.status(200).json({ messge: 'User has been created successfully' });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      error: error.message || error.errors[0].message || error,
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
    res.status(400).json({ error: error.message || error.errors[0].message || error });
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
    res.status(400).json({ error: error.message || error.errors[0].message || error });
  }
}

// GET ONLY USER's RESOURCES
async function getResources(req, res) {
  try {
    const list = await Resource.findAll({
      where: {
        userId: req.user.id
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
    res.status(400).json({ error: error.message || error.errors[0].message });
  }
}
const controllers = {};
controllers.create = create;
controllers.get = get;
controllers.update = update;
controllers.getResources = getResources;
export default controllers;
