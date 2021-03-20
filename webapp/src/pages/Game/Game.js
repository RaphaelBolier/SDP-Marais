import { useEffect, useRef, useState, } from 'react';
import { useParams } from "react-router-dom";

import { initInputsEvent, moveEntity } from '../../lib/Input';
import { Player } from '../../lib/Entity/Player';
import { useGraphics } from '../../components/Graphics/GraphicsProvider';
import { usePlayer } from '../../components/Player/PlayerContext';
import { useSockets } from '../../components/wsapi/WSockets';
import { useAudios } from '../../components/Audio/AudioProvider';
import mapLobby from '../../assets/map/lobby/lobby.json';

import './GameCreate.scss';

const players = [];
const GameMenu = () => {
    const { id } = useParams();
    const { init, drawMap } = useGraphics();
    const { player } = usePlayer();
    const { socket } = useSockets();
    const { playAudio, audioIds } = useAudios();
    const canvasRef = useRef();

    useEffect(() => {
        if (!canvasRef.current) return;
        initInputsEvent();
        
        const context = canvasRef.current.getContext('2d');
        const localPlayer = new Player(player.name, 70, 70, socket.id, context);

        const initMap = async () => {
            await init(mapLobby);
            render();
        }

        const initSocketEvents = () => {
            socket.on('newplayer', ({ name, id }) => {
                players.push(new Player(name, 70, 70, id, context));
                playAudio(audioIds.JOIN);
            });
        }
        
        const draw = (context) => {
            drawMap(context, mapLobby.tiles, 576, 64);
            localPlayer.draw();
            players.forEach((player) => player.draw());
        }

        const render = () => {
            draw(context);
            moveEntity(localPlayer);
            window.requestAnimationFrame(render);
        }

        initSocketEvents();
        initMap();
        playAudio(audioIds.JOIN);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <div>
            <canvas ref={canvasRef} id="canvas" width="576" height="576" />
            <p> partie: {id} </p>
        </div>
    );
};

export default GameMenu;
