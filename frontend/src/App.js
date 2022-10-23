import React from 'react';
import AuthForm from './components/AuthForm/AuthForm';
import Navigation from './components/Navigation/Navigation';
import './App.css';
function App() {
  return (
    <div className='App'>
      <Navigation />
      <div className='appBody'>
        <AuthForm />
      </div>
    </div>
  );
}
export default App;
