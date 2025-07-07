import React, { createContext, useContext } from 'react';
import { createTasksStore } from '../stores/TasksStore';

const tasksStore = createTasksStore();
const TasksStoreContext = createContext(tasksStore);

export const TasksStoreProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return <TasksStoreContext.Provider value={tasksStore}>{children}</TasksStoreContext.Provider>;
};

export const useTasksStore = () => {
  const store = useContext(TasksStoreContext);
  if (!store) {
    throw new Error('useTasksStore error');
  }
  return store;
};
