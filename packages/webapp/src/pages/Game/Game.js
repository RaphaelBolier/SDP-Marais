import React, { useEffect, useRef, useState, } from 'react';
import { useParams } from "react-router-dom";
import { Button, Col, Container, Row } from 'reactstrap';
import { initInputsEvent, moveEntity, checkColision } from '../../lib/Input';
import { Player } from '../../lib/Entity/Player';
import { useGraphics } from '../../components/Graphics/GraphicsProvider';
import { usePlayer } from '../../components/Player/PlayerContext';
import { useSockets } from '../../components/wsapi/WSockets';
import { useAudios } from '../../components/Audio/AudioProvider';
import { getClosestEntity } from '../../lib/Utils';
import mapLobby from '../../assets/map/lobby/lobbyV2.json';
import { tasks } from '../../components/Task';
import PopOverContainer from '../../components/Popover/PopOverContainer';
import ModalContainer from '../../components/Modal/ModalContainer';
import ModalChat from '../../components/Modal/ChatModal';
import { pressedKeys } from '../../lib/Input';
import ReportModal from '../../components/Modal/ReportModal';

import '../../lib/Illuminated';
import './Game.scss';

const MAX_KILL_DIST = 100;
const KILL_COOLDOWN = 10 * 1000;
const LOBBY_WIDTH = 832;
const TILE_SIZE = 64;
const players = [];
const collisionTiles = [];
const taskTiles = [];
const finishedTasks = [];
let localPlayer = undefined;
const DRAW_LIGHT_OFF = 100;
const DRAW_LIGHT_ON = 270;
let isGameStarted = false;
let nbVote = 0;

const { Lamp, Vec2, DiscObject, Lighting, DarkMask } = window.illuminated;
var light = new Lamp({
    position: new Vec2(200, 210),
    distance: DRAW_LIGHT_ON,
});

var lighting = new Lighting({
    light: light,
    objects: [],
});

var darkmask = new DarkMask({ lights: [light] });

