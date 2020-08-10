import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import TodoReducer from './reducers/todos-reducer';
import reduxThunk from 'redux-thunk'
import reduxSaga from 'redux-saga';

const sagaMiddleWare = reduxSaga()

const storageState = window.localStorage.getItem('state');
const initialState = storageState ? JSON.parse(storageState) : undefined;

const store = createStore(TodoReducer, initialState, composeWithDevTools(
  applyMiddleware(
    reduxThunk,
    sagaMiddleWare
    )
  )
);

store.subscribe(() => {
  const state = store.getState();
  window.localStorage.setItem('state', JSON.stringify(state));
});

export default store;
