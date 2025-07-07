import { makeAutoObservable } from 'mobx';

interface Task {
  id: string;
  title: string;
  status: 'to do' | 'in progress' | 'done';
}

class TasksStore {
  tasks: Task[] = [];
  newTask = '';
  selectedTask: string | null = null;
  isLoaded = false;

  constructor() {
    makeAutoObservable(this);
  }

  setTasks(tasks: Task[]) {
    this.tasks = tasks.filter((task) => task.id && task.title && ['to do', 'in progress', 'done'].includes(task.status));
    this.isLoaded = true;
  }

  private saveTasks() {
    try {
      localStorage.setItem('tasks', JSON.stringify(this.tasks));
    } catch (error) {
      console.error('Error saving tasks to localStorage:', error);
    }
  }

  addTask() {
    if (this.newTask && this.newTask.trim()) {
      const newTask = {
        id: crypto.randomUUID(),
        title: this.newTask.trim(),
        status: 'to do' as const,
      };
      this.tasks = [...this.tasks, newTask];
      this.saveTasks();
    } else {
      console.error('newTask is empty or invalid:', this.newTask);
    }
  }

  deleteTask(id: string) {
    try {
      this.tasks = this.tasks.filter((task) => task.id !== id);
      this.selectedTask = null;
      this.saveTasks();
    } catch (error) {
      console.error('Error deleting tasks:', error);
    }
  }

  moveTask(id: string, newStatus: Task['status']) {
    try {
      const taskIndex = this.tasks.findIndex((t) => t.id === id);
      if (taskIndex !== -1) {
        const newTasks = [...this.tasks];
        newTasks[taskIndex].status = newStatus;
        this.tasks = newTasks;
        this.saveTasks();
      }
    } catch (error) {
      console.error('Error moving tasks:', error);
    }
  }

  setNewTask(value: string) {
    this.newTask = value;
  }

  setSelectedTask(id: string | null) {
    this.selectedTask = id;
  }
}

export const createTasksStore = () => new TasksStore();
