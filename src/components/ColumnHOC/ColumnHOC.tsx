import React from 'react';
import { observer } from 'mobx-react-lite';
import { useTasksStore } from '../../context/TasksStoreContext';
import { Column } from '../Column/Column';
type TaskStatus = 'to do' | 'in progress' | 'done';

interface ColumnHOCProps {
  status: TaskStatus;
}

export const ColumnHOC: React.FC<ColumnHOCProps> = observer(({ status }) => {
  const tasksStore = useTasksStore();
  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    const id = event.dataTransfer.getData('text');
    tasksStore.moveTask(id, status);
  };
  const handleDelete = (id: string) => {
    tasksStore.setSelectedTask(id);
  };
  return (
    <Column
      status={status}
      tasks={tasksStore.tasks}
      onDrop={handleDrop}
      onDelete={handleDelete}
      onDragStart={(id: string, e: React.DragEvent<HTMLDivElement>) => e.dataTransfer.setData('text', id)}
    />
  );
});
