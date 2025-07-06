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
    this.loadTasks();
  }

  loadTasks() {
    const savedTasks = localStorage.getItem('tasks');
    if (savedTasks) {
      this.tasks = JSON.parse(savedTasks);
    }
    this.isLoaded = true;
  }

  saveTasks() {
    if (this.isLoaded) {
      localStorage.setItem('tasks', JSON.stringify(this.tasks));
    }
  }

  addTask() {
    if (this.newTask.trim()) {
      this.tasks.push({ id: crypto.randomUUID(), title: this.newTask.trim(), status: 'to do' });
      this.newTask = '';
      this.saveTasks();
    }
  }

  deleteTask(id: string) {
    this.tasks = this.tasks.filter((task) => task.id !== id);
    this.selectedTask = null;
    this.saveTasks();
  }

  moveTask(id: string, newStatus: Task['status']) {
    const task = this.tasks.find((t) => t.id === id);
    if (task) {
      task.status = newStatus;
      this.saveTasks();
    }
  }

  setNewTask(value: string) {
    this.newTask = value;
  }

  setSelectedTask(id: string | null) {
    this.selectedTask = id;
  }
}

export const tasksStore = new TasksStore();