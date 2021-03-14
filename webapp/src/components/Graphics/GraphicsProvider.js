import React, {
	createContext,
	useContext,
	useMemo,
    useCallback,
} from 'react';

const assetTexturesPath = '/textures/';
const textures = [];

const Graphics = createContext({});
export const useGraphics = () => useContext(Graphics);

export const GraphicsProvider = ({ children }) => {

    const createImage = useCallback(async (id, url) => {
        await new Promise((resolve, reject) => {
            const img = new Image();
            img.onload = function(data){
                textures.push({ id, texture: img });
                resolve();    
            };
            img.src = url;
        });
    }, []);

    const drawImage = useCallback((ctx, id, x, y, size) => {
        ctx.drawImage(textures.find((texture) => texture.id === id).texture , x, y, size, size);
    }, []);

    const drawMap = useCallback((ctx, tiles, mapWidth, tileSize) => {
        let row = 0;
        let col = 0;
        const maxCol = Math.floor(mapWidth / tileSize);
        
        tiles.forEach((tile) => {
            drawImage(ctx, tile.id, col * tileSize, row * tileSize, tileSize);
            col++;
            if(col === maxCol) {
                col = 0;
                row++;
            }
        });
    }, [drawImage])

    const init = useCallback(async (map) => {
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
	}), [
		init,
        drawMap,
	]);

	return (
		<Graphics.Provider value={value}>
			{children}
		</Graphics.Provider>
	);
};