class Point {
	x: number;
	y: number;

    constructor(x?: number, y?: number){
        this.x = x || 0;
        this.y = y || 0;
    }

}

class Line {
    start: Point;
    end: Point;

    constructor(start: Point, end: Point){
        this.start = start
        this.end = end
    }

    info(): void {
        console.log(`Моя линия: Старт(${this.start.x},${this.start.y}), Конец (${this.end.x},${this.end.y})`)
    }
}

let lineStart: Point = new Point(1,1);
let lineEnd: Point = new Point(2,2);

let line1: Line = new Line(lineStart,lineEnd);
let line2: Line = new Line(lineStart,lineEnd);

let lineArray: Line[] = [ line1, line2]

for (let line of lineArray) {
    line.info()
}