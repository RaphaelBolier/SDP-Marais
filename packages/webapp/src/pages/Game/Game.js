import React, { useEffect, useMemo, useRef, useState, } from 'react';
import { useParams } from "react-router-dom";
import { Button, Col, Container, Row } from 'reactstrap';

import { initInputsEvent, moveEntity, checkColision } from '../../lib/Input';
import { Player } from '../../lib/Entity/Player';
import { useGraphics } from '../../components/Graphics/GraphicsProvider';
import { usePlayer } from '../../components/Player/PlayerContext';
import { useSockets } from '../../components/wsapi/WSockets';
import { useAudios } from '../../components/Audio/AudioProvider';
import { getClosestEntity } from '../../lib/Utils';
import mapLobby from '../../assets/map/lobby/lobby.json';
import { tasks } from '../../components/Task';
import PopOverContainer from '../../components/Popover/PopOverContainer';
import ModalContainer from '../../components/Modal/ModalContainer';

import './Game.scss';
import { Direction } from '../../lib/Entity/Entity';

const MAX_KILL_DIST = 100;
const KILL_COOLDOWN = 10 * 1000;
const LOBBY_WIDTH = 576;
const TILE_SIZE = 64;
const players = [];
const collisionTiles = [];
const taskTiles = [];
const finishedTasks = [];
let localPlayer = undefined;

const GameMenu = () => {
    const { id } = useParams();
    const { init, drawMap, createCollisionTiles, createTaskTiles } = useGraphics();
    const { player, setPlayer } = usePlayer();
    const { socket, sendPosition, getPlayerList, startGame, killCrewMate } = useSockets();
    const { playAudio, audioIds } = useAudios();
    const canvasRef = useRef();
    const [isImpostor, setIsImpostor] = useState(false);
    const [isDead, setIsDead] = useState(false);
    const [isKillButtonEnabled, setKillButton] = useState(false);
    const [CurrentTask, setCurrentTask] = useState(undefined);
    const [taskProgression, setTaskProgression] = useState(0);

    const handleClickKill = () => {
        localPlayer.startKillCoolDown(KILL_COOLDOWN);
        const target = getClosestEntity(localPlayer, players);
        killCrewMate(id, target.id);
        localPlayer.x = target.position.x;
        localPlayer.y = target.position.y;
    };

    useEffect(() => {
        if (!canvasRef.current) return;
        initInputsEvent();

        setInterval(() => {
            if (localPlayer.isImpostor
                && players.length
                && getClosestEntity(localPlayer, players).distance <= MAX_KILL_DIST
                && !localPlayer.hasCooldown
            ) {
                localPlayer.canKill = true;
                setKillButton(true);
            } else {
                setKillButton(false);
            }
        }, 100);

        const context = canvasRef.current.getContext('2d');
        localPlayer = new Player(player.name, 70, 70, socket.id, context);

        if (id === socket.id) {
            setTimeout(() => {
                console.log("start game");
                startGame(id);
            }, 8000);
        }

        const initMap = async () => {
            await init(mapLobby);
            collisionTiles.push(...createCollisionTiles(mapLobby, LOBBY_WIDTH, TILE_SIZE))
            taskTiles.push(...createTaskTiles(collisionTiles, tasks));
            render();
        }

        const initSocketEvents = () => {
            socket.on('playerlist', ({ playerList }) => {
                playerList.forEach((player) => {
                    players.push(new Player(player.name, 70, 70, player.id, context));
                });
            });
            socket.on('rolelist', ({ roleList }) => {
                roleList.forEach((r) => {
                    if (r.id === localPlayer.id && r.role === 'impostor') {
                        setIsImpostor(true);
                        localPlayer.isImpostor = true;
                    }
                });
            });
            socket.on('newplayer', ({ name, id }) => {
                players.push(new Player(name, 70, 70, id, context));
                playAudio(audioIds.JOIN);
            });
            socket.on('playerposition', ({ id, x, y, direction }) => {
                const target = players.find((player) => player.id === id);
                if (target) {
                    if (localPlayer.isDead) {
                        target.direction = direction;
                        target.x = x;
                        target.y = y;
                    } else if (!target.isDead && !localPlayer.isDead) {
                        target.direction = direction;
                        target.x = x;
                        target.y = y;
                    }

                }
            });
            socket.on('playerkilled', ({ targetId }) => {
                const target = players.find((player) => player.id === targetId);
                if (target) {
                    target.kill();
                } else if (localPlayer.id === targetId) {
                    localPlayer.kill();
                    setIsDead(true);
                }
            });
        }

        const draw = (context) => {
            drawMap(context, mapLobby.tiles, LOBBY_WIDTH, TILE_SIZE);
            localPlayer.draw();
            players.forEach((player) => player.draw());
        }

        const render = () => {
            draw(context);
            moveEntity(localPlayer, collisionTiles);
            sendPosition(localPlayer.id, localPlayer.x, localPlayer.y, localPlayer.direction);
            const collisionTasks = checkColision(localPlayer, taskTiles);

            if (collisionTasks.length > 0) {
                if (!CurrentTask) {
                    for (const task of collisionTasks) {
                        const isTaskAlreadyFinished = finishedTasks.find((t) => t.id === task.id);
                        if (!isTaskAlreadyFinished) {
                            setCurrentTask(task);
                            break;
                        }
                    }
                }
            } else {
                setCurrentTask(undefined);
            }
            window.requestAnimationFrame(render);
        }

        initSocketEvents();
        initMap();
        getPlayerList(id);
        playAudio(audioIds.JOIN);
        setPlayer((prevState) => ({...prevState, homeSound: "0" }));
        playAudio(audioIds.LOBBY); 
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    console.log(player);
    useEffect(() => {
        if(isNaN(finishedTasks.length)){
            setTaskProgression(0);
        }
        else{
        setTaskProgression(finishedTasks.length / taskTiles.length * 100);
        }
    }, [CurrentTask]);


    return (
        <div className="GameCanvas Lobby">
            <Container>
                <Row className="d-flex justify-content-center my-2">
                    <Col xs="5">
                        <div className="progress">
                            <div className={`progress-bar bg-success`}
                                style={{ width: taskProgression + '%'}}
                                role="progressbar" aria-valuenow={taskProgression}
                                aria-valuemin="0"
                                aria-valuemax="100">
                                {taskProgression}%
                                </div>
                        </div>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <p>Partie: {id} </p>
                        <p>Nombre de joueurs : {1 + players.length} </p>
                    </Col>
                    <Col>
                        {CurrentTask && (
                            // eslint-disable-next-line react/jsx-pascal-case
                            <CurrentTask.component
                                localPlayer={localPlayer}
                                task={CurrentTask}
                                notifyEnd={() => finishedTasks.push(CurrentTask)}
                            />
                        )}
                        <canvas ref={canvasRef} id="canvas" width="576" height="576" className="mx-auto d-flex" />
                        {isImpostor && (
                            <Button className="kill-btn d-flex ml-auto mr-0" onClick={handleClickKill} disabled={!isKillButtonEnabled}>
                                KILL
                            </Button>
                        )}
                    </Col>
                    <Col>
                        <PopOverContainer />
                    </Col>
                </Row>
            </Container>
            <ModalContainer openBool={isDead} toggleModal={() => setIsDead(!isDead)} />
        </div>
    );
};

export default GameMenu;
