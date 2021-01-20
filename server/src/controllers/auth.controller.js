/**
 *      controllers for /api/user/auth
 */
import jwt from 'jsonwebtoken';
import 'dotenv/config';

// giving token to the authenticated user.
async function giveToken(req, res) {
  try {
    const user = { username: req.user.username, email: req.user.email, id: req.user.id };
    const encoded = jwt.sign(user, process.env.JWT_SECRET_DEV, { expiresIn: process.env.JWT_EXPIRY });
    req.user.token = encoded;

    res.json(req.user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

const controllers = {};
controllers.giveToken = giveToken;

export default controllers;
