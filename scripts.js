let libraryGrid = document.getElementById("library");
let addBook = document.getElementById("add-btn");
let addBtnCont = document.getElementById("btn-container");
var modal = document.getElementById("addBookModel");
var closeBtn = document.getElementsByClassName("close")[0];
var newBookBtn = document.getElementById("addBook");

// Model inputs
let mTitle = document.getElementById("mTitle");
let mAuthor = document.getElementById("mAuthor");
let mPages = document.getElementById("mPages");
let mHasRead = document.getElementById("mhasRead");

let bookLibrary = [];
let currIndex = 0;

// Loads from local storage immediately.
loadFromLocalStorage();

addBook.addEventListener("click", function() {
    modal.style.display = "block";
});

newBookBtn.addEventListener("click", function() {
    if(addBookFromModel()) {
        modal.style.display = "none";
    }
});

closeBtn.onclick = function () {
    modal.style.display = "none";
    clearModelInputs();
}

window.onclick = function (event) {
    if (event.target == modal) {
        modal.style.display = "none";
        clearModelInputs();
    }
}

function Book(title, author, pages, hasRead, index) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.hasRead = hasRead;
    this.index = index;

    this.info = function() {
        return `${this.title} by ${this.author}, ${this.pages} pages, ` 
        + this.hasRead ? `already read.` : `not read yet.`;
    }

    this.changeStatus = function() {
        if(!this.hasRead) {
            this.hasRead = true;
        } else {
            this.hasRead = false;
        }
    }

    this.getReadStatus = function() {
        return this.hasRead ? `Read` : `Has not read`;
    }
}

function addBookFromModel() {
    if(mTitle.value !== "" && mAuthor.value !== "" && !negativeNum(mPages)) {
        addBookToLibrary(mTitle.value, mAuthor.value, mPages.value, mHasRead.checked);
        clearModelInputs();
        return true;
    }
    return false;
}

function negativeNum(num) {
    return num > 0;
}

function clearModelInputs() {
    mTitle.value = "";
    mAuthor.value = "";
    mPages.value = "";
    mHasRead.checked = false;
}

function getCurrentIndex() {
    return bookLibrary.length > 0 ? bookLibrary[bookLibrary.length - 1].index + 1 : 0;
}

function addBookToLibrary(title, author, pages, hasRead) {
    if(title !== '' && author !== '' && pages !== 0) {
        let index = getCurrentIndex();
        let book = new Book(title, author, pages, hasRead, index);
        bookLibrary.push(book);
        addBookToGrid(book, index);

        // I am not sure if you can set the array in localStorage to be sorted in a particular way.
        // If possible, you could change this so that books can be reorganized and put in different 
        // orders or based on ascending/descending order without hardcoding that in. 
        window.localStorage.setItem(`book-${index}`, JSON.stringify(book));
    }
}

function addBookToGrid(book, index) {
    console.log("Index when book is added " + index)
    let card = document.createElement("div");   
    card.className = "card";
    card.setAttribute("data-index", index);
    
    let title = document.createElement("p"); 
    title.className = "title";
    title.innerHTML = book.title;

    let author = document.createElement("p");
    author.className = "author";
    author.innerHTML = book.author;

    let pages = document.createElement("p");
    pages.className = "pages";
    pages.innerHTML = book.pages;

    let hasRead = document.createElement("p");
    hasRead.className = "hasRead";
    if(book.hasRead) {
        hasRead.style.color = "green";
        hasRead.innerHTML = "Read";
    } else {
        hasRead.style.color = "red";
        hasRead.innerHTML = "Not read yet";
    }

    //Button div
    let btnCont = document.createElement("div");
    btnCont.className = "btns";

    let delBtn = document.createElement("button");
    delBtn.className = "del btn";
    delBtn.textContent = "Delete";

    delBtn.addEventListener('click', function() {
        removeBookFromLibrary(book);
    });

    let readBtn = document.createElement("button");
    readBtn.className = "read btn";
    readBtn.textContent = "Read";

    readBtn.addEventListener('click', function() {
        updateStatus(book);
        if(book.hasRead) {
            hasRead.style.color = "green";
            hasRead.innerHTML = "Read";
        } else {
            hasRead.style.color = "red";
            hasRead.innerHTML = "Not read yet";
        }
    });

    btnCont.appendChild(delBtn);
    btnCont.appendChild(readBtn);

    card.appendChild(title);
    card.appendChild(author);
    card.appendChild(pages);
    card.appendChild(hasRead);
    card.appendChild(btnCont);

    libraryGrid.insertBefore(card, addBtnCont);    
}

