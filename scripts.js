// REMOVE LATER
let bookLibrary = [
    new Book('test', 'test', 100, true),
    new Book('test', 'test', 100, true),
    new Book('test', 'test', 100, true),
    new Book('test', 'test', 100, true),
];

function Book(title, author, pages, hasRead) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.hasRead = hasRead;

    this.info = function() {
        return `${this.title} by ${this.author}, ${this.pages} pages, ` 
        + hasRead ? `has read.` : `not read yet.`;
    }
}

// let theHobbit = new Book('The Hobbit', "Jordan Blount", 295, false);
function addBookToLibrary(title, author, pages, hasRead) {
    if(title !== '' && author !== '' && pages !== '' && hasRead) {
        bookLibrary.push(new Book(title, author, pages, hasRead));
    }   
}

function openNewBookForm() {
    // Opens up a form to enter in book info
}

function createNewBook() {
    // Not sure if I want to pull this directly from textContent
    // or add it into the properties for this function
    let book;
    let author;
    let pages;
    let hasRead;

    addBookToLibrary(title, author, pages, hasRead);
    updateLibrary();
}

function removeBookFromLibrary(book) {
    // Has to be a book object or something of the sort
    bookLibrary.pop(book);
    updateLibrary();
}

function changeStatus(book) {
    // Pull from textContent?

    // Get current status
    bookLibrary[book].hasRead;
}

function updateLibrary() {
    //Create logic to add to add new book to grid here
}