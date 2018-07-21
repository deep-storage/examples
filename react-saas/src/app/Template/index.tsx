import { wire } from "deep-storage-react";
import { Authentication } from "../../authentication/index";
import Component from "./component";

export const templateCreator = async (authentication: Authentication) => {
  return wire(
    Component,
    {},
    {
      logOut: authentication.logOut
    }
  );
};
