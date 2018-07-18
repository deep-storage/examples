import { connect } from "deep-storage-react";
import { History } from "history";
import { Authentication } from "../authentication/index";
import { accountsCreator } from "./Accounts/index";
import Component, { AppProps } from "./component";
import { fullScreenCreator } from "./FullScreen/index";
import { homeCreator } from "./Home/index";
import { loginCreator } from "./Login/index";
import { templateCreator } from "./Template/index";

export const appCreator = async (
  authentication: Authentication,
  history: History
) => {
  const Login = await loginCreator(authentication);

  const FullScreen = await fullScreenCreator();
  const Home = await homeCreator();
  const Accounts = await accountsCreator();
  const Template = await templateCreator(authentication);

  return connect<{}, AppProps>(
    {},
    {
      Login,
      FullScreen,
      Template,
      Home,
      Accounts,
      authentication
    },
    [authentication.storage]
  )(Component);
};
