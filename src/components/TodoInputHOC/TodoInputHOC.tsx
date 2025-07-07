import React, { useState } from 'react';
import { observer } from 'mobx-react-lite';
import { TodoInput } from '../TodoInput/TodoInput';

interface InputHOCProps {
  className?: string;
  onChange?: (value: string) => void;
}

export const InputHOC: React.FC<InputHOCProps> = observer(({ className, onChange }) => {
  const [inputValue, setInputValue] = useState('');

  const onChangeHandler = (value: string) => {
    setInputValue(value);
    if (onChange) onChange(value);
  };
  return <TodoInput value={inputValue} onChange={onChangeHandler} className={className} />;
});
