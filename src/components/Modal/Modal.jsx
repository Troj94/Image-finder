import PropTypes from 'prop-types';
import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import { GrClose } from 'react-icons/gr';
import css from './Modal.module.css';

const modalRoot = document.querySelector('#modal-root');

export function Modal({ onClose, largeImage, alt }) {
  useEffect(() => {
    window.addEventListener('keydown', closeEscape);
    return () => {
      window.removeEventListener('keydown', closeEscape);
    };
  });

  function closeEscape(event) {
    if (event.code === 'Escape') {
      onClose(event);
    }
  }

  return createPortal(
    <div className={css.Overlay} onClick={onClose}>
      <button className={css.button} onClick={onClose} type={'button'}>
        <GrClose className={css.close} onClick={onClose} />
      </button>
      <div className={css.Modal}>
        <img src={largeImage} alt={alt} />
      </div>
    </div>,
    modalRoot,
  );
}

Modal.propTypes = {
  onClose: PropTypes.func.isRequired,
  largeImage: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
};
