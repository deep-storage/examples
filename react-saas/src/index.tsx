import * as React from 'react';
import * as ReactDOM from 'react-dom';
import registerServiceWorker from './registerServiceWorker';
import './index.css';
import 'bulma/css/bulma.css';
import deepStorage from 'deep-storage';
import MockAuthentication from './authentication';
import createBrowserHistory from 'history/createBrowserHistory';

const start = async () => {
  const storage = deepStorage({
  });

  const appModule = await import('./app');

  const history = createBrowserHistory();
  const authentication = new MockAuthentication(storage.deep('authentication'));
  const app = new appModule.AppCreator(storage.deep('app'), authentication, history);
  await authentication.start();

  const App = await app.component();
  ReactDOM.render(
    <App />,
    document.getElementById('root') as HTMLElement
  );
  registerServiceWorker();
};

start();