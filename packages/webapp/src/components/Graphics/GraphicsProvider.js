import React, {
    createContext,
    useContext,
    useMemo,
    useCallback,
} from 'react';
import { CollisionBody } from '../../lib/Entity/CollisionBody';

const assetTexturesPath = '/textures/';
const textures = [];

const Graphics = createContext({});
export const useGraphics = () => useContext(Graphics);

export const GraphicsProvider = ({ children }) => {

    const createCollisionTiles = useCallback((map, width, tileSize) => {
        const collisionTiles = [];
        let row = 0;
        let col = 0;
        console.log(tileSize);
        const maxCol = Math.floor(width / tileSize);
        map.tiles.forEach((tile) => {
            if (tile.collide) {
                if (tile.path.includes("bas")) {
                    collisionTiles.push(new CollisionBody((col * tileSize), (row * tileSize) + (tileSize) , tile.id, tileSize, 10));
                }
                else if (tile.path.includes("haut")) {
                    collisionTiles.push(new CollisionBody((col * tileSize), (row * tileSize+10), tile.id, tileSize, 10));
                }
                else if (tile.path.includes("gauche")) {
                    collisionTiles.push(new CollisionBody((col * tileSize) , (row * tileSize), tile.id, 15, tileSize));
                }
                else if (tile.path.includes("droite")) {
                    collisionTiles.push(new CollisionBody((col * tileSize) + 49, row * tileSize, tile.id, 15, tileSize));
                }
                else {
                    collisionTiles.push(new CollisionBody((col * tileSize)+10, (row * tileSize)+10, tile.id, tileSize-30, tileSize-30));
                }

            }
            col++;
            if (col === maxCol) {
                col = 0;
                row++;
            }
        });
        return collisionTiles;
    }, []);

    const createTaskTiles = useCallback((collisionTiles, taskList) => {
        const taskTiles = [];
        collisionTiles.forEach((tile) => {
            const tempTil = taskList.find((t) => t.id === tile.id);
            if (tempTil) {
                taskTiles.push({ ...tempTil, ...tile });
            }
        })
        return taskTiles;
    }, []);

    const createImage = useCallback(async (id, url) => {
        await new Promise((resolve, reject) => {
            const img = new Image();
            img.onload = function (data) {
                textures.push({ id, texture: img });
                resolve();
            };
            img.src = url;
        });
    }, []);

    const drawImage = useCallback((ctx, id, x, y, size) => {
        var myGif;
        const gifURL = "https://upload.wikimedia.org/wikipedia/commons/a/a2/Wax_fire.gif";

        ctx.drawImage(textures.find((texture) => texture.id === id).texture, x, y, size, size);
    }, []);

    const drawMap = useCallback((ctx, tiles, mapWidth, tileSize) => {
        let row = 0;
        let col = 0;
        const maxCol = Math.floor(mapWidth / tileSize);

        tiles.forEach((tile) => {
            drawImage(ctx, tile.id, col * tileSize, row * tileSize, tileSize);
            col++;
            if (col === maxCol) {
                col = 0;
                row++;
            }
        });
    }, [drawImage])

    const init = useCallback(async (map, width, height) => {
        const uniqueTexturesId = [];
        map.tiles.forEach((tile) => {
            if (!uniqueTexturesId.find((e) => e.id === tile.id)) {
                uniqueTexturesId.push(tile);
            }
        })
        await Promise.all(uniqueTexturesId.map(async (texture) => {
            await createImage(texture.id, assetTexturesPath + texture.path);
        }));
    }, [createImage]);

    const value = useMemo(() => ({
        init,
        drawMap,
        createCollisionTiles,
        createTaskTiles,
    }), [
        init,
        drawMap,
        createCollisionTiles,
        createTaskTiles,
    ]);

    return (
        <Graphics.Provider value={value}>
            {children}
        </Graphics.Provider>
    );
};