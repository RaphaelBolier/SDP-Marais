import '../../lib/Illuminated';
export class CollisionBody {
    constructor(x, y, id, width, height) {
        this.x = x;
        this.y = y;
        this.hitboxLight = undefined;
        this.id = id;
        this.width = width;
        this.height = height;
    }
};