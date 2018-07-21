import { deepStorage } from "deep-storage";
import { wire } from "deep-storage-react";
import { deepForm } from "deep-storage-react";
import { Authentication } from "../../authentication/index";
import Component from "./component";
import LoginValidator from "./validator";

export interface LoginDeepState {
  lastLoginFailed: boolean;
}

export interface LoginDetails {
  username: string;
  password: string;
}

export const loginCreator = async (authentication: Authentication) => {
  const storage = deepStorage({
    lastLoginFailed: false
  });
  const form = deepForm(new LoginValidator());
  return wire(
    Component,
    {},
    {
      form,
      // adds a prop called 'login' to the component
      login: async () => {
        const { username, password } = form.data();
        const success = await authentication.login(username, password);
        if (success) {
          await form.reset();
          await storage.deep("lastLoginFailed").set(false);
        } else {
          await storage.deep("lastLoginFailed").set(true);
        }
      }
    },
    [form.storage, authentication.storage]
  );
};
