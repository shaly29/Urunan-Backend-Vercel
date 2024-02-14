// import jwt from 'jsonwebtoken';
const jwt=require('jsonwebtoken');
const asyncHandler = require('express-async-handler')
// import asyncHandler from 'express-async-handler';
const User =require("../models/userMoel")
// import User from '../schema/userSchema';


const protect = asyncHandler(async (req, res, next) => {
    let token;

    token = req.cookies.jwt;

    if (token) {
        try {
           const decoded = jwt.verify(token, process.env.JWT_SECRET);

           req.user = await User.findById(decoded.userId).select('-password');

           next();
        } catch (error) {
            res.status(401);
            throw new Error('Not authorized, invalid token');

        }
    } else {
        res.status(401);
        throw new Error('Not authorized, no token');
    }
});

module.export= protect
// export { protect };