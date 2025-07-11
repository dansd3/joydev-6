'use client';
import { useEffect, useMemo } from 'react';
import { ColumnWithStore } from '../components/ColumnHOC/ColumnHOC';
import { InputWithStore } from '../components/TodoInputHOC/TodoInputHOC';
import { ButtonWithSetNewTask } from '../components/ButtonHOC/ButtonHOC';
import { ModalWithDelete } from '../components/ModalHOC/ModalHOC';
import styles from './page.module.scss';
import { tasksStore } from '../stores/TasksStore';

type TaskStatus = 'to do' | 'in progress' | 'done';
interface Task {
  id: string;
  title: string;
  status: TaskStatus;
}

export default function TodoPage() {
  
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
  }, []);

  return (
    <div className={styles.page}>
      <div className={styles.page__input}>
        <InputWithStore />
        <ButtonWithSetNewTask variant="primary" icon="plus" label="Добавить" />
      </div>
      <div className={styles.page__board}>
        {statusList.map((status) => (
          <ColumnWithStore key={status} status={status as TaskStatus} />
        ))}
      </div>
      <ModalWithDelete />
    </div>
  );
}
