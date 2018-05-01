import React from 'react';
import PropTypes from 'prop-types';

import './modal.styl';

const Modal = ({
  title,
  children,
  show,
  onClose,
}) => (
  <div
    className={`modal-container position-fixed fade ${show ? 'show' : ''}`}
    style={{ zIndex: show ? 2000 : -2000 }}
  >
    <div className="modal-dialog">
      <div className="modal-content">
        <div className="modal-header">
          <h5 className="modal-title">{title}</h5>
          <button type="button" className="close" onClick={onClose}>
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div className="modal-body">
          {children}
        </div>
      </div>
    </div>
  </div>
);

Modal.propTypes = {
  title: PropTypes.string.isRequired,
  children: PropTypes.element.isRequired,
  show: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};


export default Modal;
