import './App.scss';
import { TodoList } from './components/TodoList';

import todosFromServer from './api/todos';
import { Todo } from './types/Todo';
import { useState } from 'react';
import { TodoForm } from './components/TodoForm';
import { getUserById } from './services/userService';

function getNewTodoId(todos: Todo[]) {
  const maxId = Math.max(...todos.map(todo => todo.id));

  return maxId + 1;
}

const initialTodos: Todo[] = todosFromServer.map(todo => ({
  ...todo,
  user: getUserById(todo.userId),
}));

export const App = () => {
  const [todos, setTodos] = useState(initialTodos);

  const addTodo = ({ id, ...data }: Todo) => {
    const newTodo = {
      id: getNewTodoId(todos),
      ...data,
    };

    setTodos(currentTodos => [...currentTodos, newTodo]);
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <TodoForm onAdd={addTodo} />
      <TodoList todos={todos} />
    </div>
  );
};
