export class Entity {
    constructor(x, y, context) {
        this.x = x;
        this.y = y;
    
        this.width = 64;
        this.height = 64;

        this.dx = 0;
        this.dy = 0;
        this.speed = 1;

        this.frameX = 0;
        this.frameY = 0;
        this.canDrawNextFrame = true;
        this.drawTime = 100;

        this.context = context;
    }


    move() {
        this.x += (this.dx * this.speed);
        this.y += (this.dy * this.speed);
    }
};