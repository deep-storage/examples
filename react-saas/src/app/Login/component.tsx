import * as React from "react";

import { DeepForm } from "deep-storage-react";
import glamorous from "glamorous";
import { TextField } from "../../components/TextField/index";
import { LoginDeepState, LoginDetails } from "./index";

const HintDiv = glamorous.div({ marginTop: "1em" });

const BrandDiv = glamorous.div({
  display: "flex",
  flexFlow: "column",
  alignItems: "center",
  justifyContent: "center",
  marginBottom: "1em"
});

export interface LoginProps extends LoginDeepState {
  login: () => void;
  form: DeepForm<LoginDetails>;
}

export default class Login extends React.Component<LoginProps> {
  public handleLoginClick = () => {
    this.props.login();
  };

  public render() {
    const { form } = this.props;
    return (
      <div className="columns">
        <div
          className="column is-4 is-offset-4"
          style={{ padding: "10vh 2em 0 2em" }}
        >
          <BrandDiv>
            <h2 className="title is-2">Deep Storage</h2>
            <h4 className="subtitle is-4">Sample Application</h4>
          </BrandDiv>
          {this.props.lastLoginFailed ? (
            <article className="message is-danger">
              <div className="message-body">Login failed, please try again</div>
            </article>
          ) : null}
          <TextField label="Username" name="username" form={form} />
          <TextField
            label="Password"
            name="password"
            form={form}
            type="password"
          />
          <button onClick={this.handleLoginClick} className="button">
            Log in
          </button>
          <HintDiv>
            <article className="message is-success">
              <div className="message-body">Hint: try admin / admin</div>
            </article>
          </HintDiv>
        </div>
      </div>
    );
  }
}
