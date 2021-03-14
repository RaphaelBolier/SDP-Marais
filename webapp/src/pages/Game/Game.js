import { useEffect, useRef, } from 'react';
import { useParams } from "react-router-dom";

import { useGraphics } from '../../components/Graphics/GraphicsProvider';
import mapLobby from '../../assets/map/lobby/lobby.json';

import './GameCreate.scss';

const GameMenu = () => {
    const { id } = useParams();
    const { init, drawMap } = useGraphics();
    const canvasRef = useRef();

    useEffect(() => {
        if (!canvasRef.current) return;

        const context = canvasRef.current.getContext('2d');

        const initMap = async () => {
            await init(mapLobby);
            render();
        }
        initMap();

        const draw = (context) => {
            drawMap(context, mapLobby.tiles, 576, 64);
        }

        const render = () => {
            draw(context);
            window.requestAnimationFrame(render);
        }
        
    }, []);

    return (
        <div>
            <canvas ref={canvasRef} id="canvas" width="576" height="576" />
            <p> partie: {id} </p>
        </div>
    );
};

export default GameMenu;
