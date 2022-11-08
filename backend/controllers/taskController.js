import jwt from 'jsonwebtoken';
import Task from '../models/taskModel.js';
import AppError from '../utils/appError.js';

const createTask = async function (req, res, next) {
  try {
    if (!req.body.label) {
      return next(new AppError('Please provide label!', 400));
    }

    const token = req.headers.authorization.split(' ')[1];
    const decoded = jwt.verify(token, process.env.JWTSECRET);

    const newTask = await Task.create({
      label: req.body.label,
      deadline: req.body.deadline,
      userId: decoded.id,
    });

    res.status(201).json({
      status: 'success',
      task: newTask,
    });
  } catch (err) {
    return next(new AppError('Something went wrong!', 400));
  }
};

const getAllTasks = async function (req, res, next) {
  try {
    const token = req.headers.authorization.split(' ')[1];
    const decoded = jwt.verify(token, process.env.JWTSECRET);
    const tasks = await Task.find({ userId: decoded.id, status: 'new' });
    res.status(200).json({
      status: 'success',
      tasks,
    });
  } catch (err) {
    return res.status(404).json({
      status: 'error',
      mesagge: 'Something went wrong!',
    });
  }
};

const compleateTask = async function (req, res, next) {
  try {
    const task = await Task.findByIdAndUpdate(
      req.params.id,
      { status: 'done' },
      {
        new: true,
        runValidators: true,
      }
    );
    if (!task) {
      return res.status(404).json({
        status: 'error',
        mesagge: 'Coud not update!',
      });
    }
    return res.status(204).json({
      status: 'success',
      mesagge: 'Task updated!',
      task,
    });
  } catch (err) {
    return res.status(404).json({
      status: 'error',
      mesagge: 'Something went wrong!',
    });
  }
};

const failTask = async function (req, res, next) {
  console.log(req.params);
  try {
    const task = await Task.findByIdAndUpdate(
      req.params.id,
      { status: 'fail' },
      {
        new: true,
        runValidators: true,
      }
    );
    console.log('task', task);
    if (!task) {
      return next(new AppError('No task found!', 404));
    }
    return res.status(204).json({
      status: 'success',
      mesagge: 'Task updated!',
      task,
    });
  } catch (err) {
    return next(new AppError('Something went wrong!', 400));
  }
};
const deleteTask = async function (req, res, next) {};

export { createTask, getAllTasks, deleteTask, compleateTask, failTask };
