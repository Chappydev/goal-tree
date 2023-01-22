import React from 'react';
import './Modal.scss';

const Modal = ({ handleClose, isShown, children }) => {
  const className = isShown
    ? 'modal-container display-block'
    : 'modal-container display-none';

  return (
    <div
      className={className}
      onClick={(e) => (e.target === e.currentTarget ? handleClose() : null)}
    >
      <section className="inner-modal">
        <div className="modal-top">The top part</div>
        <div className="modal-content">{children}</div>
      </section>
    </div>
  );
};

export default Modal;
