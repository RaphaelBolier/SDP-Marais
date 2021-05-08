import React, { } from "react";
import { Modal, ModalHeader } from "reactstrap";

import './ModalContainer.scss';


const ModalExample = ({ openBool, toggleModal, bool, boolCrewmate }) => {
  return (
    <div className="stateGame">
      <Modal modalClassName="deathModal"  isOpen={openBool} toggle={toggleModal}>
        <ModalHeader className="death-title " toggle={toggleModal}>Vous etes mort</ModalHeader>
      </Modal>
      <Modal modalClassName="impostorModal"  isOpen={bool} toggle={toggleModal}>
        <ModalHeader className="impostor-title " toggle={toggleModal}>Vous etes l'imposteur</ModalHeader>
      </Modal>
      <Modal modalClassName="innocentModal" isOpen={boolCrewmate} toggle={toggleModal}>
        <ModalHeader className="innocent-title justify-content-center"  toggle={toggleModal}>Vous etes innocent</ModalHeader>
      </Modal>
    </div>
  );
};

export default ModalExample;
