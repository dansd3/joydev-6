import React from 'react';
import { Heading } from '../Heading/Heading';
import { TaskCard } from '../TaskCard/TaskCard';
import styles from './Column.module.scss';

type TaskStatus = 'to do' | 'in progress' | 'done';
type TaskItem = { id: string; title: string; status: TaskStatus };

type ColumnProps = {
  status: TaskStatus;
  tasks: TaskItem[];
  onDrop: (e: React.DragEvent<HTMLDivElement>) => void;
  onDelete: (id: string) => void;
  onDragStart: (id: string, e: React.DragEvent<HTMLDivElement>) => void;
};

export const Column: React.FC<ColumnProps> = ({ status, tasks, onDrop, onDelete, onDragStart }) => {
  return (
    <div className={styles.column} onDragOver={(e) => e.preventDefault()} onDrop={onDrop}>
      <Heading size={400} className={styles.column__title}>{status.toUpperCase()}</Heading>
      {tasks
        .filter((task) => task.status === status)
        .map((task) => (
          <TaskCard
            key={task.id}
            id={task.id}
            title={task.title}
            onDelete={() => onDelete(task.id)}
            onDragStart={(e) => onDragStart(task.id, e)}
          />
        ))}
    </div>
  );
};