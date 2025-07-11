import { observer } from 'mobx-react-lite';
import { tasksStore } from '../../stores/TasksStore';
import { ComponentType } from 'react';
import { Modal } from '../Modal/Modal';

interface ModalProps {
  onConfirm: () => void;
  onCancel: () => void;
}

function withModalDelete<P extends object>(WrappedModal: ComponentType<P & ModalProps>): React.FC<P> {
  return observer(function ModalWrapper(props: P) {
    
    if (tasksStore.selectedTask === null) return null;

    const handleConfirm = () => {
      tasksStore.deleteTask(tasksStore.selectedTask!)
    };

    const handleCancel = () => {
      tasksStore.setSelectedTask(null)
    };

    return <WrappedModal {...props} onConfirm={handleConfirm} onCancel={handleCancel} />;
  });
}

export const ModalWithDelete = withModalDelete(Modal);
