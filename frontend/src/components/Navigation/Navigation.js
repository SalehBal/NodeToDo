import React from 'react';
import css from './Navigation.module.css';
import node from '../../img/node.svg';
function Navigation() {
  return (
    <div className={css.navigation}>
      <div>
        <img src={node} alt='Node Logo' />
        <span>NodeToDo</span>
      </div>
    </div>
  );
}
export default Navigation;
