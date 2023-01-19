import React from 'react';
import './Modal.scss';

const Modal = ({ handleClose, isShown, children }) => {
  const className = isShown
    ? 'modal-container display-block'
    : 'modal-container display-none';

  return (
    <div className={className}>
      <section className="inner-modal">
        <div>The top part</div>
        {children}
        <button type="button" onClick={handleClose}>
          Close
        </button>
      </section>
    </div>
  );
};

export default Modal;
