import React, { useState } from 'react';
import css from './TaskForm.module.css';
import { ReactComponent as Check } from '../../img/check.svg';
import axios from 'axios';
import variables from '../../config';

function TaskForm(props) {
  const [taskLabel, setTaskLabel] = useState('');
  const [taskDeadline, setTaskDeadline] = useState('');
  const labelChangeHandler = (e) => setTaskLabel(e.target.value);
  const deadlineChangeHandler = (e) => setTaskDeadline(e.target.value);
  function submitHandler(e) {
    e.preventDefault();
    const url = `${variables.url}/tasks`;
    const data = {};
    data.label = taskLabel;
    data.deadline = taskDeadline;
    axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('authJwt')}`;
    // if (!data.deadline || !data.label) return
    axios.post(url, data).then((res) => {
      props.refresList();
      setTaskDeadline('');
      setTaskLabel('');
    });
  }

  return (
    <form onSubmit={submitHandler} className={css.form}>
      <input type='text' value={taskLabel} onChange={labelChangeHandler} />
      <input type='date' value={taskDeadline} onChange={deadlineChangeHandler} />
      <button type='submit'>
        <Check />
      </button>
    </form>
  );
}

export default TaskForm;
