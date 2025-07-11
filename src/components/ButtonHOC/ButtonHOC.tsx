import { observer } from 'mobx-react-lite';
import { tasksStore } from '../../stores/TasksStore';
import { ComponentType } from 'react';
import { Button } from '../Button/Button';

interface withButtonSetTaskProps {
  onClick: () => void;
}

function withButtonSetTask<P extends object>(WrappedButton: ComponentType<P & withButtonSetTaskProps>): React.FC<P> {
  return observer(function ButtonWrapper(props: P) {
    
    const handleClick = () => {
      tasksStore.addTask();
    };

    return <WrappedButton {...props} onClick={handleClick} />;
  });
}

export const ButtonWithSetNewTask = withButtonSetTask(Button);
