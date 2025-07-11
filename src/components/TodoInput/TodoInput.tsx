import classNames from 'classnames';
import styles from './TodoInput.module.scss';

interface InputProps {
  value: string;
  onChange: (value: string) => void;
  className?: string;
}

export const TodoInput = ({ value, onChange, className }: InputProps) => {
  return (
    <input
      type="text"
      value={value}
      onChange={(e) => {
        onChange(e.target.value);
      }}
      placeholder="Введите название задачи"
      className={classNames(styles.input, className)}
    />
  );
};
