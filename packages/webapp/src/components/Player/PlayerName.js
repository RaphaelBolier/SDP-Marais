import React, { Component } from 'react';
import { Container, Input } from 'reactstrap';
import PlayerContext from './PlayerContext';
import './PlayerName.scss';

export class PlayerName extends Component {
  static contextType = PlayerContext;

  render() {
    const { player, setPlayer } = this.context;

	  const handlePlayerName = (event) => {
      const newUser = { name: event.target.value};
      setPlayer({...player, ...newUser });
    };

    return (
      <Container className="playerNameContainer d-flex justify-content-center">
        <p className="">Pseudo : </p>
        <Input className="p-1 d-inline h-100 w-25 ml-1" type="text" value={player.name} onChange={handlePlayerName} />
		  </Container>
    );
  };
};
