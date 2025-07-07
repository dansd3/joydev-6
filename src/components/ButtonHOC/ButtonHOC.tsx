import React from 'react';
import { observer } from 'mobx-react-lite';
import { useTasksStore } from '../../context/TasksStoreContext';
import { Button } from '../Button/Button';

type ButtonVariant = 'primary' | 'danger' | 'regular' | 'minimal' | 'disabled' | 'active';
type ButtonIcon = 'plus' | 'caret';

interface ButtonHOCProps {
  variant: ButtonVariant;
  icon?: ButtonIcon;
  label: string;
  className?: string;
  inputValue?: string;
}

export const ButtonHOC: React.FC<ButtonHOCProps> = observer(({ variant, icon, label, className, inputValue }) => {
  const tasksStore = useTasksStore();
  const handleClick = () => {
    if (inputValue) {
      tasksStore.setNewTask(inputValue);
      tasksStore.addTask();
    }
  };
  return <Button variant={variant} icon={icon} label={label} className={className} onClick={handleClick} />;
});
