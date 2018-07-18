import * as React from "react";

import "bulma/css/bulma.css";
import createBrowserHistory from "history/createBrowserHistory";
import * as ReactDOM from "react-dom";
import MockAuthentication from "./authentication";
import "./index.css";
import registerServiceWorker from "./registerServiceWorker";

const start = async () => {
  const appModule = await import("./app");

  const history = createBrowserHistory();
  const authentication = new MockAuthentication();
  const App = await appModule.appCreator(authentication, history);
  await authentication.start();

  ReactDOM.render(<App />, document.getElementById("root") as HTMLElement);
  registerServiceWorker();
};

start();
