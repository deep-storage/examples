import * as React from "react";

import { RouteProps } from "react-router";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { Authentication } from "../authentication/index";

export interface AppProps {
  authentication: Authentication;
  Login: React.ComponentType<{}>;
  Home: React.ComponentType;
  FullScreen: React.ComponentType;
  Template: React.ComponentType;
  Accounts: React.ComponentType;
}

const InApp = (props: AppProps & RouteProps) => (
  <props.Template {...props}>
    <Switch>
      <Route path="/" exact={true} component={props.Home} />
      <Route path="/accounts" exact={true} component={props.Accounts} />
    </Switch>
  </props.Template>
);

// tslint:disable-next-line:max-classes-per-file
export default class App extends React.Component<AppProps> {
  // storing InApp as an instance variable so that it's cached
  public InApp = (props: RouteProps) => <InApp {...props} {...this.props} />;

  public render() {
    // wait for authentication to start because it'll tell us
    // whether we're logged in or not
    if (!this.props.authentication.started) {
      return null;
    }
    return (
      <BrowserRouter>
        <div>
          {this.props.authentication.loggedIn ? (
            <Switch>
              <Route
                path="/full-screen"
                exact={true}
                component={this.props.FullScreen}
              />
              <Route component={this.InApp} />
            </Switch>
          ) : (
            <Route component={this.props.Login} />
          )}
        </div>
      </BrowserRouter>
    );
  }
}
