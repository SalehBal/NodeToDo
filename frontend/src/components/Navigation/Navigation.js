import React from 'react';
import css from './Navigation.module.css';
import node from '../../img/node.svg';
import BlankUser from '../../img/blankUser.webp';
function Navigation() {
  function uploadImageHandler() {}
  return (
    <div className={css.navigation}>
      <div>
        <img src={node} alt='Node Logo' />
        <span>NodeToDo</span>
      </div>
      <div>
        <img onClick={uploadImageHandler} src={BlankUser} alt='User' />
      </div>
    </div>
  );
}
export default Navigation;
