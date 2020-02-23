import React from 'react';
import { Provider } from 'react-redux';
import configureStore from './store';
import { Router } from 'react-router';
import Routes from './routes';
import history from './store/history';

class App extends React.Component {
  render() {
    return (
      <Provider store={configureStore({})}>
        <Router history={history}>
          <Routes />
        </Router>
      </Provider>
    )
  }
}

export default App;
