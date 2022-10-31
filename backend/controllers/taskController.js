import jwt from 'jsonwebtoken';
import Task from '../models/taskModel.js';

const createTask = async function (req, res, next) {
  try {
    if (!req.body.label) {
      return res.status(404).json({
        status: 'bad req',
        mesagge: 'No task label is recived!',
      });
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
    return res.status(404).json({
      status: 'error',
      mesagge: 'Something went wrong!',
    });
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
    console.log('req', req.params.id);
    const task = await Task.findByIdAndUpdate(
      req.params.id,
      { $set: { status: 'compleated' } },
      {
        new: true,
        runValidators: true,
      }
    );
    console.log('task', task);
    if (!task) {
      return res.status(404).json({
        status: 'error',
        mesagge: 'Coud not update!',
      });
    }
    return res.status(204).json({
      status: 'success',
      mesagge: 'Task updated!',
    });
  } catch (err) {
    return res.status(404).json({
      status: 'error',
      mesagge: 'Something went wrong!',
    });
  }
};
const deleteTask = async function (req, res, next) {};

export { createTask, getAllTasks, deleteTask, compleateTask };
