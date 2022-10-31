import mongoose from 'mongoose';

const taskSchema = new mongoose.Schema({
  label: {
    type: String,
    required: [true, 'Please enter a task!'],
  },
  deadline: String,
  createdDate: String,
  status: {
    type: String,
    default: 'new',
  },
  userId: {
    type: String,
    required: true,
  },
});

const Task = mongoose.model('Task', taskSchema);
export default Task;
