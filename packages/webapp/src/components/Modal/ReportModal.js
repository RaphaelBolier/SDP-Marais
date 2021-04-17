import React, { } from "react";
import { Modal, ModalHeader, ModalBody } from "reactstrap";

const ReportModal = ({ isOpen, toggleModal, playerList, reporterName, localPlayer }) => {
  return (
    <div>
      <Modal isOpen={isOpen} toggle={toggleModal}>
        <ModalHeader toggle={toggleModal}>Test</ModalHeader>
        <ModalBody>
            <ul>
            {playerList.map((player) => {
                return (
                    <li key={player.id} style={{ color: player.name === reporterName ? 'red' : 'black'}}>
                        {player.name}
                    </li>
                )
            })}
            <li>
                {localPlayer && localPlayer.name}
            </li>
            </ul>
        </ModalBody>
      </Modal>
    </div>
  );
};

export default ReportModal;
