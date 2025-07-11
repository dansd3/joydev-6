import { observer } from 'mobx-react-lite';
import { tasksStore } from '../../stores/TasksStore';
import { ComponentType } from 'react';
import { Column } from '../Column/Column';

type TaskStatus = 'to do' | 'in progress' | 'done';
type TaskItem = { id: string; title: string; status: TaskStatus };

interface ColumnProps {
  status: TaskStatus;
  tasks: TaskItem[];
  onDrop: (e: React.DragEvent<HTMLDivElement>) => void;
  onDelete: (id: string) => void;
  onDragStart: (id: string, e: React.DragEvent<HTMLDivElement>) => void;
}

interface withColumnStoreProps {
  status: TaskStatus;
}

function withColumnStore<P extends object>(WrappedColumn: ComponentType<P & ColumnProps>): React.FC<P & withColumnStoreProps> {
  return observer(function ColumnWrapper(props: P & withColumnStoreProps) {
    const { status } = props;

    const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
      event.preventDefault();
      const id = event.dataTransfer.getData('text');
      tasksStore.moveTask(id, status);
    };

    const handleDelete = (id: string) => {
      tasksStore.setSelectedTask(id);
    };

    const handleDragStart = (id: string, e: React.DragEvent<HTMLDivElement>) => {
      e.dataTransfer.setData('text', id);
    };
    
    return (
      <WrappedColumn
        {...props}
        tasks={tasksStore.tasks}
        onDrop={handleDrop}
        onDelete={handleDelete}
        onDragStart={handleDragStart}
      />
    );
  });
}

export const ColumnWithStore = withColumnStore(Column);
