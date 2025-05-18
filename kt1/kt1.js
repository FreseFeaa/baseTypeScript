var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var User = /** @class */ (function () {
    function User(name, login, password, grade) {
        this._name = name;
        this._login = login;
        this._password = password;
        if (grade > 0) {
            this._grade = grade;
        }
        else {
            throw new Error("Оценка - должна быть БОЛЬШЕ 0");
        }
        User.count++;
    }
    Object.defineProperty(User.prototype, "name", {
        get: function () {
            return this._name;
        },
        set: function (newName) {
            this._name = newName;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(User.prototype, "login", {
        get: function () {
            return this._login;
        },
        set: function (newLogin) {
            console.log("В условии написано, что изменить логин - НЕЛЬЗЯ!");
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(User.prototype, "password", {
        get: function () {
            return '********';
        },
        set: function (newPassword) {
            this._password = newPassword;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(User.prototype, "grade", {
        get: function () {
            return "Неизвестное свойство grade :/";
        },
        set: function (value) {
            console.log("Неизвестное свойство grade :/");
        },
        enumerable: false,
        configurable: true
    });
    User.prototype.showInfo = function () {
        console.log("\u0418\u043C\u044F: ".concat(this.name, ", \u041B\u043E\u0433\u0438\u043D: ").concat(this.login));
    };
    User.prototype.eq = function (otherUser) {
        return this._grade === otherUser._grade;
    };
    User.prototype.lt = function (otherUser) {
        return this._grade < otherUser._grade;
    };
    User.prototype.gt = function (otherUser) {
        return this._grade > otherUser._grade;
    };
    User.count = 0;
    return User;
}());
var SuperUser = /** @class */ (function (_super) {
    __extends(SuperUser, _super);
    function SuperUser(name, login, password, role, grade) {
        var _this = _super.call(this, name, login, password, grade) || this;
        _this._role = role;
        SuperUser.count++;
        return _this;
    }
    Object.defineProperty(SuperUser.prototype, "role", {
        get: function () {
            return this._role;
        },
        set: function (newRole) {
            this._role = newRole;
        },
        enumerable: false,
        configurable: true
    });
    SuperUser.prototype.showInfo = function () {
        console.log("\u0418\u043C\u044F: ".concat(this.name, ", \u041B\u043E\u0433\u0438\u043D: ").concat(this.login, ", \u0420\u043E\u043B\u044C: ").concat(this.role));
    };
    SuperUser.count = 0;
    return SuperUser;
}(User));
// Тестим, что вообще я написал
var user1 = new User('Alex Trofimov', 'lexx', '8080', 3);
var user2 = new User('Boy Kisser', 'meow', '7777', 2);
var user3 = new User('Artur Pirajkov', 'gigachad', '4321', 3);
var admin = new SuperUser('Vladimir Putin', 'sigma', '0000', 'God', 5);
user1.showInfo();
admin.showInfo();
var users = User.count;
var admins = SuperUser.count;
console.log("\u0412\u0441\u0435\u0433\u043E \u043E\u0431\u044B\u0447\u043D\u044B\u0445 \u043F\u043E\u043B\u044C\u0437\u043E\u0432\u0430\u0442\u0435\u043B\u0435\u0439: ".concat(users));
console.log("\u0412\u0441\u0435\u0433\u043E \u0441\u0443\u043F\u0435\u0440-\u043F\u043E\u043B\u044C\u0437\u043E\u0432\u0430\u0442\u0435\u043B\u0435\u0439: ".concat(admins));
console.log(user1.lt(user2));
console.log(admin.gt(user3));
console.log(user1.eq(user3));
user3.name = 'Alexandr Revva';
user1.password = 'Pa$$w0rd';
console.log(user3.name);
console.log(user2.password);
console.log(user2.login);
user2.login = 'geo';
console.log(user3.grade);
admin.grade = 10;
