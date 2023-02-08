import { useEffect } from 'react';
import PropTypes from 'prop-types';
import styles from './Modal.module.css';

const Modal = ({ children, onClose }) => {  
  const { overlay, modal } = styles;

  useEffect(() => {
    const handleKeydownCloseModal = e => {
      if (e.code === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeydownCloseModal);
    return () => {
      window.removeEventListener('keydown', handleKeydownCloseModal);
    };
  }, [onClose]);

  const handleOverlayCloseModal = e => {
    if (e.currentTarget === e.target) {
      console.log('yay')
      onClose();
    }
  };

  return (
    <div className={overlay} onClick={handleOverlayCloseModal}>
      <div className={modal}>{children}</div>
    </div>
  );
};

Modal.propTypes = {
  children: PropTypes.node,
  onClose: PropTypes.func.isRequired,
};

export default Modal;