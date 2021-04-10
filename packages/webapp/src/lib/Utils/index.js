export const get2DDistance = (a, b) => {
    return Math.sqrt(
        Math.pow(b.x - a.x, 2) + Math.pow(b.y - a.y, 2)
    );
}

export const getClosestEntity = (me, entitys) => {
    const distances = entitys.map((e) => ({
        distance: get2DDistance(me, e),
        id: e.id,
        position: {
            x: e.x,
            y: e.y,
        },
        isDead: e.isDead,
    }));
    let minDist = distances[0];
    distances.forEach((dst) => {
        if (dst.distance < minDist.distance) {
            minDist = dst;
        }
    });
    return minDist;
}