//TODO: Make a browser SessionStorage to create undo with Ctrl+Z
function removeBookFromLibrary(book) {
    let bIndex = bookLibrary.indexOf(book)
    bookLibrary.splice(bIndex, 1);
    libraryGrid.removeChild(document.querySelector(`[data-index="${book.index}"]`));
    window.localStorage.removeItem(`book-${book.index}`);
}

function updateStatus(book) {
    book.changeStatus();
    window.localStorage.setItem(`book-${book.index}`, JSON.stringify(book));
}

//
function updateLibrary(array) {
    array.forEach(function(item, index) {
        console.log("" + item.index);
        let card = document.createElement("div");   
        card.className = "card";
        card.setAttribute("data-index", item.index);
        
        let title = document.createElement("p"); 
        title.className = "title";
        title.innerHTML = item.title;

        let author = document.createElement("p");
        author.className = "author";
        author.innerHTML = item.author;

        let pages = document.createElement("p");
        pages.className = "pages";
        pages.innerHTML = item.pages;

        let hasRead = document.createElement("p");
        hasRead.className = "hasRead";
        if(item.hasRead) {
            hasRead.style.color = "green";
            hasRead.innerHTML = "Read";
        } else {
            hasRead.style.color = "red";
            hasRead.innerHTML = "Not read yet";
        }

        //Button div
        let btnCont = document.createElement("div");
        btnCont.className = "btns";

        let delBtn = document.createElement("button");
        delBtn.className = "del btn";
        delBtn.textContent = "Delete";

        delBtn.addEventListener('click', function() {
            removeBookFromLibrary(item);
        });

        let readBtn = document.createElement("button");
        readBtn.className = "read btn";
        readBtn.textContent = "Read";

        readBtn.addEventListener('click', function() {
            updateStatus(item);
            if(item.hasRead) {
                hasRead.style.color = "green";
                hasRead.innerHTML = "Read";
            } else {
                hasRead.style.color = "red";
                hasRead.innerHTML = "Not read yet";
            }
        });

        btnCont.appendChild(delBtn);
        btnCont.appendChild(readBtn);

        card.appendChild(title);
        card.appendChild(author);
        card.appendChild(pages);
        card.appendChild(hasRead);
        card.appendChild(btnCont);

        libraryGrid.insertBefore(card, addBtnCont);
    });
}

function loadFromLocalStorage() {
    if(!storageAvailable('localStorage')) {
        return;
    } else {
        for (let i = 0; i < localStorage.length; i++) {
            let key = localStorage.key(i);
            let book = JSON.parse(localStorage.getItem(key));
            bookLibrary.push(new Book(book.title, book.author, book.pages, book.hasRead, book.index));
        }

        // Fixes this glitch that was happening. It sorts the books in bookLibrary based on their index.
        // This could be used for changing the implementation if you wanted ascending and descending order
        // in the library.
        bookLibrary.sort(function(bookA, bookB) {
            return bookA.index - bookB.index;
        });
        updateLibrary(bookLibrary);
    }
}

function storageAvailable(type) {
    var storage;
    try {
        storage = window[type];
        var x = '__storage_test__';
        storage.setItem(x, x);
        storage.removeItem(x);
        return true;
    }
    catch(e) {
        return e instanceof DOMException && (
            // everything except Firefox
            e.code === 22 ||
            // Firefox
            e.code === 1014 ||
            // test name field too, because code might not be present
            // everything except Firefox
            e.name === 'QuotaExceededError' ||
            // Firefox
            e.name === 'NS_ERROR_DOM_QUOTA_REACHED') &&
            // acknowledge QuotaExceededError only if there's something already stored
            (storage && storage.length !== 0);
    }
}