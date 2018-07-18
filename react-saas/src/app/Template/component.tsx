import * as React from "react";

import * as classnames from "classnames";
import { RouteProps } from "react-router";
import { Link } from "react-router-dom";
import { NavLink } from "../../components/NavLink";

export interface TemplateProps extends RouteProps {
  logOut: () => void;
}

interface TemplateState {
  menuOpen: boolean;
}

export default class Template extends React.Component<
  TemplateProps,
  TemplateState
> {
  public state = {
    menuOpen: false
  };

  public handleBurgerClick = () => {
    this.setState(prevState => ({
      menuOpen: !prevState.menuOpen
    }));
  };

  public handleBurgerClose = () => {
    this.setState(prevState => ({
      menuOpen: false
    }));
  };

  public handleLogout = () => {
    this.handleBurgerClose();
    this.props.logOut();
  };

  public render() {
    const { location } = this.props;
    return (
      <div>
        <nav className="navbar has-shadow">
          <div className="container">
            <div className="navbar-brand">
              <Link className="navbar-item" to="/">
                Deep Storage
              </Link>
              <div
                onClick={this.handleBurgerClick}
                className={classnames(
                  { ["is-active"]: this.state.menuOpen },
                  "navbar-burger burger"
                )}
                data-target="navMenu"
              >
                <span />
                <span />
                <span />
              </div>
            </div>
            <div
              id="navMenu"
              className={classnames(
                { ["is-active"]: this.state.menuOpen },
                "navbar-menu"
              )}
            >
              <div className="navbar-start">
                <NavLink
                  label="Home"
                  onClick={this.handleBurgerClose}
                  to="/"
                  location={location}
                />
                <NavLink
                  label="Accounts"
                  onClick={this.handleBurgerClose}
                  to="/accounts"
                  location={location}
                />
                <NavLink
                  label="Full Screen"
                  onClick={this.handleBurgerClose}
                  to="/full-screen"
                  location={location}
                />
              </div>
              <div className="navbar-end">
                <div className="navbar-item">
                  <a onClick={this.handleLogout}>Logout</a>
                </div>
              </div>
            </div>
          </div>
        </nav>
        {this.props.children}
      </div>
    );
  }
}
