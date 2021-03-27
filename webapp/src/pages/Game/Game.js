import { useEffect, useRef, useState, } from 'react';
import { useParams } from "react-router-dom";
import { Button } from 'reactstrap';

import { initInputsEvent, moveEntity } from '../../lib/Input';
import { Player } from '../../lib/Entity/Player';
import { useGraphics } from '../../components/Graphics/GraphicsProvider';
import { usePlayer } from '../../components/Player/PlayerContext';
import { useSockets } from '../../components/wsapi/WSockets';
import { useAudios } from '../../components/Audio/AudioProvider';
import { getClosestEntity } from '../../lib/Utils';
import mapLobby from '../../assets/map/lobby/lobby.json';
import  PopOverContainer  from '../../components/Popover/PopOverContainer';

import './GameCreate.scss';

const MAX_KILL_DIST = 100;
const KILL_COOLDOWN = 10 * 1000;
const players = [];
let localPlayer = undefined;

const GameMenu = () => {
    const { id } = useParams();
    const { init, drawMap } = useGraphics();
    const { player } = usePlayer();
    const { socket, sendPosition, getPlayerList, startGame, killCrewMate } = useSockets();
    const { playAudio, audioIds } = useAudios();
    const canvasRef = useRef();
    const [isImpostor, setIsImpostor] = useState(false);
    const [isKillButtonEnabled, setKillButton] = useState(false);

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
            socket.on('playerposition', ({ id, x, y }) => {
                const target = players.find((player) => player.id === id);
                if (target) { 
                    target.x = x;
                    target.y = y;
                }
            }); 
            socket.on('playerkilled', ({ targetId }) => {
                const target = players.find((player) => player.id === targetId);
                if (target) { 
                    target.isDead = true;
                } else if (localPlayer.id === targetId) {
                    localPlayer.isDead = true;
                }
            });    
        }
        
        const draw = (context) => {
            drawMap(context, mapLobby.tiles, 576, 64);
            localPlayer.draw();
            players.filter((player) => !player.isDead).forEach((player) => player.draw());
        }

        const render = () => {
            draw(context);
            moveEntity(localPlayer);
            sendPosition(localPlayer.id, localPlayer.x, localPlayer.y);
            window.requestAnimationFrame(render);
        }

        initSocketEvents();
        initMap();
        getPlayerList(id);
        playAudio(audioIds.JOIN);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <div>
            <canvas ref={canvasRef} id="canvas" width="576" height="576" />
            <p> partie: {id} </p>
            { isImpostor && (
                <Button onClick={handleClickKill} disabled={!isKillButtonEnabled}>
                    KILL
                </Button>
            )}
            <PopOverContainer/>
        </div>
    );
};

export default GameMenu;
