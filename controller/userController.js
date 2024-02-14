
    const mongoose = require('mongoose');
    const User = require('../models/userMoel.js');
    const jwt = require('jsonwebtoken');
    // const { secretKey } = require('');
    const bcrypt = require('bcrypt');

    const Register = async (req, res) => {
        try {
          const { firstName, lastName, email, password, isAdmin } = req.body;
      
          const existingUser = await User.findOne({ email });
      
          if (existingUser) {
            return res.status(400).json({ error: 'User already registered' });
          }
      
          const hashedPassword = await bcrypt.hash(password, 10);
      
          const user = new User({ firstName, lastName, email, password: hashedPassword, isAdmin });
          await user.save();
      
          const token = jwt.sign({ userId: user._id, email: user.email, isAdmin: user.isAdmin }, secretKey, { expiresIn: '1h' });
      
          res.cookie('token', token, { httpOnly: true, maxAge: 360 });
      
          res.json({ message: 'Register successful', token });
        } catch (error) {
          console.error(error);
          res.status(500).json({ error: 'Internal server error' });
        }
      };
      
      const login = async (req, res) => {
        try {
          const { email, password } = req.body;
      
          // Find the user by email
          const user = await User.findOne({ email });
      
          // If user not found or password incorrect, return error
          if (!user || !(await bcrypt.compare(password, user.password))) {
            return res.status(401).json({ error: 'Invalid email or password' });
          }
      
          // Generate JWT token
          const token = jwt.sign({ userId: user._id, email: user.email, isAdmin: user.isAdmin }, secretKey, { expiresIn: '1h' });
      
          // Send success response with token and isAdmin flag
          return res.json({ isAdmin: user.isAdmin });
        } catch (error) {
          console.error(error);
          res.status(500).json({ error: 'Internal server error' });
        }
      };
      
      
      const logout = async (req, res) => {
        try {
          res.clearCookie('token');
      
          res.json({ message: 'Logout successful' });
        } catch (error) {
          console.error(error);
          res.status(500).json({ error: 'Internal server error' });
        }
      };
      

    //@desc   Get User Profile
//route POST/api/users/profile
//@access Private
    const getAllUsers = async (req, res) => {
      try {
        const users = await User.find();
        res.json(users);
      } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
      }
    };
    
//@desc   Get User Profile
//route POST/api/users/profile
//@access Private

    const getUserById = async (req, res) => {
      try {
        const userId = req.params.id;
    
        if (!mongoose.Types.ObjectId.isValid(userId)) {
          return res.status(400).json({ error: 'Invalid user ID' });
        }
    
        const user = await User.findById(userId);
    
        if (!user) {
          return res.status(404).json({ error: 'User not found' });
        }
    
        res.json(user);
      } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
      }
    };
    //@desc   Update User Profile
//route Put/api/users/profile
//@access Public

    const updateUserById = async (req, res) => {
      try {
        const userId = req.params.id;
    
        if (!mongoose.Types.ObjectId.isValid(userId)) {
          return res.status(400).json({ error: 'Invalid user ID' });
        }
    
        const { firstName, lastName, email } = req.body;
        const updatedFields = {};
    
        if (firstName) updatedFields.firstName = firstName;
        if (lastName) updatedFields.lastName = lastName;
        if (email) updatedFields.email = email;
    
        const updatedUser = await User.findByIdAndUpdate(userId, { $set: updatedFields }, { new: true });
    
        if (!updatedUser) {
          return res.status(404).json({ error: 'User not found' });
        }
    
        res.json({ message: 'User updated successfully', user: updatedUser });
      } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
      }
    };
    
//@desc   Get User Profile
//route POST/api/users/profile
//@access Private

    const createUser = async (req, res) => {
      try {
        const newUser = req.body;
        const createdUser = await User.create(newUser);
        res.json({ user: createdUser });
      } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
      }
    };
    
//@desc   Get User Profile
//route POST/api/users/profile
//@access Private

    const deleteUser = async (req, res) => {
      try {
        const userId = req.params.id;
    
        if (!mongoose.Types.ObjectId.isValid(userId)) {
          return res.status(400).json({ error: 'Invalid user ID' });
        }
    
        const updatedUser = await User.findByIdAndUpdate(userId, { isDeleted: true }, { new: true });
    
        if (!updatedUser) {
          return res.status(404).json({ error: 'User not found' });
        }
    
        res.json({ message: 'User marked as deleted in admin panel', user: updatedUser });
      } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
      }
    };
    
    module.exports = {
        Register,
        login,
        logout,
      getAllUsers,
      getUserById,
      updateUserById,
      createUser,
      deleteUser,

    };
    

// 


   