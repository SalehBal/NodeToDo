import React from 'react';
import TaskForm from '../TaskForm/TaskForm';
import axios from 'axios';
import variables from '../../config';
import { useState, useEffect } from 'react';
import TaskItem from '../TaskItem/TaskItem';
import css from './taskPage.module.css';
function TaskPage() {
  const [taskList, setTaskList] = useState([]);
  function getAllTasks() {
    const url = `${variables.url}/tasks`;
    axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('authJwt')}`;
    axios.get(url).then((res) => {
      console.log('res', res);
      setTaskList(res.data.tasks);
    });
  }
  useEffect(() => {
    getAllTasks();
  }, []);
  return (
    <div>
      <TaskForm refresList={getAllTasks} />
      <div className={css.taskList}>
        {taskList.map((task) => (
          <TaskItem label={task.label} key={task._id} deadline={task.deadline} taskId={task._id} />
        ))}
      </div>
    </div>
  );
}

export default TaskPage;
