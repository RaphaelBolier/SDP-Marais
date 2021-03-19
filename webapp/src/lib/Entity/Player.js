import { Entity } from "./Entity.js";

export class Player extends Entity {
    constructor(name, x, y, id, context) {
        super(x, y, context);
        this.name = name;

        this.canMoveUp = true;
        this.canMoveDown = true;
        this.canMoveRight = true;
        this.canMoveLeft = true;

        this.id = id;
    }


    draw = () => {
        this.context.fillStyle = "white";
        this.context.fillRect(this.x, this.y, this.width, this.height);
    }
};