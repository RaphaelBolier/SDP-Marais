import React, { useState } from "react";
import { Button, Modal, ModalHeader } from "reactstrap";

const ModalExample = ({ className, openBool, toggleModal }) => {
  return (
    <div>
      <Modal isOpen={openBool} toggle={toggleModal} className={className}>
        <ModalHeader toggle={toggleModal}>bouuuh t mor gros nul</ModalHeader>
      </Modal>
    </div>
  );
};

export default ModalExample;
