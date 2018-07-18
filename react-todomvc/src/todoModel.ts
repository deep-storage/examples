import { DeepStorage } from "deep-storage";

const uuidv4 = require("uuid/v4");

export interface Todo {
  completed: boolean;
  title: string;
  id: string;
  timestamp: number;
}

export interface Todos {
  todos: { [key: string]: Todo };
}

export interface TodoModel {
  addTodo(title: string): void;
  toggleAll(checked: boolean): void;
  toggle(todoId: string): void;
  destroy(todoId: string): void;
  save(todoId: string, title: string): void;
  clearCompleted(): void;
  todos: { [key: string]: Todo };
}

export class DeepTodoModel implements TodoModel {
  constructor(public storage: DeepStorage<Todos>) {}
  get todos() {
    return this.storage.state.todos;
  }
  addTodo(title: string) {
    this.storage.deep("todos").update(todos => {
      const id = uuidv4();
      return {
        ...todos,
        [id]: {
          id,
          title,
          completed: false,
          timestamp: Date.now()
        }
      };
    });
  }
  toggleAll(checked: boolean) {
    this.storage.deep("todos").update(todos => {
      const result: { [key: string]: Todo } = {};
      for (let id in todos) {
        result[id] = { ...todos[id], completed: checked };
      }
      return result;
    });
  }
  toggle(todoId: string) {
    this.storage
      .deep("todos")
      .deep(todoId)
      .deep("completed")
      .update(completed => {
        return !completed;
      });
  }
  destroy(todoId: string) {
    this.storage.deep("todos").update(todos => {
      const result = { ...todos };
      delete result[todoId];
      return result;
    });
  }
  save(todoId: string, title: string) {
    this.storage
      .deep("todos")
      .deep(todoId)
      .deep("title")
      .set(title);
  }
  clearCompleted() {
    this.storage.deep("todos").update(todos => {
      const result = { ...todos };
      for (let key in result) {
        if (result[key].completed) {
          delete result[key];
        }
      }
      return result;
    });
  }
}
