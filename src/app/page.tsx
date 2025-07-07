'use client';
import { useState, useEffect, useMemo } from 'react';
import { ColumnHOC } from '../components/ColumnHOC/ColumnHOC';
import { InputHOC } from '../components/TodoInputHOC/TodoInputHOC';
import { ButtonHOC } from '../components/ButtonHOC/ButtonHOC';
import { ModalHOC } from '../components/ModalHOC/ModalHOC';
import { TasksStoreProvider, useTasksStore } from '../context/TasksStoreContext';
import styles from './page.module.scss';

type TaskStatus = 'to do' | 'in progress' | 'done';
interface Task {
  id: string;
  title: string;
  status: 'to do' | 'in progress' | 'done';
}

const TodoPageContent = () => {
  const [inputValue, setInputValue] = useState('');
  const tasksStore = useTasksStore();
  const statusList = useMemo(() => ['to do', 'in progress', 'done'], []);

  useEffect(() => {
    try {
      const storedTasks = localStorage.getItem('tasks');
      if (storedTasks) {
        const parsedTasks: Task[] = JSON.parse(storedTasks);
        tasksStore.setTasks(parsedTasks);
      } else {
        tasksStore.setTasks([]);
      }
    } catch (error) {
      console.error('Error loading tasks from localStorage:', error);
      tasksStore.setTasks([]);
    }
  }, [tasksStore]);

  return (
    <div className={styles.page}>
      <div className={styles.page__input}>
        <InputHOC className={styles.page__inputField} onChange={setInputValue} />
        <ButtonHOC variant="primary" icon="plus" label="Добавить" inputValue={inputValue} />
      </div>
      <div className={styles.page__board}>
        {statusList.map((status) => (
          <ColumnHOC key={status} status={status as TaskStatus} />
        ))}
      </div>
      <ModalHOC />
    </div>
  );
};

export default function TodoPage() {
  return (
    <TasksStoreProvider>
      <TodoPageContent />
    </TasksStoreProvider>
  );
}
