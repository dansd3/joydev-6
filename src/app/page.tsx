'use client'
import { useState, useEffect, useMemo } from 'react';
import { TodoInput } from '../components/TodoInput/TodoInput';
import { Button } from '../components/Button/Button';
import { Column } from '../components/Column/Column';
import { Modal } from '../components/Modal/Modal';
import styles from './page.module.scss';

interface Task {
  id: string;
  title: string;
  status: 'to do' | 'in progress' | 'done';
}

export default function TodoPage() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTask, setNewTask] = useState('');
  const [selectedTask, setSelectedTask] = useState<string | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const statusList = useMemo(() => ['to do', 'in progress', 'done'], []);

  useEffect(() => {
    const savedTasks = localStorage.getItem('tasks');
    setTasks(savedTasks ? JSON.parse(savedTasks) : []);
    setIsLoaded(true);
  }, []);

  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem('tasks', JSON.stringify(tasks));
    }
  }, [tasks]);

  const addTask = () => {
    if (newTask.trim()) {
      setTasks([...tasks, { id: crypto.randomUUID(), title: newTask.trim(), status: 'to do' }]);
      setNewTask('');
    }
  };

  const deleteTask = (id: string) => {
    setTasks(tasks.filter((task) => task.id !== id));
    setSelectedTask(null);
  };

  const moveTask = (id: string, newStatus: Task['status']) => {
    setTasks(tasks.map((task) => (task.id === id ? { ...task, status: newStatus } : task)));
  };

  const handleDrop = (event: React.DragEvent<HTMLDivElement>, status: Task['status']) => {
    event.preventDefault();
    const id = event.dataTransfer.getData('text');
    moveTask(id, status);
  };

  return (
    <div className={styles.page}>
      <div className={styles.page__input}>
        <TodoInput value={newTask} onChange={setNewTask} className={styles.page__inputField} />
        <Button variant="primary" icon="plus" label="Добавить" onClick={addTask} />
      </div>
      <div className={styles.page__board}>
        {statusList.map((status) => (
          <Column
            key={status}
            status={status as Task['status']}
            tasks={tasks}
            onDrop={(e) => handleDrop(e, status as Task['status'])}
            onDelete={setSelectedTask}
            onDragStart={(id, e) => e.dataTransfer.setData('text', id)}
          />
        ))}
      </div>
      {selectedTask !== null && <Modal onConfirm={() => deleteTask(selectedTask)} onCancel={() => setSelectedTask(null)} />}
    </div>
  );
}