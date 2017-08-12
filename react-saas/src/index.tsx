import * as React from 'react';
import * as ReactDOM from 'react-dom';
import AppCreator from './app';
import registerServiceWorker from './registerServiceWorker';
import './index.css';
import 'bulma/css/bulma.css';
import deepStorage from 'deep-storage';
import MockAuthentication from './authentication';
import createBrowserHistory from 'history/createBrowserHistory';

const storage = deepStorage({
});

const history = createBrowserHistory();
const authentication = new MockAuthentication(storage.deep('authentication'));
const app = new AppCreator(storage.deep('app'), authentication, history);

authentication.start();

ReactDOM.render(
  <app.component />,
  document.getElementById('root') as HTMLElement
);
registerServiceWorker();
