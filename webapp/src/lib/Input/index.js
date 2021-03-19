const pressedKeys = [
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
];

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

export const moveEntity = entity => {
    let keyState = false;    
    pressedKeys.forEach(key => {  
        if(key.value === 'z' && key.state && entity.canMoveUp) {
            entity.dy = -1;
        }      
        if(key.value === 's' && key.state && entity.canMoveDown) {
            entity.dy = 1;
        }        
        if(key.value === 'q' && key.state && entity.canMoveLeft) {
            entity.dx = -1;
        }  
        if(key.value === 'd' && key.state && entity.canMoveRight) {
            entity.dx = 1;
        }       
    });
    const noY = pressedKeys.filter((key) => (key.value === 'z' || key.value === 's') && !key.state).length === 2;
    const noX = pressedKeys.filter((key) => (key.value === 'q' || key.value === 'd') && !key.state).length === 2;

    if (noY) entity.dy = 0;
    if (noX) entity.dx = 0;


    return keyState;
}