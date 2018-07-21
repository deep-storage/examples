import * as React from "react";

import * as classnames from "classnames";
import { Location } from "history";
import { Link } from "react-router-dom";

export interface NavLinkProps {
  label: string;
  to: string;
  location?: Location;
  onClick: () => void;
}

export const NavLink = (props: NavLinkProps) => {
  const { label, location, to, onClick } = props;
  return (
    <Link
      onClick={onClick}
      className={classnames("navbar-item", {
        "is-active": location && location.pathname === to
      })}
      to={to}
    >
      {label}
    </Link>
  );
};

export default NavLink;
