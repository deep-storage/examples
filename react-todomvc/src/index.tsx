import * as React from "react";
import * as ReactDOM from "react-dom";

import "todomvc-common/base.css";
import "todomvc-app-css/index.css";

import { deepStorage } from "deep-storage";
import { connect } from "deep-storage-react";

import TodoApp, { TodoAppProps } from "./app";
import { Todos, DeepTodoModel } from "./todoModel";

const storage = deepStorage({
  todos: {}
} as Todos);

const model = new DeepTodoModel(storage);

const DeepTodoApp = connect<{}, TodoAppProps>(
  {},
  { model },
  [model.storage]
)(TodoApp);

ReactDOM.render(<DeepTodoApp />, document.getElementById("root"));
