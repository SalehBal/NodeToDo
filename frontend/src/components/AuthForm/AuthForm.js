import React, { useState, useRef } from 'react';
import { useDispatch } from 'react-redux';
import css from './AuthForm.module.css';
import axios from 'axios';

/*------------------------------------------------------*/

function AuthForm() {
  const [isSignup, setIsSignup] = useState(false);
  const userNameRef = useRef('');
  const emailRef = useRef('');
  const passwordRef = useRef('');
  const passwordConfirmRef = useRef('');
  const dispatchFn = useDispatch();

  const toogleLogin = () => setIsSignup(false);
  const toogleSignup = () => setIsSignup(true);

  function submitHandler(e) {
    e.preventDefault();
    const data = { email: emailRef.current.value, password: passwordRef.current.value };
    if (isSignup) {
      data.passwordConfirm = passwordConfirmRef.current.value;
      data.userName = userNameRef.current.value;
    }
    const url = `http://localhost:8000/api/users/${isSignup ? 'signup' : 'login'}`;
    axios.post(url, data).then((res) => {
      dispatchFn({ type: 'setLoggedIn' });
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
        {isSignup && <input type='text' placeholder='User name' ref={userNameRef} />}
        <input type='email' placeholder='Email' ref={emailRef} />
        <input type='password' placeholder='Password' ref={passwordRef} />
        {isSignup && <input type='password' placeholder='Confirm password' ref={passwordConfirmRef} />}
        <button type='submit'>Submit</button>
      </form>
    </div>
  );
}
export default AuthForm;
