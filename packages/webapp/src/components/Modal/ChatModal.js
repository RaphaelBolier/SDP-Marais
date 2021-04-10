import React, { useEffect } from "react";
import { useState } from "react/cjs/react.development";
import {  Modal, ModalHeader, ModalBody, Input, Label, Button, Card, CardBody, CardFooter } from "reactstrap";

const ModalChat = ({ className, showChat, chatData, onSendMessage, toggleModal, localPlayer }) => {
    const [msg, setMsg] = useState('');

    useEffect(() => {
        localPlayer.setMoveState(false);
    }, []);

    return (
        <div>
        <Modal isOpen={showChat} toggle={toggleModal} className={className}>
            <ModalHeader toggle={toggleModal}>Chat</ModalHeader>
            <ModalBody>
                <Card className="mt-2">
                    <CardBody>
                        <div>
                        {
                            chatData.map((data) => (
                                <div key={`${data.name}${data.msg}`}>
                                    <p className="d-inline">[{data.name}]: </p>
                                    <p className="d-inline">{data.msg}</p>
                                </div>
                            ))
                        }
                        </div>
                    </CardBody>
                    <CardFooter>
                        <Input value={msg} type="text" id="chat" onChange={(e) => setMsg(e.target.value)}/>
                        <Button className="d-flex ml-auto mr-0" onClick={() => {
                            onSendMessage(msg);
                            setMsg('');
                        }}>
                            Envoyer
                        </Button>
                    </CardFooter>
                </Card>
            </ModalBody>
        </Modal>
        </div>
    );
};

export default ModalChat;
