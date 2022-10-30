import css from './TaskItem.module.css';

function TaskItem(params) {
  return (
    <div id={params.taskId} className={css.taskitem}>
      <p>{params.label}</p>
      <p>{params.deadline}</p>
    </div>
  );
}
export default TaskItem;
