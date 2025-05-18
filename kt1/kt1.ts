class User {
    static count: number = 0;
    private _name: string; //доступен и для чтения, и для изменения
    private readonly _login: string;
    private _password?: string;  // доступен только для записи
    private readonly _grade: number; // Недоступно ни для чтения, ни для записи

    constructor(name: string, login: string, password: string, grade: number) {
        this._name = name;
        this._login = login;
        this._password = password;

        if (grade > 0) {
            this._grade = grade;
        } else {
            throw new Error("Оценка - должна быть БОЛЬШЕ 0");
        }

        User.count++;
    }

    get name(): string {
        return this._name;
    }

    set name(newName: string) {
        this._name = newName;
    }

    get login(): string {
        return this._login;
    }


    set login(newLogin: string) {
        console.log("В условии написано, что изменить логин - НЕЛЬЗЯ!");
    }

    get password(): string {
        return '********';
    }

    set password(newPassword: string) {
        this._password = newPassword;
    }

    get grade(): any {
        return "Неизвестное свойство grade :/";
    }

    set grade(value: any) {
        console.log("Неизвестное свойство grade :/");
    }

    showInfo(): void {
        console.log(`Имя: ${this.name}, Логин: ${this.login}`);
    }

    eq(otherUser: User): boolean {
        return this._grade === otherUser._grade;
    }

    lt(otherUser: User): boolean {
        return this._grade < otherUser._grade;
    }

    gt(otherUser: User): boolean {
        return this._grade > otherUser._grade;
    }
}

class SuperUser extends User {
    static count: number = 0;
    private _role: string;

    constructor(name: string, login: string, password: string, role: string, grade: number) {
        super(name, login, password, grade);
        this._role = role;
        SuperUser.count++;
    }

    get role(): string {
        return this._role;
    }

    set role(newRole: string) {
        this._role = newRole;
    }

    showInfo(): void {
        console.log(`Имя: ${this.name}, Логин: ${this.login}, Роль: ${this.role}`);
    }
}

// Тестим, что вообще я написал
const user1 = new User('Alex Trofimov', 'lexx', '8080', 3);
const user2 = new User('Boy Kisser', 'meow', '7777', 2);
const user3 = new User('Artur Pirajkov', 'gigachad', '4321', 3);
const admin = new SuperUser('Vladimir Putin', 'sigma', '0000', 'God', 5);

user1.showInfo();
admin.showInfo();

let users = User.count;
let admins = SuperUser.count;

console.log(`Всего обычных пользователей: ${users}`);
console.log(`Всего супер-пользователей: ${admins}`);

console.log(user1.lt(user2));
console.log(admin.gt(user3));
console.log(user1.eq(user3));

user3.name = 'Alexandr Revva';
user1.password = 'Pa$$w0rd';

console.log(user3.name);
console.log(user2.password);
console.log(user2.login);

user2.login = 'onlygirls';

console.log(user3.grade);
admin.grade = 10;

