import { useState } from 'react';
import { observer } from 'mobx-react-lite';
import { tasksStore } from '../../stores/TasksStore';
import { ComponentType } from 'react';
import { TodoInput } from '../TodoInput/TodoInput';

interface InputProps {
  value: string;
  onChange: (value: string) => void;
  className?: string;
}

function withInputStore<P extends object>(WrappedInput: ComponentType<P & InputProps>): React.FC<P> {
  return observer(function InputWrapper(props: P) {
    const [inputValue, setInputValue] = useState(tasksStore.newTask);

    const handleChange = (value: string) => {
      setInputValue(value);
      tasksStore.setNewTask(value);
    };

    return <WrappedInput {...props} value={inputValue} onChange={handleChange} />;
  });
}

export const InputWithStore = withInputStore(TodoInput);
