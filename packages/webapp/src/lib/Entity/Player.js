import { Entity, Direction } from "./Entity.js";
import playerSpriteFile from '../../assets/sprites/player/playerSprite.png';
export class Player extends Entity {
    constructor(name, x, y, id, context) {
        super(x, y, context, playerSpriteFile);
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

        this.width = 48;
        this.height = 74;
    }

    setMoveState = (state) => {
        this.canMoveUp = state;
        this.canMoveDown = state;
        this.canMoveRight = state;
        this.canMoveLeft = state;
        this.forcedStop = !state;
        this.direction = Direction.NONE;
    }

    startKillCoolDown = (time) => {
        this.hasCooldown = true;
        setTimeout(() => {
            this.hasCooldown = false;
        }, time);
    }

    draw = () => {
        this.context.save();
        this.context.fillStyle = "white";
        this.context.font = "20px Arial";
        this.context.fillText(this.name, this.x + (this.width / 2) - this.context.measureText(this.name).width / 2, this.y);
        this.context.restore();
        super.draw();
    }
};