import { Entity } from "./Entity.js";
export class Player extends Entity {
    constructor(name, x, y, id, context) {
        super(x, y, context);
        this.name = name;
        this.isDead = false;
        this.canMoveUp = true;
        this.canMoveDown = true;
        this.canMoveRight = true;
        this.canMoveLeft = true;
        this.forcedStop = false;
        this.id = id;

        this.canKill = false;
        this.hasCooldown = false;
    }

    setMoveState = (state) => {
        this.canMoveUp = state;
        this.canMoveDown = state;
        this.canMoveRight = state;
        this.canMoveLeft = state;
        this.forcedStop = !state;
    }

    startKillCoolDown = (time) => {
        this.hasCooldown = true;
        setTimeout(() => {
            this.hasCooldown = false;
        }, time);
    }

    draw = () => {
        this.context.fillStyle = this.isDead ? "red" : "white";
        this.context.fillRect(this.x, this.y, this.width, this.height);
        this.context.save();
        this.context.fillStyle = "white";
        this.context.font = "20px Arial";
        this.context.fillText(this.name, this.x + (this.width / 2) - this.context.measureText(this.name).width / 2, this.y);
        this.context.restore();
    }
};