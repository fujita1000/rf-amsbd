// Modal.js
import React from 'react';
import ThreadForm from './ThreadForm';

const Modal = ({ ModalOpen, handleClose }) => {
  const handleOverlayClick = (e) => {
    // モーダル外の領域がクリックされた場合にモーダルを閉じる
    if (e.target.classList.contains('overlay')) {
      handleClose();
    }
  };
  return (
    <>
      {ModalOpen && (
        <div className="fixed inset-0 z-[999] flex items-center justify-center bg-gray-500 bg-opacity-75 overlay" onClick={handleOverlayClick}>
          <div className="bg-white p-4 rounded-lg relative h-[80%] w-[80%]">
            <span className="absolute top-0 right-0 p-2 cursor-pointer" onClick={handleClose}>
              <img src="/images/closebutton.svg" alt="Close" />
            </span>
            <div className='mt-[100px]'>
            <ThreadForm onCloseModal={handleClose}/>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Modal;