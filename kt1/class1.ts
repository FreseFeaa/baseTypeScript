class Point3D {
    x:number;
    y:number;
    z:number;

    constructor(x: number, y: number, z: number){
        this.x = x
        this.y = y
        this.z = z
    }
}


let coord1: Point3D = new Point3D(1,2,3);
let coord2: Point3D = new Point3D(5,6,7);
let coord3: Point3D = new Point3D(8,9,10);

// let pointsArray: Point3D[] = [
//     new Point3D(),
//     new Point3D(),
//     new Point3D()
// ]

let pointsArray: Point3D[] = [
    coord1,
    coord2,
    coord3
]

for (let point of pointsArray) {
    console.log(point.x, point.y, point.z)
}