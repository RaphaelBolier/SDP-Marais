import { useEffect, useRef, } from 'react';
import { useParams } from "react-router-dom";

import { initInputsEvent, moveEntity } from '../../lib/Input';
import { Player } from '../../lib/Entity/Player';
import { useGraphics } from '../../components/Graphics/GraphicsProvider';
import { usePlayer } from '../../components/Player/PlayerContext';
import { useSockets } from '../../components/wsapi/WSockets';
import mapLobby from '../../assets/map/lobby/lobby.json';

import './GameCreate.scss';

const GameMenu = () => {
    const { id } = useParams();
    const { init, drawMap } = useGraphics();
    const { player } = usePlayer();
    const { socket } = useSockets();
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
        
        const draw = (context) => {
            drawMap(context, mapLobby.tiles, 576, 64);
            localPlayer.draw();
        }

        const render = () => {
            draw(context);
            moveEntity(localPlayer);
            localPlayer.move();
            window.requestAnimationFrame(render);
        }
    
        initMap();
    }, []);

    return (
        <div>
            <canvas ref={canvasRef} id="canvas" width="576" height="576" />
            <p> partie: {id} </p>
        </div>
    );
};

export default GameMenu;
