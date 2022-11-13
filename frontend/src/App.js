import React from 'react';
import AuthForm from './components/AuthForm/AuthForm';
import Navigation from './components/Navigation/Navigation';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import TaskPage from './components/TaskPage/TaskPage';
import './App.css';

/*------------------------------------------------------*/

function App() {
  const dispatchFn = useDispatch();
  const loggedIn = useSelector((state) => state.isLoggedIn);
  useEffect(() => {
    const jwt = localStorage.getItem('authJwt');
    const url = `http://localhost:8000/api/users/loginAutomatically`;
    axios.defaults.headers.common['Authorization'] = `Bearer ${jwt}`;
    axios
      .get(url)
      .then((res) => {
        dispatchFn({ type: 'setLoggedIn' });
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div className='App'>
      <Navigation />
      <div className='appBody'>
        {loggedIn || <AuthForm />}
        {loggedIn && <TaskPage />}
      </div>
    </div>
  );
}

export default App;
