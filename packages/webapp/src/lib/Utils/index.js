export const get2DDistance = (localPlayer, b) => {
    const ret = Math.sqrt(
        Math.pow(
            (localPlayer.startPosition.x - localPlayer.mapX) - b.x, 2)
        + Math.pow(
            (localPlayer.startPosition.y - localPlayer.mapY) - b.y, 2)
    );
    return ret;
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