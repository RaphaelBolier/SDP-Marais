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

        this.startPosition = {
            x,
            y
        };
        this.mapX = 0;
        this.mapY = 0;

        this.canKill = false;
        this.hasCooldown = false;
        this.hasCooldownLight = false;

        this.width = 41;
        this.height = 62;

        this.hasVoted = false;
        this.numberVote = 0;
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

    startLightCoolDown = (time) => {
        this.hasCooldownLight = true;
        setTimeout(() => {
            this.hasCooldownLight = false;
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

    move() {
        this.mapX += (this.dx * this.speed);
        this.mapY += (this.dy * this.speed);
    }
};