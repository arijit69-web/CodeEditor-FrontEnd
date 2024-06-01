import React from 'react';
import './Modal.css'; // Ensure you create the corresponding CSS file

const Modal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>Warning</h2>
        <p>Please do not modify the provided code template!</p>
        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );
};

export default Modal;
