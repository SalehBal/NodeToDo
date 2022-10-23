import mongoose from 'mongoose';
import validator from 'validator';
import bcrypt from 'bcrypt';
import crypto from 'crypto';
const userSchema = new mongoose.Schema({
  userName: {
    type: String,
    required: [true, 'User must have user name!'],
  },
  email: {
    type: String,
    required: [true, 'User must have email!'],
    unique: [true, 'Email adress must be unique'],
    lowercase: true,
    validate: [validator.isEmail, 'This is not a valid email!'],
  },
  photo: {
    type: String,
  },
  password: {
    type: String,
    required: [true, 'A user must have password'],
    minlenght: [8, 'Password must be longer than 8 characters'],
    select: false,
  },
  passwordConfirm: {
    type: String,
    required: [true, 'You must confirm your password!'],
    validate: {
      validator: function (val) {
        return val === this.password;
      },
      mesagge: 'Confirm the password!',
    },
  },
});

userSchema.pre('save', async function (next) {
  // Only run this function if password was actually modified
  if (!this.isModified('password')) return next();

  // Hash the password with cost of 12
  this.password = await bcrypt.hash(this.password, 12);

  // Delete passwordConfirm field
  this.passwordConfirm = undefined;
  next();
});
// Password checker
userSchema.methods.correctPassworrd = async function (candidate, real) {
  return await bcrypt.compare(candidate, real);
};

const User = mongoose.model('User', userSchema);
export default User;
