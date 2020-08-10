import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import TodoReducer from './reducers/todos-reducer';
// import initialState from './initialState';
import reduxThunk from 'redux-thunk'
import reduxSaga from 'redux-saga';

// create redux-saga
const sagaMiddleWare = reduxSaga()

//get state from localStorage
const storageState = window.localStorage.getItem('state');
const initialState = storageState ? JSON.parse(storageState) : undefined;

//create store
const store = createStore(TodoReducer, initialState, composeWithDevTools(
  applyMiddleware(
    reduxThunk,
    // apply saga middleware
    sagaMiddleWare
    )
  )
);

// run saga middlware -it will be listen all action and distpatch them
// sagaMiddleWare.run();

// subscribe function
store.subscribe(() => {
  // get localStorage value
  const state = store.getState();
  // save state to localStorage
  window.localStorage.setItem('state', JSON.stringify(state));
});

export default store;
