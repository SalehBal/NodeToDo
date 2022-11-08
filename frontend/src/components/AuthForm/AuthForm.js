import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import css from './AuthForm.module.css';
import axios from 'axios';

/*------------------------------------------------------*/

function AuthForm() {
  const [isSignup, setIsSignup] = useState(false);
  const [enteredUserName, setEnteredUserName] = useState('');
  const [enteredEmail, setEnteredEmail] = useState('');
  const [enteredPassword, setEnteredPassword] = useState('');
  const [enteredPasswordConfirm, setEnteredPasswordConfirm] = useState('');
  const dispatchFn = useDispatch();
  // INPUT HANDLERS
  const enteredUserNameHandler = (e) => setEnteredUserName(e.target.value);
  const enteredEmailHandler = (e) => setEnteredEmail(e.target.value);
  const enteredPasswordHandler = (e) => setEnteredPassword(e.target.value);
  const enteredPasswordConfirmHandler = (e) => setEnteredPasswordConfirm(e.target.value);
  // INPUT HANDLERS

  // SIGNUP STATE
  const toogleLogin = () => setIsSignup(false);
  const toogleSignup = () => setIsSignup(true);
  // SIGNUP STATE

  function submitHandler(e) {
    e.preventDefault();
    const data = { email: enteredEmail, password: enteredPassword };
    if (isSignup) {
      data.passwordConfirm = enteredPasswordConfirm;
      data.userName = enteredUserName;
    }
    const url = `http://localhost:8000/api/users/${isSignup ? 'signup' : 'login'}`;
    axios
      .post(url, data)
      .then((res) => {
        dispatchFn({ type: 'setLoggedIn' });
        localStorage.setItem('authJwt', res.data.token);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  return (
    <div className={css.authForm}>
      <div>
        <span onClick={toogleSignup}>Signup</span>
        <span>/</span>
        <span onClick={toogleLogin}>Login</span>
      </div>
      <form onSubmit={submitHandler}>
        {isSignup && <input type='text' placeholder='User name' onChange={enteredUserNameHandler} />}
        <input type='email' placeholder='Email' onChange={enteredEmailHandler} />
        <input type='password' placeholder='Password' onChange={enteredPasswordHandler} />
        {isSignup && <input type='password' placeholder='Confirm password' onChange={enteredPasswordConfirmHandler} />}
        <button type='submit'>Submit</button>
      </form>
    </div>
  );
}
export default AuthForm;
