interface Reception {
    delivery(reader: Reader): void;
    receive(reader: Reader): void;
}

// Абстрактный класс Publisher - Издание
abstract class Publisher {
    private _title: string;
    private _author: string;
    private _pubYear: number;
    private _copies: number;

    constructor(title: string, author: string, pubYear: number, copies: number) {
        this._title = title;
        this._author = author;
        this._pubYear = pubYear;
        this._copies = copies;
    }

    get title(): string {
        return this._title;
    }

    set title(title: string) {
        this._title = title;
    }

    get author(): string {
        return this._author;
    }

    set author(author: string) {
        this._author = author;
    }

    get pubYear(): number {
        return this._pubYear;
    }

    set pubYear(pubYear: number) {
        this._pubYear = pubYear;
    }

    get copies(): number {
        return this._copies;
    }

    set copies(copies: number) {
        this._copies = copies;
    }

    abstract info(): string; //Загадочный метод info (асбтрактный)
}

// Подкласс Book - Книга
class Book extends Publisher implements Reception {
    private _pages: number;

    constructor(title: string, author: string, pubYear: number, copies: number, pages: number) {
        super(title, author, pubYear, copies);
        this._pages = pages;
    }

    get pages(): number {
        return this._pages;
    }

    set pages(pages: number) {
        this._pages = pages;
    }

    info(): string {
        return `Книга: ${this.title} Автор: ${this.author} (${this.pubYear}), Страниц: ${this.pages}, Копий книги: ${this.copies}`;
    }

    delivery(reader: Reader): void {
        if (this.copies > 0 && reader.items.length < reader.maxItems) {
            this.copies--;
            reader.items.push(this);
            console.log(`Книга "${this.title}" доставлена получателю ( ${reader.firstName} ${reader.lastName} )`);
        } else {
            console.log(`Нельзя доставить книгу "${this.title}" получателю ${reader.firstName} ${reader.lastName}. Доступные копии: ${this.copies}, Изданий у получателя: ${reader.items.length}`);
        }
    }

    receive(reader: Reader): void {
        const index = reader.items.indexOf(this);
        if (index > -1) {
            reader.items.splice(index, 1);
            this.copies++;
            console.log(`Книга "${this.title}" получена от ${reader.firstName} ${reader.lastName}`);
        } else {             
            console.log(`Читатель ${reader.firstName} ${reader.lastName} без книги "${this.title}"  :(`);
        }
    }
}

// Подкласс Magazine - Журнал
class Magazine extends Publisher implements Reception {
    private _issue: number;

    constructor(title: string, author: string, pubYear: number, copies: number, issue: number) {
        super(title, author, pubYear, copies);
        this._issue = issue;
    }

    get issue(): number {
        return this._issue;
    }

    set issue(issue: number) {
        this._issue = issue;
    }

    info(): string {
        return `Журнал: ${this.title} Автор: ${this.author} (${this.pubYear}), Номер журнала: ${this.issue}, Копий журнала: ${this.copies}`;
    }

    delivery(reader: Reader): void {
        if (this.copies > 0 && reader.items.length < reader.maxItems) {
            this.copies--;
            reader.items.push(this);
            console.log(`Журнал "${this.title}" доставлен получателю ( ${reader.firstName} ${reader.lastName} )`);
        } else {
            console.log(`Нельзя доставить журнал "${this.title}" получателю  ${reader.firstName} ${reader.lastName}. Доступные копии: ${this.copies}, Изданий у получателя: ${reader.items.length}`);
        }
    }

    receive(reader: Reader): void {
        const index = reader.items.indexOf(this);
        if (index > -1) {
            reader.items.splice(index, 1);
            this.copies++;
            console.log(`Журнал "${this.title}" получен от ${reader.firstName} ${reader.lastName}`);
        } else {
            console.log(`Читатель ${reader.firstName} ${reader.lastName}  без журнала "${this.title}" :(`);
        }
    }
}

// Класс Reader - Читатель
class Reader {
    private _firstName: string;
    private _lastName: string;
    private _items: Publisher[] = [];
    public maxItems: number = 3; // Максимальное количество изданий (Предметов) на руках

    constructor(firstName: string, lastName: string) {
        this._firstName = firstName;
        this._lastName = lastName;
    }

    get firstName(): string {
        return this._firstName;
    }

    set firstName(firstName: string) {
        this._firstName = firstName;
    }

    get lastName(): string {
        return this._lastName;
    }

    set lastName(lastName: string) {
        this._lastName = lastName;     }

    get items(): Publisher[] {
        return this._items;
    }

    set items(items: Publisher[]) {
        this._items = items;
    }
}

// Класс Library - Библеоотека
class Library {
    private _publications: Publisher[] = [];

    addPublication(publication: Publisher): void {
        this._publications.push(publication);
        console.log(`~Публикация "${publication.title}" добавлена в библиотеку`);
    }

    removePublication(publication: Publisher): void {
        const index = this._publications.indexOf(publication);
        if (index > -1) {
            this._publications.splice(index, 1);
            console.log(`~Публикация "${publication.title}" удалена из библиотеки`);
        } else {
            console.log(`~Публикация "${publication.title}" не найдена в библиотеке`);
        }
    }

    listPublications(): void {
        console.log("Библиоотечные публикации:");
        this._publications.forEach(publication => {
            console.log(publication.info());
        });
    }
}

function line(): void {
    console.log('_________________________________________\n')     
}


// Создание объектов и тестирование
const book1 = new Book("Конституция Российской Федерации", "Максим Горелов", 2009, 2, 64);
const book2 = new Book("Библия для детей и животных", "Александр Соколов", 1896, 1, 240);
const magazine1 = new Magazine("Моя борьба⁠⁠", "Тамик Таймазов", 2002, 3, 10);

const reader1 = new Reader("Артем", "Бойкиссеров");
const reader2 = new Reader("Анастасия", "Виноград");

line()
const library = new Library();
library.addPublication(book1);
library.addPublication(book2);
library.addPublication(magazine1);

line()
library.listPublications();

line()
book1.delivery(reader1);
magazine1.delivery(reader1);
book2.delivery(reader1);
book1.delivery(reader1); // Невозможно выдать (достигнут лимит)
magazine1.delivery(reader2);

line()
console.log(`У ${reader1.firstName} ${reader1.lastName} - ${reader1.items.length} изданий (Предметов)`);
console.log(`У ${reader2.firstName} ${reader2.lastName} - ${reader2.items.length} изданий (Предметов)`);

book1.receive(reader1);
magazine1.receive(reader1);
book1.receive(reader1); // Пытаемся вернуть то, чего нет

console.log(`У ${reader1.firstName} ${reader1.lastName} - ${reader1.items.length} изданий (Предметов)`);

line()
library.listPublications();

library.removePublication(book2);
line()
library.listPublications();