const GameMenu = () => {
    const { id } = useParams();
    const { init, drawMap, createCollisionTiles, createTaskTiles } = useGraphics();
    const { player, setPlayer } = usePlayer();
    const {
        socket,
        sendPosition,
        getPlayerList,
        startGame,
        killCrewMate,
        sendMessage,
        sendReport,
        taskProgress,
        vote,
    } = useSockets();
    const { playAudio, audioIds } = useAudios();
    const canvasRef = useRef();
    const [isImpostor, setIsImpostor] = useState(false);
    const [impostorModal, setImpostorModal] = useState(false);
    const [crewmateModal, setCrewmateModal] = useState(false);
    const [isDead, setIsDead] = useState(false);
    const [isKillButtonEnabled, setKillButton] = useState(false);
    const [isStartButtonEnabled, setStartButton] = useState(false);
    const [isReportButtonEnabled, setIsReportButtonEnabled] = useState(false);
    const [CurrentTask, setCurrentTask] = useState(undefined);
    const [taskProgression, setTaskProgression] = useState(0);
    const [chatData, setChatData] = useState([]);
    const [showChat, setShowChat] = useState(false);
    const [showReportModal, setShowReportModal] = useState(false);
    const [reporterName, setReporterName] = useState('');

    const handleClickKill = () => {
        localPlayer.startKillCoolDown(KILL_COOLDOWN);
        const target = getClosestEntity(localPlayer, players);
        killCrewMate(id, target.id);
        localPlayer.x = target.position.x;
        localPlayer.y = target.position.y;
    };

    const handleClickReport = () => {
        sendReport(id, localPlayer.name);
        playAudio(audioIds.REPORT);
    };

    const onTaskEnd = () => {
        finishedTasks.push(CurrentTask)
        taskProgress(id, localPlayer.id)
    };

    const handleClickStart = (isButton) => {
        const collisionTasks = checkColision(localPlayer, taskTiles);

            if (collisionTasks.length > 0) {
                if (!CurrentTask) {
                    for (const task of collisionTasks) {
                        const isTaskAlreadyFinished = finishedTasks.find((t) => t.id === task.id);
                        if (!isTaskAlreadyFinished && (pressedKeys.find((k) => k.value === 'e').state || isButton) && !(localPlayer.isImpostor)) {
                            setCurrentTask(task);
                            break;
                        }
                    }
                }
            } else {
                setCurrentTask(undefined);
            }
    };

    useEffect(() => {
        if (!canvasRef.current) return;
        initInputsEvent();

        
        setInterval(() => {
            const collisionTasks = checkColision(localPlayer, taskTiles);
            if(collisionTasks.length > 0){
                setStartButton(true);
            }
            else
            {
                setStartButton(false);
            };
        }, 5);

        setInterval(() => {
            const target = getClosestEntity(localPlayer, players);
            if (localPlayer.isImpostor
                && players.length
                && target.distance <= MAX_KILL_DIST
                && !target.isDead
                && !localPlayer.hasCooldown
            ) {
                localPlayer.canKill = true;
                setKillButton(true);
            } else {
                setKillButton(false);
            }
        }, 500);

        setInterval(() => {
            const target = getClosestEntity(localPlayer, players);
            if (!target) return;
            if (target.isDead && target.distance <= MAX_KILL_DIST && !localPlayer.isDead) {
                setIsReportButtonEnabled(true);
            } else {
                setIsReportButtonEnabled(false);
            }
        }, 500);

        const context = canvasRef.current.getContext('2d');
        localPlayer = new Player(player.name, 70, 70, socket.id, context);

        if (id === socket.id) {
            setTimeout(() => {
                console.log("start game");
                startGame(id);
            }, 1000);
        }

        const initMap = async () => {
            await init(mapLobby);
            collisionTiles.push(...createCollisionTiles(mapLobby, LOBBY_WIDTH, TILE_SIZE))
            taskTiles.push(...createTaskTiles(collisionTiles, tasks));
            taskTiles.forEach((tile) => {
                lighting.objects.push(new DiscObject({ 
                    center: new Vec2(tile.x + 32, tile.y + 32), 
                    radius: 32 
                }));
            });
            collisionTiles.forEach((tile) => {
                if (tile.hitboxLight) {
                    //lighting.objects.push(tile.hitboxLight);
                }
            })
            render();
        }

        const initSocketEvents = () => {
            socket.on('playerlist', ({ playerList }) => {
                playerList.forEach((player) => {
                    players.push(new Player(player.name, 70, 70, player.id, context));
                });
            });
            socket.on('rolelist', ({ roleList }) => {
                isGameStarted = true;
                roleList.forEach((r) => {
                    if (r.id === localPlayer.id && r.role === 'impostor') {
                        setIsImpostor(true);
                        localPlayer.isImpostor = true;
                        setImpostorModal(true);
                    }
                    else if (r.id === localPlayer.id && r.role === 'crewmate') {
                        setCrewmateModal(true);
                        light.distance = DRAW_LIGHT_OFF;
                    }
                });
            });
            socket.on('newplayer', ({ name, id }) => {
                setTimeout(() => {
                    sendPosition(localPlayer.id, localPlayer.x, localPlayer.y, localPlayer.direction);
                }, 500);
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
                    playAudio(audioIds.KILL);
                } else if (localPlayer.id === targetId) {
                    localPlayer.kill();
                    setIsDead(true);
                }
            });
            socket.on('newmessage', ({ name, msg }) => {
                setChatData((prevState) => [
                    ...prevState,
                    {
                        name,
                        msg,
                    },
                ])
            });

            socket.on('report', ({ name }) => {
                setReporterName(name);
                setShowReportModal(true);
            });

            socket.on('taskprogress', ({ playerId }) => {
                console.log("player", playerId)
                if(playerId !== localPlayer.id){
                    finishedTasks.push({})
                } 
                setTaskProgression(finishedTasks.length / taskTiles.length * 100);  
            });

            socket.on('expulse', ({ player }) => {
                const target = players.find((p) => p.id === player.id);
                if (target) {
                    target.kill();
                    playAudio(audioIds.KILL);
                } else if (localPlayer.id === player.id) {
                    localPlayer.kill();
                    setIsDead(true);
                }
                setShowReportModal(false);
            });
        }

        const draw = (context) => {
            light.position = new Vec2(localPlayer.x + 32, localPlayer.y + 21);   

            lighting.compute(840, 832);    
            darkmask.compute(840, 832);
            
            drawMap(context, mapLobby.tiles, LOBBY_WIDTH, TILE_SIZE);
            players.forEach((player) => {
                if (isGameStarted) {
                    if (localPlayer.isImpostor) {
                        if (getClosestEntity(localPlayer, [player]).distance <= 270) {
                            player.draw();
                        }
                    } else {
                        if (getClosestEntity(localPlayer, [player]).distance <= 125) {
                            player.draw();
                        }
                    }
                } else {
                    player.draw();
                }   
            });

            context.globalCompositeOperation = "lighter";
            lighting.render(context);     
            context.globalCompositeOperation = "source-over";
            darkmask.render(context);

            localPlayer.draw();  
        }
        
        const render = () => {
            draw(context);
            moveEntity(localPlayer, collisionTiles);
            sendPosition(localPlayer.id, localPlayer.x, localPlayer.y, localPlayer.direction);
            handleClickStart();
            window.requestAnimationFrame(render);
        }

        initSocketEvents();
        initMap();
        getPlayerList(id);
        playAudio(audioIds.JOIN);
        //stop homeSound
        player.stopMenuMusic();
        playAudio(audioIds.LOBBY);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <div className="GameCanvas Lobby">
            <Container>
                <Row className="d-flex justify-content-center my-2">
                    <Col xs="5">
                        <div className="progress">
                            <div className={`progress-bar bg-success`}
                                style={{ width: taskProgression + '%' }}
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
                        {CurrentTask && isGameStarted && (
                            // eslint-disable-next-line react/jsx-pascal-case
                            <CurrentTask.component
                                localPlayer={localPlayer}
                                task={CurrentTask}
                                notifyEnd={onTaskEnd}
                            />
                        )}
                        <canvas ref={canvasRef} id="canvas" width="832" height="832" className="mx-auto d-flex" />
                        {isImpostor && isGameStarted && (
                            <Button className="kill-btn d-flex ml-auto mr-0" onClick={handleClickKill} disabled={!isKillButtonEnabled}>
                                KILL
                            </Button>
                        )}
                        {!isImpostor && isGameStarted && (
                            <Button className="kill-btn d-flex ml-auto mr-0" onClick={ () => handleClickStart(true) } disabled={!isStartButtonEnabled}>
                                MISSION
                            </Button>
                        )}

                    </Col>
                    <Col>
                        <PopOverContainer />
                        <Button className="d-flex ml-auto mr-0" onClick={() => setShowChat((prevState) => !prevState)}>
                            Afficher le chat
                        </Button>
                        <Button className="d-flex ml-auto mr-0" disabled={!isReportButtonEnabled} onClick={handleClickReport}>
                            Report body
                        </Button>
                        {showChat && (
                            <ModalChat
                                chatData={chatData}
                                showChat={showChat}
                                toggleModal={() => {
                                    setShowChat((prevState) => !prevState);
                                    localPlayer.setMoveState(true);
                                }}
                                onSendMessage={(msg) => sendMessage(id, localPlayer.name, msg)}
                                localPlayer={localPlayer}
                            />
                        )}
                    </Col>
                </Row>
            </Container>
            <ModalContainer openBool={isDead} toggleModal={() => setIsDead(!isDead)} />
            <ModalContainer bool={impostorModal} toggleModal={() => setImpostorModal(!impostorModal)} />
            <ModalContainer boolCrewmate={crewmateModal} toggleModal={() => setCrewmateModal(!crewmateModal)} />
            <ReportModal isOpen={showReportModal} localPlayer={localPlayer} playerList={players.filter((p) => !p.isDead)} reporterName={reporterName} vote={vote} id={id} />

        </div>
    );
};

export default GameMenu;
