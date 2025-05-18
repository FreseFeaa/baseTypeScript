// tsc -w чтобы видеть изменения

// сигма коммент, который удалится из файла.js
let salary: number = 100000;

let bool: boolean;
bool = true;

let y = 1;
let x: 123;

// виды массива
let arrr: Array<number>;
arrr = [1, 2, 3, 4, 1234];
let arrrNum: number[];
arrrNum = [1, 12, 123, 1234];

let anya: any[];
anya = ["qwe", "asd", "123"];

function sayHelloToUser(userName?: string): void { //знак вопроса = необязательный параметр
    console.log(`qq, ${userName}`)
}

function sayByeToUser(userName: string): string {
    return `see ya, ${userName}`
}

sayHelloToUser();
sayByeToUser("Ella").toLowerCase();

let id: strOrNum;
id = 123
id = "qwerty"

type strOrNum = number | string
let idNew: strOrNum;
idNew = 123
idNew = "qwerty"

class ClassName {
    x: number = 0;
    id: number | string = "104";
}

let new_class: ClassName = new ClassName();

console.log(new_class.x)