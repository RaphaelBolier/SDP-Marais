/* eslint-disable eqeqeq */
import { useCallback, useEffect, useState } from 'react';
import {
    Modal,
    ModalHeader,
    ModalBody,
    Input,
} from 'reactstrap';

import './Task.scss';

const MIN = 0;
const MAX = 255;

export const Statue = ({ localPlayer, notifyEnd }) => {
    const [showModal, setShowModal] = useState(true);
    const [slidersValue, setSlidersValue] = useState({
        slider1: MIN + Math.random() * (MAX - MIN),
        slider2: MIN + Math.random() * (MAX - MIN),
        slider3: MIN + Math.random() * (MAX - MIN),
        slider4: MIN + Math.random() * (MAX - MIN),
    });

    const terminateTask = useCallback(() => {
        //send finish to server
        notifyEnd();
    }, [notifyEnd]);

    useEffect(() => {
        //Prevent the player to move
        localPlayer.setMoveState(false);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const toggle = useCallback(() => {
        localPlayer.setMoveState(true);
        setShowModal(false)
    }, [localPlayer]);
    
    useEffect(() => {
        if (slidersValue.slider1 == MAX
            && slidersValue.slider2 == MAX
            && slidersValue.slider3 == MAX
            && slidersValue.slider4 == MAX) {
                terminateTask();
                toggle();
            }
    }, [notifyEnd, slidersValue, toggle, terminateTask]);

    const handleChange = (id, value) => {
        switch(id) {
            case 'slider1':
                setSlidersValue((prevState) => ({ ...prevState, slider1: value }));
            break;
            case 'slider2':
                setSlidersValue((prevState) => ({ ...prevState, slider2: value }));
            break;
            case 'slider3':
                setSlidersValue((prevState) => ({ ...prevState, slider3: value }));
            break;
            case 'slider4':
                setSlidersValue((prevState) => ({ ...prevState, slider4: value }));
            break;
            default: break;
        };
    }

    return (
        <Modal isOpen={showModal} toggle={toggle}>
            <ModalHeader toggle={toggle}>Statue</ModalHeader>
            <ModalBody>
                Mettre tout au max !
                <Input
                    value={slidersValue.slider1}
                    onChange={(e) => handleChange(e.target.id, e.target.value)}
                    min="0"
                    max="255"
                    type="range"
                    id="slider1"
                />
                <Input
                    value={slidersValue.slider2}
                    onChange={(e) => handleChange(e.target.id, e.target.value)}
                    min="0"
                    max="255"
                    type="range"
                    id="slider2"
                />
                <Input
                    value={slidersValue.slider3}
                    onChange={(e) => handleChange(e.target.id, e.target.value)}
                    min="0"
                    max="255"
                    type="range"
                    id="slider3"
                />
                <Input
                    value={slidersValue.slider4}
                    onChange={(e) => handleChange(e.target.id, e.target.value)}
                    min="0"
                    max="255"
                    type="range"
                    id="slider4"
                />
            </ModalBody>
        </Modal>
    );
};
