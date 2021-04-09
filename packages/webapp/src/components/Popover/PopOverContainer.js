/* eslint react/no-multi-comp: 0, react/prop-types: 0 */
import React, { useState } from "react";
import {
  Button,
  Popover,
  PopoverHeader,
  PopoverBody,
  Input,
  FormGroup,
  Label,
} from "reactstrap";

import { usePlayer } from "../../components/Player/PlayerContext";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMouse } from '@fortawesome/free-solid-svg-icons';
import './PopOver.scss';

const PopOverContainer = () => {
  const [popoverOpen, setPopoverOpen] = useState(false);

  const playerConfig = usePlayer();

  const toggle = () => setPopoverOpen(!popoverOpen);

  const [globalVolume, setGlobalVolume] = useState(playerConfig.player.sound);

  const handleGlobalVolume = (input) => {
    setGlobalVolume(
      playerConfig.setPlayer((prevState) => ({
        ...prevState,
        sound: input.target.value,
      }))
    );
  };

  const control = {
    up: {
      name: "Avancer",
      key: "Z",
    },
    down: {
      name: "Reculer",
      key: "S",
    },
    left: {
      name: "Aller à gauche",
      key: "Q",
    },
    right: {
      name: "Aller à droite",
      key: "D",
    },
    use: {
      name: "Interagir",
      key: "E",
    },
    report: {
      name: "Reporter",
      key: "R",
    },
  };

  return (
    <div>
      <Button className ="control-btn" id="Popover1" type="button">
      <FontAwesomeIcon icon={faMouse} size="3x" color="white"/>
      </Button>
      <Popover
        placement="bottom"
        isOpen={popoverOpen}
        target="Popover1"
        toggle={toggle}
      >
        <PopoverHeader className="text-center h-50 Home-container align-middle">
          Controles
        </PopoverHeader>
        <PopoverBody>
          <ul>
            {Object.keys(control).map((key) => {
              return (
                <li key={key}>
                  {control[key].name} :<b> {control[key].key}</b>
                </li>
              );
            })}
          </ul>
          <FormGroup>
            <Label>Volume global</Label>
            <Input
              type="range"
              min="0"
              step="0.01"
              max="1"
              className="slider"
              value={globalVolume}
              onChange={handleGlobalVolume}
            />
          </FormGroup>
        </PopoverBody>
      </Popover>
    </div>
  );
};


export default PopOverContainer;
