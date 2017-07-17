import * as React from 'react';
import * as ReactDOM from 'react-dom';

import 'todomvc-common/base.css';
import 'todomvc-app-css/index.css';

import { DeepStorage, Path, Subscription } from 'deep-storage';
import { deep } from 'deep-storage-react';

import TodoApp from './app';
import { Todos, DeepTodoModel } from "./todoModel";

const storage = new DeepStorage({
    todos: {}
} as Todos);

const model = new DeepTodoModel(storage);

const DeepTodoApp = deep(storage, { todos: ['todos'] })(TodoApp);

ReactDOM.render(
    (<DeepTodoApp model={model} />)
    , document.getElementById('root'));
