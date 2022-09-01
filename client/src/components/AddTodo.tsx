import React, { useState } from 'react';
import styles from '../styles/AddTodo.module.css';
import { useAppDispatch } from '../hooks/hooks';
import { addTodo } from '../store/todos/todosSlice';
import { toast } from 'react-toastify';
import { ITodo } from '../types/todo';
import { createTask } from '../store/tasks/taskSlice';

const AddTodo = () => {
  const dispatch = useAppDispatch();
  const [value, setValue] = useState<string>('');

  const addNewTodo = () => {
    if (!value) {
      toast.error('Add text');
    }
    const newTodo: ITodo = {
      text: value,
    };

    // dispatch(addTodo(newTodo));

    dispatch(createTask(newTodo));

    setValue('');
  };
  return (
    <div className={styles['add-todo']}>
      <input
        className={styles['add-todo__input']}
        placeholder="Add new todo"
        type="text"
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
      <button onClick={addNewTodo} className={styles['add-todo__btn']}>
        Add
      </button>
    </div>
  );
};

export default AddTodo;
