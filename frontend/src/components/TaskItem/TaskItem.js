import css from './TaskItem.module.css';
import { ReactComponent as Check } from '../../img/check.svg';
import axios from 'axios';
import variables from '../../config';

function TaskItem(params) {
  function checkHandler(e) {
    const taskid = e.target.closest('div').getAttribute('id');
    const url = `${variables.url}/tasks/${taskid}`;
    axios.post(url).then(() => {
      params.refresList();
    });
  }
  return (
    <div id={params.taskId} className={css.taskitem}>
      <p>{params.label}</p>
      <p>{params.deadline}</p>
      <button onClick={checkHandler}>
        <Check />
      </button>
    </div>
  );
}
export default TaskItem;
