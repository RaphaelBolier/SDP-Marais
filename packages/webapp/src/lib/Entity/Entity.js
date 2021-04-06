export const Direction = {
    DROITE: 2,
    GAUCHE: 1,
    HAUT: 3,
    BAS: 0,
    DEAD: 4,
    NONE: -1,
};

export class Entity {
    constructor(x, y, context, spriteFile) {
        this.x = x;
        this.y = y;
    
        this.width = 64;
        this.height = 64;
        this.scaleX = 64;
        this.scaleY = 64;
        this.frameX = 0;

        this.dx = 0;
        this.dy = 0;
        this.speed = 1;
      
        this.canDrawNextFrame = true;
        this.drawTime = 100;

        this.direction = Direction.DROITE;

        const _this = this;
        const img = new Image();
        img.onload = function(data){
            _this.sprite = img;  
        };
        img.src = spriteFile;

        this.context = context;
    }

    kill() {
        this.isDead = true;
        this.direction = Direction.DEAD;
    }

    draw() {
        if (!this.sprite) return;
        this.drawFrame();
        if (this.direction !== Direction.NONE) {
            this.nextFrame();
        } else {
            this.frameX = 1;
        }
    }

    drawFrame = () => {  
        this.context.drawImage(
            this.sprite,
            this.frameX * this.width,
            ((this.direction >= 0 ? this.direction : Direction.BAS) + (this.isDead ? 5 : 0)) * this.height,
            this.width,
            this.height,
            this.x,
            this.y,
            this.scaleX,
            this.scaleY,
        );
    }

    nextFrame() {
        if (this.canDrawNextFrame) {
            if (this.frameX++ > this.sprite.width / this.width - 2) {
                this.frameX = 0;
            }
            this.canDrawNextFrame = false;
            setTimeout(() => {
                this.canDrawNextFrame = true;
            }, this.drawTime);
        }
    }

    move() {
        this.x += (this.dx * this.speed);
        this.y += (this.dy * this.speed);
    }
};