import User from '../models/UserModel.js';
import { hashPassword, verifyPassword } from '../utils/hashPassword.js';
import generateToken from '../utils/generateToken.js';

const registerUser = async (req, res) => {
  try {
    const { firstName, lastName, email, password } = req.body;

    const existingUser = await User.findOne({ email: email });

    if (existingUser) {
      res.status(400).json({ error: 'User already exists' });
    }

    const passwordHash = await hashPassword(password);

    const newUser = new User({
      firstName,
      lastName,
      email,
      password: passwordHash,
    });

    await newUser.save();

    const token = generateToken({ userId: newUser._id });

    return res.status(201).json({ message: 'User created successfully!', token, user: newUser._id });
  } catch (err) {
    // console.error(err);
    res.status(500).json({ err: 'Internal Server error' });
  }
};

const logIn = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ error: 'User not found' });
    }

    const passwordMatch = await verifyPassword(password, user.password);

    if (!passwordMatch) {
      return res.status(401).json({ error: 'Invalid password' });
    }

    const token = generateToken({ userId: user._id });
    
    return res.status(200).render({ message: 'User logged in', token, user: user._id });
  } catch (error) {
    return res.status(500).json({ error: 'Internal server error' });
  }
};

export default {
  registerUser,
  logIn,
}