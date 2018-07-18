import * as React from "react";

import "bulma/css/bulma.css";
import * as ReactDOM from "react-dom";
import MockAuthentication from "./authentication";
import "./index.css";
import registerServiceWorker from "./registerServiceWorker";

const start = async () => {
  const appModule = await import("./app");

  const authentication = new MockAuthentication();
  const App = await appModule.appCreator(authentication);
  await authentication.start();

  ReactDOM.render(<App />, document.getElementById("root") as HTMLElement);
  registerServiceWorker();
};

start();
