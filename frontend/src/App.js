import React from 'react';
import AuthForm from './components/AuthForm/AuthForm';
import Navigation from './components/Navigation/Navigation';
import { useSelector } from 'react-redux';
import './App.css';

/*------------------------------------------------------*/

function App() {
  const loggedIn = useSelector((state) => state.isLoggedIn);
  return (
    <div className='App'>
      <Navigation />
      <div className='appBody'>{!loggedIn && <AuthForm />}</div>
    </div>
  );
}
export default App;
