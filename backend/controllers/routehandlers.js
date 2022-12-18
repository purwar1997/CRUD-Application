const bcrypt = require('bcryptjs');
const User = require('../models/user');

exports.home = (req, res) => {
  res.status(201).send("<h1 style='text-align: center'>CRUD App</h1>");
};

exports.getUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.status(201).json({ users: users });
  } catch (error) {
    res.status(401).json({
      success: false,
      message: 'Cannot fetch users',
    });
  }
};

exports.createUser = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    if (!(username && email && password)) {
      throw new Error('Please enter all the details');
    }

    if (
      !(
        email.endsWith('@gmail.com') ||
        email.endsWith('@hotmail.com') ||
        email.endsWith('@outlook.com')
      )
    ) {
      throw new Error('Email is not in correct format');
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({ username, email, password: hashedPassword });
    res.status(201).json(newUser);
  } catch (error) {
    res.status(401).json({
      success: false,
      message: error.message,
    });
  }
};

exports.getUser = async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      throw new Error('Please enter email to get user data');
    }

    if (
      !(
        email.endsWith('@gmail.com') ||
        email.endsWith('@hotmail.com') ||
        email.endsWith('@outlook.com')
      )
    ) {
      throw new Error('Email should be in correct format');
    }

    const user = await User.findOne({ email });
    res.status(201).json(user);
  } catch (error) {
    res.status(401).json({
      success: false,
      message: error.message,
    });
  }
};

exports.editUser = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    if (!(username && email && password)) {
      throw new Error('Please enter all the details');
    }

    if (
      !(
        email.endsWith('@gmail.com') ||
        email.endsWith('@hotmail.com') ||
        email.endsWith('@outlook.com')
      )
    ) {
      throw new Error('Email should be in correct format');
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await User.findByIdAndUpdate(req.params.userId, { username, email, password: hashedPassword });

    const updatedUser = await User.findById(req.params.userId);
    res.status(201).json(updatedUser);
  } catch (error) {
    res.status(401).json({
      success: false,
      message: error.message,
    });
  }
};

exports.deleteUser = async (req, res) => {
  try {
    const deletedUser = await User.findByIdAndDelete(req.params.userId);
    res.status(201).json({
      success: true,
      message: 'User has been deleted',
    });
  } catch (error) {
    res.status(401).json({
      success: false,
      message: 'Cannot delete user',
    });
  }
};
