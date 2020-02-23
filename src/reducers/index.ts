import bookReducer from './books';
import { combineReducers } from 'redux';

const app = combineReducers({
    bookReducer
});

export default app;
