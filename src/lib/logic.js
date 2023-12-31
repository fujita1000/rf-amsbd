// logic.js
import React from 'react';

export const useModal = () => {
  const [ModalOpen, setModalOpen] = React.useState(false);

  const openModal = () => {
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  return {
    ModalOpen,
    openModal,
    closeModal,
  };
};

export const useSidebar = () => {
  const [sidebarOpen, setSidebarOpen] = React.useState(false);

  const openSidebar = () => {
    setSidebarOpen(true);
  };

  const closeSidebar = () => {
    setSidebarOpen(false);
  };

  return {
    sidebarOpen,
    openSidebar,
    closeSidebar,
  };
};