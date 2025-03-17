const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const UserSchema = new mongoose.Schema({
  employeeNumber: { type: String, required: true, unique: true }, // Employee number (primary key)
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phoneNumber: { type: String, required: true }, // Phone number
  password: { type: String, required: true },
  role: { type: String, enum: ['employee', 'hr_manager', 'system_admin'], default: 'employee' },
});

// Hash password before saving
UserSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next(); // Only hash if the password is modified
  this.password = await bcrypt.hash(this.password, 10); // Hash the password
  next();
});

module.exports = mongoose.model('User', UserSchema);