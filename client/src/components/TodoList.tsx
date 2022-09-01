import React, { useState, useEffect } from 'react';
import TodoItem from './TodoItem';
import { toast } from 'react-toastify';
import styles from '../styles/TodoList.module.css';
import { useAppSelector, useAppDispatch } from '../hooks/hooks';
import { editTodo } from '../store/todos/todosSlice';
import Modal from './UI/Modal';

import { ITodo, ITodoResponse } from '../types/todo';
import { getTasks, updateTask } from '../store/tasks/taskSlice';
import Loader from './Loader';

const TodoList = () => {
  const dispatch = useAppDispatch();
  const { isLoading, tasks } = useAppSelector((state) => state.tasks);
  const [isVisibleModal, setIsVisibleModal] = useState(false);
  const { currentTask } = useAppSelector((state) => state.tasks);

  const [value, setValue] = useState<string>('');

  useEffect(() => {
    dispatch(getTasks());
    const newText = currentTask?.text || '';
    setValue(newText);
  }, [currentTask, dispatch]);

  const editCurrentTodo = () => {
    if (currentTask) {
      if (!value) {
        toast.error('Add text');
        return;
      }

      dispatch(updateTask({ taskId: currentTask.id, text: value }));
      setIsVisibleModal(false);
    }
  };

  if (isLoading) {
    return <Loader width={60} height={60} />;
  }

  if (!tasks.length) {
    return <p className={styles['todo-list__none']}>No todos yet</p>;
  }

  return (
    <div className={styles['todo-list']}>
      <Modal visible={isVisibleModal} setVisible={setIsVisibleModal}>
        <div className="edit-todo">
          <input
            className="edit-todo__input"
            value={value}
            type="text"
            onChange={(e) => setValue(e.target.value)}
          />
          <button className="edit-todo__btn" onClick={() => editCurrentTodo()}>
            Edit
          </button>
        </div>
      </Modal>

      {tasks.map((todo: ITodoResponse) => (
        <TodoItem setOpenModal={setIsVisibleModal} key={todo.id} item={todo} />
      ))}
    </div>
  );
};

export default TodoList;
