import '../../lib/Illuminated';


const {Vec2, DiscObject} = window.illuminated;

export class CollisionBody {
    constructor(x, y, id, width, height) {
        this.x = x;
        this.y = y;
        this.hitboxLight = new DiscObject({ 
            center: new Vec2(this.x + 32, this.y + 32), 
            radius: 32 
        });
        this.id = id;
        this.width = width;
        this.height = height;
    }
};