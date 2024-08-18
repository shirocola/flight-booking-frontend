import React from 'react';
import styles from './Modal.module.scss';

interface ModalProps {
  show: boolean;
  onClose: () => void;
  message: string;
}

const Modal: React.FC<ModalProps> = ({ show, onClose, message }) => {
  if (!show) return null;

  return (
    <div className={styles['modal-backdrop']}>
      <div className={styles['modal-content']}>
        <h2>{message}</h2>
        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );
};

export default Modal;
