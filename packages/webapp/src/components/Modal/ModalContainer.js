import React, {  } from "react";
import {  Modal, ModalHeader } from "reactstrap";

const ModalExample = ({ className, openBool, toggleModal, bool }) => {
  return (
    <div>
      <Modal isOpen={openBool} toggle={toggleModal} className={className}>
        <ModalHeader toggle={toggleModal}>Vous êtes morts</ModalHeader>
      </Modal>
      <Modal isOpen={bool} toggle={toggleModal} className={className}>
        <ModalHeader toggle={toggleModal}>Vous etes imposteur</ModalHeader>
      </Modal>
    </div>
  );
};

export default ModalExample;
