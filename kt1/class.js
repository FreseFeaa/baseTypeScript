class Point3D {
}
let coord1 = new Point3D();
let coord2 = new Point3D();
let coord3 = new Point3D();
let pointsArray = [
    coord1,
    coord2,
    coord3
];
for (let point of pointsArray) {
    point.x = 1;
    point.y = 2;
    point.z = 3;
    console.log(point.x, point.y, point.z);
}
