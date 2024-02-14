
const mongoose = require('mongoose');
const moment = require('moment');

const userSchema = new mongoose.Schema({
  firstName:{ type: String, required: true },
  lastName:{ type: String, required: true },
  email: { type: String, required: true },
  password:{ type: String, required: true },
  isAdmin: { type: Boolean, default: false },
  timestamp: {
    type: String, 
    default: () => moment().fomat('YYYY-MM-DD HH.mmA'),
  },
}, {
  timestamps: true 
});

const User = mongoose.model('User', userSchema);

module.exports = User;
