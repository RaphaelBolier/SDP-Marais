import React, { useState } from "react";
import { useEffect } from "react/cjs/react.development";
import { Modal, ModalHeader, ModalBody, Button } from "reactstrap";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSkull } from '@fortawesome/free-solid-svg-icons';

import './Vote.scss';

const ReportModal = ({ isOpen, toggleModal, playerList, reporterName, localPlayer, vote, id }) => {
  const [selectedPlayer, setSelectedPlayer] = useState(undefined);
  const handleClickVote = (player) => {
    setSelectedPlayer(player);
    vote(id, localPlayer, player);
  }

  return (
    <div className="ReportModalContainer">
      <Modal modalClassName="reportModal" className="report-modal" isOpen={isOpen} toggle={toggleModal}>
        <ModalHeader className="Vote-title justify-content-center" toggle={toggleModal}>Qui est l'imposteur ?</ModalHeader>
        <ModalBody>
            <ul>
            {playerList.map((player) => {
                return (
                    <li key={player.id} style={{ color: player.name === reporterName ? 'red' : 'black'}}>
                        {player.name}
                        <Button className="Vote-btn" disabled={selectedPlayer !== undefined || localPlayer.isDead} onClick={() => handleClickVote(player)}>
                        <FontAwesomeIcon icon={faSkull} size="3x" color="white" />
                        </Button>
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
