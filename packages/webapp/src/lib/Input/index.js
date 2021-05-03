import { Direction } from '../Entity/Entity';

export const pressedKeys = [
    {
        state: false,
        value: 'z',
    },
    {
        state: false,
        value: 'q',
    },
    {
        state: false,
        value: 's',
    },
    {
        state: false,
        value: 'd',
    },
    {
        state: false,
        value: 'a',
    },
    {
        state: false,
        value: 'e',
    },
    {
        state: false,
        value: 'p',
    },
    {
        state: false,
        value: 'm',
    },
];
let a = false;

export const initInputsEvent = () => {   

    document.addEventListener('keypress', e => {
        pressedKeys.forEach(key => {
            if(e.key === key.value) {
                key.state = true;
            }
        });          
    });

    document.addEventListener('keyup', e => {
        pressedKeys.forEach(key => {
            if(e.key === key.value) {
                key.state = false;
            }
        });                  
    });
}

export const checkColision = (entity, collisionTiles) => {
    const collisionObjects = [];
    
    if (a)  return collisionObjects;
    
    for(const tile of collisionTiles) {
        //collision arete gauche
        if (entity.startPosition.x - entity.mapX + entity.width === tile.x
            &&entity.startPosition.y - entity.mapY + entity.height > tile.y
            &&entity.startPosition.y - entity.mapY < tile.y + tile.height) {
                collisionObjects.push(tile);
                entity.canMoveRight = false;
                break;
        } else {
            entity.canMoveRight = true;
        }
    };
    for(const tile of collisionTiles) {
        //collision arete droite
        if (entity.startPosition.x - entity.mapX === tile.x + tile.width
            &&entity.startPosition.y - entity.mapY + entity.height > tile.y
            &&entity.startPosition.y - entity.mapY < tile.y + tile.height) {
                collisionObjects.push(tile);
                entity.canMoveLeft = false;
                break;
        } else {
            entity.canMoveLeft = true;
        }
    };
    for(const tile of collisionTiles) {
        //collision arete bas
        if (entity.startPosition.x - entity.mapX + entity.width > tile.x && entity.startPosition.x - entity.mapX < tile.x + tile.width
            &&entity.startPosition.y - entity.mapY === tile.y + tile.height) {
                collisionObjects.push(tile);
                entity.canMoveUp = false;
                break;
        } else {
            entity.canMoveUp = true;
        }
    };
    for(const tile of collisionTiles) {
        //collision arete haut
        if (entity.startPosition.x - entity.mapX + entity.width > tile.x && entity.startPosition.x - entity.mapX < tile.x + tile.width
            &&entity.startPosition.y - entity.mapY + entity.height === tile.y) {
                collisionObjects.push(tile);
                entity.canMoveDown = false;
                break;
        } else {
            entity.canMoveDown = true;
        }
    };

    if (!entity.canMoveUp || !entity.canMoveDown) entity.dy = 0;
    if (!entity.canMoveLeft || !entity.canMoveRight) entity.dx = 0;
    return collisionObjects;
};


export const moveEntity = (entity, collisionTiles) => {
    let keyState = false;
    checkColision(entity, collisionTiles);
    if (entity.forcedStop) return;
    pressedKeys.forEach(key => {
        if(key.value === 'z' && key.state && entity.canMoveUp) {
            entity.dy = 1;
            entity.direction = Direction.HAUT;
        }      
        if(key.value === 's' && key.state && entity.canMoveDown) {
            entity.dy = -1;
            entity.direction = Direction.BAS;
        }        
        if(key.value === 'q' && key.state && entity.canMoveLeft) {
            entity.dx = 1;
            entity.direction = Direction.GAUCHE;
        }  
        if(key.value === 'd' && key.state && entity.canMoveRight) {
            entity.dx = -1;
            entity.direction = Direction.DROITE;
        }     
        if(key.value === 'p' && key.state) {
            a = true;
        }  
        if(key.value === 'm' && key.state) {
            a = false;
        }  
    });
    const noY = pressedKeys.filter((key) => (key.value === 'z' || key.value === 's') && !key.state).length === 2;
    const noX = pressedKeys.filter((key) => (key.value === 'q' || key.value === 'd') && !key.state).length === 2;

    if (noY) entity.dy = 0;
    if (noX) entity.dx = 0;
    if(noY && noX) entity.direction = Direction.NONE;
    entity.move();
    return keyState;
}