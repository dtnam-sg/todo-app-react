import React, { useEffect, useState, useCallback } from "react";
import useLocalStorage from "../../hooks/useLocalStorage";
import { ITodo } from "../../model/todo.model";
import TodoForm from "../../components/Todo/TodoForm";
import TodoList from "../../components/Todo/TodoList";
import Button from "../../components/Button/Button";

const TODO_KEY = "todos";
const PAGE_SIZE = 5;

const Todo = () => {
  const [todos, setTodos] = useLocalStorage<ITodo[]>(TODO_KEY, []);
  const [currentPage, setCurrentPage] = useState(1);

  const addTodo = useCallback(
    (text: string) => {
      const newTodo: ITodo = {
        id: Date.now().toString(),
        text,
        completed: false,
        like: false,
      };
      setTodos((preTodos) => [...preTodos, newTodo]);
    },
    [todos],
  );

  const handleToggleTodo = (id: string) => {
    const updatedTodos = todos.map((todo) => {
      if (todo.id === id) {
        return { ...todo, completed: !todo.completed };
      } else {
        return todo;
      }
    });
    setTodos(updatedTodos);
  };

  const handleDeleteTodo = useCallback(
    (id: string) => {
      setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id));
    },
    [todos],
  );

  const handleToggleLikeTodo = (id: string) => {
    const updatedTodos = todos.map((todo) => {
      if (todo.id === id) {
        return { ...todo, like: !todo.like };
      } else {
        return todo;
      }
    });
    setTodos(updatedTodos);
  };

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  const totalPages = Math.ceil(todos.length / PAGE_SIZE);
  const startIndex = (currentPage - 1) * PAGE_SIZE;
  const endIndex = startIndex + PAGE_SIZE;

  return (
    <div className='font-sans text-xl container shadow-2xl mx-auto mt-8 max-w-xl bg-white p-5 rounded-xl text-center '>
      <h1 className='text-3xl font-bold mb-4 text-green-600 '>Todo List</h1>
      <TodoForm addTodo={addTodo} />
      <TodoList
        todos={todos.slice(startIndex, endIndex)}
        onToggleTodo={handleToggleTodo}
        onDeleteTodo={handleDeleteTodo}
        onLikeTodo={handleToggleLikeTodo}
      />
      <div className='flex justify-center mt-6'>
        {totalPages > 1 &&
          Array.from({ length: totalPages }, (_, index) => (
            <Button
              variant=''
              key={index}
              className={`mx-1 ${
                currentPage === index + 1
                  ? "bg-blue-500 text-white"
                  : "bg-transparent border hover:bg-blue-500 hover:text-white text-slate-700"
              }`}
              onClick={() => handlePageChange(index + 1)}>
              {index + 1}
            </Button>
          ))}
      </div>
    </div>
  );
};

export default Todo;
