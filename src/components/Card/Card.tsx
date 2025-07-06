import styles from './Card.module.scss';
import classNames from 'classnames';
import type { ReactNode } from 'react';

interface CardProps {
  elevation: 0 | 1 | 2 | 3;
  className?: string;
  children: ReactNode;
}

export const Card = ({ elevation, className, children }: CardProps) => {
  const classes = classNames(styles.card, styles[`card--elevation--${elevation}`], className);
  return <div className={classes}>{children}</div>;
};