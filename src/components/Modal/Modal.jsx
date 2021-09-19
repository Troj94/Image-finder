import PropTypes from 'prop-types';
import { Component } from 'react';
import { createPortal } from 'react-dom';
import { GrClose } from 'react-icons/gr';
import css from './Modal.module.css';

const modalRoot = document.querySelector('#modal-root');

export class Modal extends Component {
  state = {};

  componentDidMount() {
    window.addEventListener('keydown', this.closeEscape);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.closeEscape);
  }

  closeEscape = event => {
    if (event.code === 'Escape') {
      this.props.onClose(event);
    }
  };

  render() {
    return createPortal(
      <div className={css.Overlay} onClick={this.props.onClose}>
        <button
          className={css.button}
          onClick={this.props.onClose}
          type={'button'}
        >
          <GrClose className={css.close} onClick={this.props.onClose} />
        </button>
        <div className={css.Modal}>
          <img src={this.props.largeImage} alt={this.props.alt} />
        </div>
      </div>,
      modalRoot,
    );
  }
}

Modal.propTypes = {
  onClose: PropTypes.func.isRequired,
  largeImage: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
};
