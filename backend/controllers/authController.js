import User from '../models/userModel.js';
import jwt from 'jsonwebtoken';

function signToken(id) {
  return jwt.sign({ id }, process.env.JWTSECRET, {
    expiresIn: process.env.JWTEXPIRESIN,
  });
}

const signup = async function (req, res, next) {
  try {
    const newUser = await User.create({
      email: req.body.email,
      password: req.body.password,
      userName: req.body.userName,
      passwordConfirm: req.body.passwordConfirm,
    });
    const token = signToken(newUser._id);
    res.cookie('jwt', token, {
      expires: new Date(Date.now() + process.env.JWTCOOKIEEXPIRESIN * 24 * 60 * 60 * 1000),
      httpOnly: true,
    });
    newUser.password = undefined;
    newUser.passwordConfirm = undefined;
    res.status(201).json({
      status: 'sucess',
      token,
      data: { newUser },
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      err,
    });
  }
};
const login = async function (req, res, next) {
  try {
    const { email, password } = req.body;
    // CHECK IF THERE IS EMAIL OR PASSWORD
    if (!email || !password) {
      return res.status(400).json({
        status: 'bad req',
        mesagge: 'Please provide email or password!',
      });
    }
    // CHECK IF USEREXISTS && PASSWORD IS CORRECT
    const user = await User.findOne({ email }).select('+password');

    if (!user || !(await user.correctPassworrd(password, user.password))) {
      res.status(401).json({
        status: 'fail',
        mesagge: 'Incorrect email or password!',
      });
    }
    // IF EVRYHING IS OK SEND TOKEN TO

    const token = signToken(user._id);
    res.cookie('jwt', token, {
      expires: new Date(Date.now() + process.env.JWTCOOKIEEXPIRESIN * 24 * 60 * 60 * 1000),
      httpOnly: true,
    });
    res.status(201).json({
      status: 'sucess',
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      err,
    });
  }
};

const forgotPassword = async function (req, res, next) {};
const resetPassword = async function (req, res, next) {};

export { signup, login, forgotPassword, resetPassword };
