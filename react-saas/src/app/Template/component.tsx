import * as React from 'react';
import { RouteProps } from 'react-router';
import * as classnames from 'classnames';
import { Link } from 'react-router-dom';

interface TemplateProps extends RouteProps {
    logOut: () => void;
}

export default class Template extends React.Component<TemplateProps> {
    render() {
        const { location } = this.props;
        return (
            <div>
                <nav className="navbar has-shadow">
                    <div className="container">
                        <div className="navbar-brand">
                            <Link className="navbar-item" to="/">
                                Deep Storage
                            </Link>
                            <div className="navbar-burger burger" data-target="navMenu">
                                <span />
                                <span />
                                <span />
                            </div>
                        </div>
                        <div id="navMenu" className="navbar-menu">
                            <div className="navbar-start">
                                <div className="navbar-item">
                                    <Link
                                        className={
                                            classnames({
                                                'is-active': location && location.pathname === '/'
                                            })
                                        }
                                        to="/"
                                    >
                                        Home
                                    </Link>
                                </div>
                                <div className="navbar-item">
                                    <Link
                                        className={
                                            classnames({
                                                'is-active': location && location.pathname === '/'
                                            })
                                        }
                                        to="/accounts"
                                    >
                                        Accounts
                                    </Link>
                                </div>
                                <div className="navbar-item">
                                    <Link
                                        to="/full-screen"
                                    >
                                        Full Screen
                                    </Link>
                                </div>
                            </div>
                            <div className="navbar-end">
                                <div className="navbar-item">
                                    <a onClick={this.props.logOut}>
                                        Logout
                                    </a>
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
