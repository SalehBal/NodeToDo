import { createStore } from 'redux';

const initialState = {
  isLoggedIn: false,
  refreshList: false,
};

const authReducer = (state = initialState, action) => {
  if (action.type === 'setLoggedIn') {
    return {
      isLoggedIn: true,
    };
  }
  return state;
};

const store = createStore(authReducer);

export default store;
