const bcrypt = require('bcryptjs');
const User = require('../models/user');

exports.home = (req, res) => {
  res.status(201).send("<h1 style='text-align: center'>CRUD App</h1>");
};

exports.getUsers = async (req, res) => {
  try {
    const users = await User.find();

    res.status(201).json({
      success: true,
      message: 'All the users have been successfully fetched',
      users,
    });
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
      throw new Error('Email should be in correct format');
    }

    if (password < 6) {
      throw new Error('Password should be atleast 6 characters long');
    }

    const user = await User.findOne({ email });

    if (user) {
      throw new Error('User already exists');
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({ username, email, password, hashedPassword });
    newUser.hashedPassword = undefined;

    res.status(201).json({
      success: true,
      message: 'User created successfully',
      newUser,
    });
  } catch (error) {
    res.status(401).json({
      success: false,
      message: error.message,
    });
  }
};

exports.getUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.userId);
    user.hashedPassword = undefined;

    res.status(201).json({
      success: true,
      message: 'User fetched successfully',
      user,
    });
  } catch (error) {
    res.status(401).json({
      success: false,
      message: 'Cannot fetch user',
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

    if (password < 6) {
      throw new Error('Password should be atleast 6 characters long');
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await User.findByIdAndUpdate(req.params.userId, { username, email, password, hashedPassword });
    const updatedUser = await User.findById(req.params.userId);
    updatedUser.hashedPassword = undefined;

    res.status(201).json({
      success: true,
      message: 'User updated successfully',
      updatedUser,
    });
  } catch (error) {
    res.status(401).json({
      success: false,
      message: error.message,
    });
  }
};

exports.deleteUser = async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.userId);

    res.status(201).json({
      success: true,
      message: 'User deleted successfully',
    });
  } catch (error) {
    res.status(401).json({
      success: false,
      message: 'Cannot delete user',
    });
  }
};
