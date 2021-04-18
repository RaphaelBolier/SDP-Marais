import React, { useState } from "react";
import { useEffect } from "react/cjs/react.development";
import { Modal, ModalHeader, ModalBody, Button } from "reactstrap";

const ReportModal = ({ isOpen, toggleModal, playerList, reporterName, localPlayer, vote, id }) => {
  const [selectedPlayer, setSelectedPlayer] = useState(undefined);
  const handleClickVote = (player) => {
    setSelectedPlayer(player);
    vote(id, localPlayer, player);
  }

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
                        <Button disabled={selectedPlayer !== undefined || localPlayer.isDead} onClick={() => handleClickVote(player)}>
                          Voter
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
