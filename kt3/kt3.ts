/**
  • Плоттер все также поддерживает пять команд:

  • 1. Переместить каретку на некоторое расстояние в текущем направлении.
  • 2. Повернуть на определенное количество градусов по часовой стрелке или против часовой стрелки.
  • 3. Опустить или поднять каретку. Когда каретка опущена, плоттер при перемещении рисует линию.
  • 4. Установить цвет линии (один из черного, красного или зелёного).
  • 5. Установить начальную позицию каретки.
 */


  //Объявление типов
type Point = number;
type Distance = number;
type Angle = number;
type Position = { x: Point; y: Point };
enum CarriageState {
  UP,
  DOWN
}
enum LineColor {
  BLACK = "⚫ Чёрный",
  RED = "🔴 Крассный",
  GREEN = "🟢 Зельоный"
}
type PlotterState = {
  position: Position;
  angle: Angle;
  color: LineColor;
  carriageState: CarriageState;
};

//Интерфейс Логгера (Все по тз)
interface Logger{
 log(message: string): void;
}

//Класс LogToConsole - который реализует интерфейс Logger (Выводит инфу в консоль)
class LogToConsole implements Logger{
    log(message: string): void {
        console.log(message);
    }
}


//     Функции плотера


// Класс линии "рисовать"

class LineDrawer {
    private logger: Logger;

    constructor(logger: Logger) {
        this.logger = logger;
    }

    // Чертит линию от координат from к координатам to
    drawLine(from: Position, to: Position, color: LineColor): void {
        this.logger.log(`🖋️ ...Чертим линию из (${from.x}, ${from.y}) в (${to.x}, ${to.y}) используя ${color} цвет.`);
    }
}


// Класс вычисления позиций

class PositionCalculator {
    
    //Вычисляет и возвращает новую позицию
    
    calcNewPosition(distance: Distance, angle: Angle, current: Position): Position {
        // Преобразуем градусы в радианы при 180.0 градусов = 1 pi радиан (Хоть где-то матеша пригодилась)
        const angle_in_rads = angle * (Math.PI / 180.0) * 1.0;
        // новая позиция
        const x = current.x + distance * Math.cos(angle_in_rads);
        const y = current.y + distance * Math.sin(angle_in_rads);
        // возвращаем новую позицию
        return {x: Math.round(x), y: Math.round(y)};
    }
}

//Sigma plotter классс
class Plotter {
    private state: PlotterState;
    private logger: Logger;
    private lineDrawer: LineDrawer;
    private positionCalculator: PositionCalculator;

    constructor(logger: Logger, initialPosition: Position = {x: 0, y: 0}, initialAngle: Angle = 0, initialColor: LineColor = LineColor.BLACK, initialCarriageState: CarriageState = CarriageState.UP) {
        this.logger = logger;
        this.state = {             position: initialPosition,
            angle: initialAngle,
            color: initialColor,
            carriageState: initialCarriageState
        };
        this.lineDrawer = new LineDrawer(logger);
        this.positionCalculator = new PositionCalculator();
    }
    //Ходить
    move(distance: Distance): void {
        // вычисляем новую позицию
        let newPosition = this.positionCalculator.calcNewPosition(distance, this.state.angle, this.state.position);
        // draw line if needed
        if (this.state.carriageState === CarriageState.DOWN) {
            // Здесь следует отрисовка линии
            this.lineDrawer.drawLine(this.state.position, newPosition, this.state.color);
        } else {
            this.logger.log(`🏃🏻‍♂️  Передвигаем на ${distance} от точки (${this.state.position.x}, ${this.state.position.y})`);
        }
        // изменяем состояние
        this.state.position = newPosition;
    }
    //Вращаться
    turn(angle: Angle): void {
        this.logger.log(`🔄  Поворачиваем на ${angle} градусов`);
        // вычисляем новый угол
        this.state.angle = (this.state.angle + angle) % 360.0;
    }
    //Поднять каретку
    carriageUp(): void {
        this.logger.log("⬆️   Поднимаем каретку");
        this.state.carriageState = CarriageState.UP;
    }
    //Опустить каретку
    carriageDown(): void {
        this.logger.log("⬇️   Опускаем каретку");
        this.state.carriageState = CarriageState.DOWN;
    }
    //Сменить цвет
    setColor(color: LineColor | string): void {
        if (typeof color === 'string'){
            if (color === '⚫ Чёрный'){
                this.state.color = LineColor.BLACK;
            }
            else if(color === '🔴 Крассный'){
                this.state.color = LineColor.RED
            } else if(color === '🟢 Зельоный'){
                this.state.color = LineColor.GREEN
            }
            this.logger.log(`🎨  Устанавливаем ${color} цвет линии.`);

        }
        else{
            this.logger.log(`🎨  Устанавливаем ${color} цвет линии.`);
            this.state.color = color;
        }


    }
    //Позиций каретк
    setPosition(position: Position): void {
        this.logger.log(`🗺️   Устанавливаем позицию каретки в (${position.x}, ${position.y}).`);
        this.state.position = position;
    }
}


// Класс для Чертить Фигура
class FigureDrawer {
    //Сюда еще Логгер прокинул, чтоб по красоте все было
    private logger: Logger;
        constructor(logger: Logger) {
        this.logger = logger;
    }
    drawTriangle(plt: Plotter, size: Distance): void {
        this.logger.log("\n🔺  Рисуем треугольник\n")
        plt.setColor('🟢 Зельоный');
        for (let i = 0; i < 3; ++i) {
            plt.carriageDown();
            plt.move(size);
            plt.carriageUp();
            plt.turn(120.0);
        }
        this.logger.log("✅  Готово\n")
    }

    drawSquare(plt: Plotter, size: number): void {
        this.logger.log("\n🟥  Рисуем квадрат\n")
        plt.carriageDown();
        for (let i = 0; i < 4; ++i) {
            plt.move(size);
            plt.turn(90.0);
        }
        plt.carriageUp();
        this.logger.log("✅  Готово\n")
        
    }
}


//Основа (Делаем консольку)
const logger = new LogToConsole();

//Чертимся по полной
const plotter = new Plotter(logger);
const figureDrawer = new FigureDrawer(logger);


figureDrawer.drawTriangle(plotter, 100.0);

console.log("\n⚙️   Подготовка...")
plotter.setPosition({x: 10.0, y: 10.0});
plotter.setColor(LineColor.RED);

figureDrawer.drawSquare(plotter, 80.0);