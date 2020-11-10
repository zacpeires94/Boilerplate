import { createStore, applyMiddleware, combineReducers } from 'redux';
import user from './user';
import thunkMiddleware from 'redux-thunk';
import { createLogger } from 'redux-logger';

// const reducer = combineReducers({user, exampleReducer});

const store = createStore(user, applyMiddleware(thunkMiddleware, createLogger()));

export default store
export * from './user';

