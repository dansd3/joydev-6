import React from 'react';
import { Card } from '../Card/Card';
import { Heading } from '../Heading/Heading';
import { Button } from '../Button/Button';
import styles from './Modal.module.scss';

interface ModalProps {
  onConfirm: () => void;
  onCancel: () => void;
}

export const Modal: React.FC<ModalProps> = ({ onConfirm, onCancel }) => {
  return (
    <Card elevation={2} className={styles.modal}>
      <Heading size={400}>Удалить задачу?</Heading>
      <div className={styles.modal__buttons}>
        <Button variant="danger" label="Удалить" onClick={onConfirm} />
        <Button variant="regular" label="Отмена" onClick={onCancel} />
      </div>
    </Card>
  );
};