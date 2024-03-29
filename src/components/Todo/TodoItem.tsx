import React from "react";
import { TrashIcon, HeartIcon } from "@heroicons/react/24/outline";
import { HeartIcon as HeartIconSolid } from "@heroicons/react/24/solid";

import Button from "../Button/Button";

import { ITodoItemProps } from "../../model/todo.model";

const TodoItem = ({
  todo,
  onToggleTodo,
  onDeleteTodo,
  onLikeTodo,
}: ITodoItemProps) => {
  const handleToggleTodo = () => {
    onToggleTodo(todo.id);
  };

  const handleDeleteTodo = () => {
    onDeleteTodo(todo.id);
  };

  const handleLikeTodo = () => {
    onLikeTodo(todo.id);
  };

  const renderCompletedIcon = () =>
    !todo.completed ? (
      <svg
        xmlns='http://www.w3.org/2000/svg'
        fill='none'
        viewBox='0 0 24 24'
        strokeWidth='1.5'
        stroke='currentColor'
        className='w-8 h-8'>
        <path
          strokeLinecap='round'
          strokeLinejoin='round'
          d='M21 12a9 9 0 11-18 0 9 9 0 0118 0z'
        />
      </svg>
    ) : (
      <svg
        xmlns='http://www.w3.org/2000/svg'
        fill='none'
        viewBox='0 0 24 24'
        strokeWidth='1.5'
        stroke='currentColor'
        className='w-8 h-8 text-green-500'>
        <path
          strokeLinecap='round'
          strokeLinejoin='round'
          d='M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z'
        />
      </svg>
    );

  const renderLikeIcon = () =>
    todo.like ? (
      <HeartIconSolid
        onClick={handleLikeTodo}
        className='h-6 text-red-600 hover:text-red-500 hover:border-slate-500'
      />
    ) : (
      <HeartIcon
        onClick={handleLikeTodo}
        className={`h-6 border-red-700 hover:text-red-700`}
      />
    );

  return (
    <li className='group flex items-center mb-2 hover:shadow-blue-500/50 hover:shadow-lg px-2 rounded-lg hover:cursor-pointer '>
      <div onClick={handleToggleTodo} className='mr-2'>
        {renderCompletedIcon()}
      </div>
      <span
        className={`flex-1 ${
          todo.completed ? "line-through text-gray-500" : ""
        }`}>
        {todo.text}
      </span>
      {renderLikeIcon()}
      <Button
        onClick={handleDeleteTodo}
        variant=''
        className='bg-transparent opacity-0 group-hover:opacity-100'>
        <TrashIcon className='h-7 w-7 text-red-500  border-red-700 ' />
      </Button>
    </li>
  );
};

export default React.memo(TodoItem);
