"use strict";
var CarriageState;
(function (CarriageState) {
    CarriageState[CarriageState["UP"] = 0] = "UP";
    CarriageState[CarriageState["DOWN"] = 1] = "DOWN";
})(CarriageState || (CarriageState = {}));
var LineColor;
(function (LineColor) {
    LineColor["BLACK"] = "\u26AB \u0427\u0451\u0440\u043D\u044B\u0439";
    LineColor["RED"] = "\uD83D\uDD34 \u041A\u0440\u0430\u0441\u0441\u043D\u044B\u0439";
    LineColor["GREEN"] = "\uD83D\uDFE2 \u0417\u0435\u043B\u044C\u043E\u043D\u044B\u0439";
})(LineColor || (LineColor = {}));
class LogToConsole {
    log(message) {
        console.log(message);
    }
}
class LineDrawer {
    constructor(logger) {
        this.logger = logger;
    }
    drawLine(from, to, color) {
        this.logger.log(`🖋️ ...Чертим линию из (${from.x}, ${from.y}) в (${to.x}, ${to.y}) используя ${color} цвет.`);
    }
}
class PositionCalculator {
    calcNewPosition(distance, angle, current) {
        const angle_in_rads = angle * (Math.PI / 180.0) * 1.0;
        const x = current.x + distance * Math.cos(angle_in_rads);
        const y = current.y + distance * Math.sin(angle_in_rads);
        return { x: Math.round(x), y: Math.round(y) };
    }
}
class Plotter {
    constructor(logger, initialPosition = { x: 0, y: 0 }, initialAngle = 0, initialColor = LineColor.BLACK, initialCarriageState = CarriageState.UP) {
        this.logger = logger;
        this.state = { position: initialPosition,
            angle: initialAngle,
            color: initialColor,
            carriageState: initialCarriageState
        };
        this.lineDrawer = new LineDrawer(logger);
        this.positionCalculator = new PositionCalculator();
    }
    move(distance) {
        let newPosition = this.positionCalculator.calcNewPosition(distance, this.state.angle, this.state.position);
        if (this.state.carriageState === CarriageState.DOWN) {
            this.lineDrawer.drawLine(this.state.position, newPosition, this.state.color);
        }
        else {
            this.logger.log(`🏃🏻‍♂️  Передвигаем на ${distance} от точки (${this.state.position.x}, ${this.state.position.y})`);
        }
        this.state.position = newPosition;
    }
    turn(angle) {
        this.logger.log(`🔄  Поворачиваем на ${angle} градусов`);
        this.state.angle = (this.state.angle + angle) % 360.0;
    }
    carriageUp() {
        this.logger.log("⬆️   Поднимаем каретку");
        this.state.carriageState = CarriageState.UP;
    }
    carriageDown() {
        this.logger.log("⬇️   Опускаем каретку");
        this.state.carriageState = CarriageState.DOWN;
    }
    setColor(color) {
        if (typeof color === 'string') {
            if (color === '⚫ Чёрный') {
                this.state.color = LineColor.BLACK;
            }
            else if (color === '🔴 Крассный') {
                this.state.color = LineColor.RED;
            }
            else if (color === '🟢 Зельоный') {
                this.state.color = LineColor.GREEN;
            }
            this.logger.log(`🎨  Устанавливаем ${color} цвет линии.`);
        }
        else {
            this.logger.log(`🎨  Устанавливаем ${color} цвет линии.`);
            this.state.color = color;
        }
    }
    setPosition(position) {
        this.logger.log(`🗺️   Устанавливаем позицию каретки в (${position.x}, ${position.y}).`);
        this.state.position = position;
    }
}
class FigureDrawer {
    constructor(logger) {
        this.logger = logger;
    }
    drawTriangle(plt, size) {
        this.logger.log("\n🔺  Рисуем треугольник\n");
        plt.setColor('🟢 Зельоный');
        for (let i = 0; i < 3; ++i) {
            plt.carriageDown();
            plt.move(size);
            plt.carriageUp();
            plt.turn(120.0);
        }
        this.logger.log("✅  Готово\n");
    }
    drawSquare(plt, size) {
        this.logger.log("\n🟥  Рисуем квадрат\n");
        plt.carriageDown();
        for (let i = 0; i < 4; ++i) {
            plt.move(size);
            plt.turn(90.0);
        }
        plt.carriageUp();
        this.logger.log("✅  Готово\n");
    }
}
const logger = new LogToConsole();
const plotter = new Plotter(logger);
const figureDrawer = new FigureDrawer(logger);
figureDrawer.drawTriangle(plotter, 100.0);
console.log("\n⚙️   Подготовка...");
plotter.setPosition({ x: 10.0, y: 10.0 });
plotter.setColor(LineColor.RED);
figureDrawer.drawSquare(plotter, 80.0);
