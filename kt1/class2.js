"use strict";
class Point {
    constructor(x, y) {
        this.x = x || 0;
        this.y = y || 0;
    }
}
class Line {
    constructor(start, end) {
        this.start = start;
        this.end = end;
    }
    info() {
        console.log(`Моя линия: Старт(${this.start.x},${this.start.y}), Конец (${this.end.x},${this.end.y})`);
    }
}
let lineStart = new Point(1, 1);
let lineEnd = new Point(2, 2);
let line1 = new Line(lineStart, lineEnd);
let line2 = new Line(lineStart, lineEnd);
let lineArray = [line1, line2];
for (let line of lineArray) {
    line.info();
}
