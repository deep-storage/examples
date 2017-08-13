import * as React from 'react';
import { Link } from 'react-router-dom';
import * as classnames from 'classnames';
import { Location } from 'history';

export interface NavLinkProps {
    label: string;
    to: string;
    location?: Location;
    onClick: () => void;
}

export const NavLink = (props: NavLinkProps) => {
    const { label, location, to, onClick } = props;
    return (
        <div className="navbar-item">
            <Link
                onClick={onClick}
                className={
                    classnames({
                        'is-active': location && location.pathname === to
                    })
                }
                to={to}
            >
                {label}
            </Link>
        </div>
    );
};

export default NavLink;