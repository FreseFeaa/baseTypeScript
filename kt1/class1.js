"use strict";
class Point3D {
    constructor(x, y, z) {
        this.x = x;
        this.y = y;
        this.z = z;
    }
}
let coord1 = new Point3D(1, 2, 3);
let coord2 = new Point3D(5, 6, 7);
let coord3 = new Point3D(8, 9, 10);
let pointsArray = [
    coord1,
    coord2,
    coord3
];
for (let point of pointsArray) {
    console.log(point.x, point.y, point.z);
}
