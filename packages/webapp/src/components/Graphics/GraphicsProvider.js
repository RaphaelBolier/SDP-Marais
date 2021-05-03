import React, {
    createContext,
    useContext,
    useMemo,
    useCallback,
} from 'react';
import { CollisionBody } from '../../lib/Entity/CollisionBody';
const {Vec2, RectangleObject} = window.illuminated;

const assetTexturesPath = '/textures/';
let textures = [];

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
                    collisionTiles[collisionTiles.length - 1].hitboxLight = new RectangleObject({
                        topleft: new Vec2(col * tileSize, row * tileSize),
                        bottomright: new Vec2(col * tileSize + tileSize, row * tileSize + tileSize)
                    });
                }
                else if (tile.path.includes("haut")) {
                    collisionTiles.push(new CollisionBody((col * tileSize), (row * tileSize+10), tile.id, tileSize, 10));
                    collisionTiles[collisionTiles.length - 1].hitboxLight = new RectangleObject({
                        topleft: new Vec2(col * tileSize, row * tileSize),
                        bottomright: new Vec2(col * tileSize + tileSize, row * tileSize + tileSize)
                    });
                }
                else if (tile.path.includes("gauche")) {
                    collisionTiles.push(new CollisionBody((col * tileSize) , (row * tileSize), tile.id, 15, tileSize));
                    collisionTiles[collisionTiles.length - 1].hitboxLight = new RectangleObject({
                        topleft: new Vec2(col * tileSize, row * tileSize),
                        bottomright: new Vec2(col * tileSize + tileSize, row * tileSize + tileSize)
                    });
                }
                else if (tile.path.includes("droite")) {
                    collisionTiles.push(new CollisionBody((col * tileSize) + 49, row * tileSize, tile.id, 15, tileSize));
                    collisionTiles[collisionTiles.length - 1].hitboxLight = new RectangleObject({
                        topleft: new Vec2(col * tileSize, row * tileSize),
                        bottomright: new Vec2(col * tileSize + tileSize, row * tileSize + tileSize)
                    });
                }
                else {
                    collisionTiles.push(new CollisionBody((col * tileSize)+10, (row * tileSize)+10, tile.id, tileSize-30, tileSize-30));
                    collisionTiles[collisionTiles.length - 1].hitboxLight = new RectangleObject({
                        topleft: new Vec2(col * tileSize, row * tileSize),
                        bottomright: new Vec2(col * tileSize + tileSize, row * tileSize + tileSize)
                    });
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
        try {
            //console.log("textures: ")
            ctx.drawImage(textures.find((texture) => texture.id === id).texture, x, y, size, size);
        } catch(err) {
  
            //console.log('ID:', id);
        }
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
        textures = [];
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