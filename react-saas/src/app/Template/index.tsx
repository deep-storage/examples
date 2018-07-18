import { connect } from "deep-storage-react";
import { Authentication } from "../../authentication/index";
import Component, { TemplateProps } from "./component";

export const templateCreator = async (authentication: Authentication) => {
  return connect<{}, TemplateProps>(
    {},
    {
      logOut: authentication.logOut
    }
  )(Component);
};
