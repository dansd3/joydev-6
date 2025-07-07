import React from 'react';
import { observer } from 'mobx-react-lite';
import { useTasksStore } from '../../context/TasksStoreContext';
import { Modal } from '../Modal/Modal';

export const ModalHOC: React.FC = observer(() => {
  const tasksStore = useTasksStore();
  if (tasksStore.selectedTask === null) return null;
  return <Modal onConfirm={() => tasksStore.deleteTask(tasksStore.selectedTask!)} onCancel={() => tasksStore.setSelectedTask(null)} />;
});
