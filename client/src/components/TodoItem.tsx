import React, { FC } from 'react';
import { ITodo, ITodoResponse } from '../types/todo';
import { useAppDispatch } from '../hooks/hooks';
import { removeTodo, setCurrentTodo } from '../store/todos/todosSlice';
import { completeTodo } from '../store/todos/todosSlice';
import styles from '../styles/TodoItem.module.css';
import { format } from 'timeago.js';
import { ReactComponent as DeleteIcon } from '../assets/delete.svg';
import { ReactComponent as EditIcon } from '../assets/edit.svg';
import {
  completeTask,
  deleteTask,
  setCurrentTask,
} from '../store/tasks/taskSlice';

interface ITodoItem {
  item: ITodoResponse;
  setOpenModal: (isOpen: boolean) => void;
}

const TodoItem: FC<ITodoItem> = ({ item, setOpenModal }) => {
  const dispatch = useAppDispatch();

  const handleChange = () => {
    dispatch(completeTask(item.id));
  };

  const deleteTodo = (todoId: number) => {
    dispatch(deleteTask(todoId));
  };

  const editTodo = () => {
    setOpenModal(true);
    dispatch(setCurrentTask(item));
  };

  return (
    <div className={styles['todo-item']}>
      <span className={styles.actions}>
        <EditIcon fill='#808080' onClick={() => editTodo()} className={styles.edit} />{' '}
        <DeleteIcon
          fill="#808080"
          onClick={() => deleteTodo(item.id)}
          className={styles.close}
        />
      </span>
      <div className={styles['todo-item__body']}>
        <span className="switcher">
          <input
            className="switcher__check"
            onChange={handleChange}
            type="checkbox"
            checked={item.complete}
            id={String(item.id)}
          />
          <label className="switcher__label" htmlFor={String(item.id)}></label>
        </span>

        <div
          style={
            item.complete
              ? { textDecoration: 'line-through' }
              : { textDecoration: 'none' }
          }
          className={styles['todo-item__heading']}
        >
          {item.text}
        </div>
      </div>
      <div className={styles['todo-item__footer']}>
        <div className={styles['todo-item__created']}>
          {format(item.createdAt)}
        </div>
      </div>
    </div>
  );
};

export default TodoItem;
