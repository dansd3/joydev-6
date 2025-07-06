import React from 'react';
import { Card } from '../Card/Card';
import { Text } from '../Text/Text';
import CloseIcon from '../Icons/CloseIcon.svg'; 
import styles from './TaskCard.module.scss';

interface TaskCardProps {
  id: string;
  title: string;
  onDelete: () => void;
  onDragStart: (e: React.DragEvent<HTMLDivElement>) => void;
}

export const TaskCard: React.FC<TaskCardProps> = ({ title, onDelete, onDragStart }) => {
  return (
    <div className={styles.taskCard} draggable onDragStart={onDragStart}>
      <Card elevation={1} className={styles.taskCard__card}>
        <div className={styles.taskCard__content}>
          <Text size={400} className={styles.taskCard__text}>{title}</Text>
          <CloseIcon className={styles.taskCard__closeIcon} onClick={onDelete} />
        </div>
      </Card>
    </div>
  );
};