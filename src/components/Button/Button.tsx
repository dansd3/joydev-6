import styles from './Button.module.scss';
import classNames from 'classnames';
import PlusIcon from '../Icons/PlusIcon.svg';
import CaretDownIcon from '../Icons/CaretDownIcon.svg';

export interface ButtonProps {
  variant: 'primary' | 'danger' | 'regular' | 'minimal' | 'disabled' | 'active';
  icon?: 'plus' | 'caret';
  label: string;
  className?: string;
  onClick?: () => void;
}

export const Button = ({ variant, icon, label, className, onClick }: ButtonProps) => {
  const isDisabled = variant === 'disabled';
  const classes = classNames(styles.button, styles[`button--variant--${variant}`], className);

  return (
    <button className={classes} onClick={onClick} disabled={isDisabled}>
      {icon === 'plus' && <PlusIcon />}
      <span className={styles.button__label}>{label}</span>
      {icon === 'caret' && <CaretDownIcon />}
    </button>
  );
};
