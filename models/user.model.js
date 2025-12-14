// models/user.model.js
const mongoose = require('mongoose');



const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  firstname: { type: String, required: true },
  lastname:  { type: String, required: true },
  email:     { type: String, required: true, unique: true },
  password:  { type: String, required: true },
  major:     { type: String }, // Optional field for student major
  year:      { type: String }, // Optional field for student year
  isAdmin:   { type: Boolean, default: false },
  created:   { type: Date, default: Date.now },
  updated:   { type: Date, default: Date.now }
});

// Hash password before saving
userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (err) {
    next(err);
  }
});

module.exports = mongoose.model('User', userSchema);
