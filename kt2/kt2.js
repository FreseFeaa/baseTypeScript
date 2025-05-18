"use strict";
class Publisher {
    constructor(title, author, pubYear, copies) {
        this._title = title;
        this._author = author;
        this._pubYear = pubYear;
        this._copies = copies;
    }
    get title() {
        return this._title;
    }
    set title(title) {
        this._title = title;
    }
    get author() {
        return this._author;
    }
    set author(author) {
        this._author = author;
    }
    get pubYear() {
        return this._pubYear;
    }
    set pubYear(pubYear) {
        this._pubYear = pubYear;
    }
    get copies() {
        return this._copies;
    }
    set copies(copies) {
        this._copies = copies;
    }
}
class Book extends Publisher {
    constructor(title, author, pubYear, copies, pages) {
        super(title, author, pubYear, copies);
        this._pages = pages;
    }
    get pages() {
        return this._pages;
    }
    set pages(pages) {
        this._pages = pages;
    }
    info() {
        return `Книга: ${this.title} Автор: ${this.author} (${this.pubYear}), Страниц: ${this.pages}, Копий книги: ${this.copies}`;
    }
    delivery(reader) {
        if (this.copies > 0 && reader.items.length < reader.maxItems) {
            this.copies--;
            reader.items.push(this);
            console.log(`Книга "${this.title}" доставлена получателю ( ${reader.firstName} ${reader.lastName} )`);
        }
        else {
            console.log(`Нельзя доставить книгу "${this.title}" получателю ${reader.firstName} ${reader.lastName}. Доступные копии: ${this.copies}, Изданий у получателя: ${reader.items.length}`);
        }
    }
    receive(reader) {
        const index = reader.items.indexOf(this);
        if (index > -1) {
            reader.items.splice(index, 1);
            this.copies++;
            console.log(`Книга "${this.title}" получена от ${reader.firstName} ${reader.lastName}`);
        }
        else {
            console.log(`Читатель ${reader.firstName} ${reader.lastName} без книги "${this.title}"  :(`);
        }
    }
}
class Magazine extends Publisher {
    constructor(title, author, pubYear, copies, issue) {
        super(title, author, pubYear, copies);
        this._issue = issue;
    }
    get issue() {
        return this._issue;
    }
    set issue(issue) {
        this._issue = issue;
    }
    info() {
        return `Журнал: ${this.title} Автор: ${this.author} (${this.pubYear}), Номер журнала: ${this.issue}, Копий журнала: ${this.copies}`;
    }
    delivery(reader) {
        if (this.copies > 0 && reader.items.length < reader.maxItems) {
            this.copies--;
            reader.items.push(this);
            console.log(`Журнал "${this.title}" доставлен получателю ( ${reader.firstName} ${reader.lastName} )`);
        }
        else {
            console.log(`Нельзя доставить журнал "${this.title}" получателю  ${reader.firstName} ${reader.lastName}. Доступные копии: ${this.copies}, Изданий у получателя: ${reader.items.length}`);
        }
    }
    receive(reader) {
        const index = reader.items.indexOf(this);
        if (index > -1) {
            reader.items.splice(index, 1);
            this.copies++;
            console.log(`Журнал "${this.title}" получен от ${reader.firstName} ${reader.lastName}`);
        }
        else {
            console.log(`Читатель ${reader.firstName} ${reader.lastName}  без журнала "${this.title}" :(`);
        }
    }
}
class Reader {
    constructor(firstName, lastName) {
        this._items = [];
        this.maxItems = 3;
        this._firstName = firstName;
        this._lastName = lastName;
    }
    get firstName() {
        return this._firstName;
    }
    set firstName(firstName) {
        this._firstName = firstName;
    }
    get lastName() {
        return this._lastName;
    }
    set lastName(lastName) {
        this._lastName = lastName;
    }
    get items() {
        return this._items;
    }
    set items(items) {
        this._items = items;
    }
}
class Library {
    constructor() {
        this._publications = [];
    }
    addPublication(publication) {
        this._publications.push(publication);
        console.log(`~Публикация "${publication.title}" добавлена в библиотеку`);
    }
    removePublication(publication) {
        const index = this._publications.indexOf(publication);
        if (index > -1) {
            this._publications.splice(index, 1);
            console.log(`~Публикация "${publication.title}" удалена из библиотеки`);
        }
        else {
            console.log(`~Публикация "${publication.title}" не найдена в библиотеке`);
        }
    }
    listPublications() {
        console.log("Библиоотечные публикации:");
        this._publications.forEach(publication => {
            console.log(publication.info());
        });
    }
}
function line() {
    console.log('_________________________________________\n');
}
const book1 = new Book("Конституция Российской Федерации", "Максим Горелов", 2009, 2, 64);
const book2 = new Book("Библия для детей и животных", "Александр Соколов", 1896, 1, 240);
const magazine1 = new Magazine("Моя борьба⁠⁠", "Тамик Таймазов", 2002, 3, 10);
const reader1 = new Reader("Артем", "Бойкиссеров");
const reader2 = new Reader("Анастасия", "Виноград");
line();
const library = new Library();
library.addPublication(book1);
library.addPublication(book2);
library.addPublication(magazine1);
line();
library.listPublications();
line();
book1.delivery(reader1);
magazine1.delivery(reader1);
book2.delivery(reader1);
book1.delivery(reader1);
magazine1.delivery(reader2);
line();
console.log(`У ${reader1.firstName} ${reader1.lastName} - ${reader1.items.length} изданий (Предметов)`);
console.log(`У ${reader2.firstName} ${reader2.lastName} - ${reader2.items.length} изданий (Предметов)`);
book1.receive(reader1);
magazine1.receive(reader1);
book1.receive(reader1);
console.log(`У ${reader1.firstName} ${reader1.lastName} - ${reader1.items.length} изданий (Предметов)`);
line();
library.listPublications();
library.removePublication(book2);
line();
library.listPublications();
