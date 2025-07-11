import React from 'react';
import styles from './Heading.module.scss';
import classNames from 'classnames';

export interface HeadingProps {
  size?: 100 | 200 | 300 | 400 | 500 | 600 | 700 | 800 | 900;
  className?: string;
  children: React.ReactNode;
  style?: React.CSSProperties;
}

export const Heading: React.FC<HeadingProps> = ({ size = 400, className, children, style }) => {
  const headingClass = classNames(styles.heading, styles[`heading--size-${size}`], className);

  return (
    <h1 className={headingClass} style={style}>
      {children}
    </h1>
  );
};
