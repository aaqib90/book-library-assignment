import { createStore } from 'redux';
import reducer from '../reducers';
import createMiddleware from './middleware';
import history from './history';
export default function configureStore(initialState: any) {
  const middleware = createMiddleware(history);
  return createStore(reducer, initialState, middleware);
}
