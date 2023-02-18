import { useAtom, useSetAtom } from 'jotai';
import { useState } from 'react';

// const useModal = (requiresNode = true) => {
//   const [isShown, setIsShown] = useState(false);
//   const [modalNode, setModalNode] = useState(null);

//   const openModalWithNode = (node) => {
//     setModalNode(node);
//     setIsShown(true);
//   };

//   const openModalWithoutNode = () => {
//     setIsShown(true);
//   };

//   const closeModal = () => {
//     setIsShown(false);
//   };

//   if (!requiresNode) {
//     return [isShown, openModalWithoutNode, closeModal];
//   }

//   return [isShown, openModalWithNode, closeModal, modalNode];
// };

const useModal = (atom, nodeAtom = null) => {
  const [isShown, setIsShown] = useAtom(atom);
  const setModalNode = useSetAtom(nodeAtom);

  const openModalWithNode = (node) => {
    setModalNode(node);
    setIsShown(true);
  };

  const openModalWithoutNode = () => {
    setIsShown(true);
  };

  const closeModal = () => {
    setIsShown(false);
  };

  if (!nodeAtom) {
    return [isShown, openModalWithoutNode, closeModal];
  }

  return [isShown, openModalWithNode, closeModal];
};

export default useModal;
