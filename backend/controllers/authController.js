import User from '../models/userModel.js';
import jwt from 'jsonwebtoken';
import { promisify } from 'util';

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
    // IF EVRYHING IS OK SEND TOKEN

    const token = signToken(user._id);
    res.status(200).json({
      status: 'sucess',
      token,
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      err,
    });
  }
};

const protect = async function (req, res, next) {
  try {
    // get token and check if it exists
    let token;
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
      token = req.headers.authorization.split(' ')[1];
    } else {
      return res.status(401).json({
        status: 'fail',
        error: 'You are not logged in!',
      });
    }

    // validate token

    const decoded = await promisify(jwt.verify)(token, process.env.JWTSECRET);

    // check if user exists

    const freshUser = await User.findById(decoded.id);

    if (!freshUser) {
      return res.status(401).json({
        status: 'fail',
        error: 'You are not logged in!',
      });
    }
    next();
  } catch (err) {}
};

const forgotPassword = async function (req, res, next) {};
const resetPassword = async function (req, res, next) {};

export { signup, login, forgotPassword, resetPassword, protect };
