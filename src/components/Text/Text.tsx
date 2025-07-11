import React from 'react';
import styles from './Text.module.scss';
import classNames from 'classnames';

export interface TextProps {
  size?: 300 | 400 | 500;
  weight?: 'default' | 'medium' | 'semibold';
  isLink?: boolean;
  className?: string;
  children: React.ReactNode;
}

export const Text: React.FC<TextProps> = ({ size = 400, weight = 'default', isLink = false, children, className }) => {
  const classes = classNames(styles.text, styles[`text--size--${size}-${weight}`], isLink && styles['text--link'], className);

  return <p className={classes}>{children}</p>;
};
