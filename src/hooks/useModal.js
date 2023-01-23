import { useState } from 'react';

const useModal = () => {
  const [isShown, setIsShown] = useState(false);
  const [modalNode, setModalNode] = useState(null);

  const openModal = (node) => {
    setModalNode(node);
    setIsShown(true);
  };

  const closeModal = () => {
    setIsShown(false);
  };

  return [isShown, modalNode, openModal, closeModal];
};

export default useModal;
