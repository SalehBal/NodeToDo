import css from './TaskItem.module.css';
import { ReactComponent as Check } from '../../img/check.svg';
import { ReactComponent as Fail } from '../../img/fail.svg';
import axios from 'axios';
import variables from '../../config';

function TaskItem(params) {
  function checkHandler(e) {
    const taskid = e.target.closest('div').getAttribute('id');
    console.log(e.target.closest('div'));
    const url = `${variables.url}/tasks/taskdone/${taskid}`;
    axios.patch(url).then(() => {
      params.refresList();
    });
  }
  function failHandler(e) {
    const taskid = e.target.closest('div').getAttribute('id');
    const url = `${variables.url}/tasks/taskfail/${taskid}`;
    axios.patch(url).then(() => {
      params.refresList();
    });
  }
  return (
    <div id={params.taskId} className={css.taskitem}>
      <p>{params.label}</p>
      <p>{params.deadline}</p>
      <span>
        <button onClick={failHandler}>
          <Fail />
        </button>
        <button onClick={checkHandler}>
          <Check />
        </button>
      </span>
    </div>
  );
}
export default TaskItem;
