/**
 *  controllers for /api/user
 */

import { User } from '../models';

// CREATE A USER
async function create(req, res) {
  try {
    if (!req.body) throw new Error('Request Body Is empty.');

    const { firstname, lastname, username, email, password } = req.body;
    await User.create({ firstname, lastname, username, email, password });
    res.status(200).send('User has been created successfully');
  } catch (error) {
    res.json({ error });
  }
}

// GET USER DETAILS USING 'username'
async function get(req, res) {
  try {
    const username = req.params.username;
    const user = await User.findOne({ where: { username } });
    if (!user) throw new Error('No User Exists by that username');
    res.json(user.toJSON());
  } catch (error) {
    res.status(400).send(error.message);
  }
}

// UPDATE DETAILS EXCEPT username and password,
async function update(req, res) {
  try {
    const { firstname, lastname, username, email } = req.body;
    if (!req.body) throw new Error('Request body is empty');

    const user = await User.findOne({ where: { username } });
    if (!user) throw new Error(`User with username ${username} not found.`);

    await User.update(
      {
        firstname,
        lastname,
        email,
      },
      {
        where: {
          username,
        },
      },
    );

    res.send('User Updated. Except Username and Password');
  } catch (error) {
    res.status(400).send(error.message);
  }
}

const controllers = {};
controllers.create = create;
controllers.get = get;
controllers.update = update;

export default controllers;
