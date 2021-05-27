let libraryGrid = document.getElementById("library");
let addBook = document.getElementById("add-btn");
let addBtnCont = document.getElementById("btn-container");
// let delBtns = document.querySelectorAll(".del");
// let readBtns = document.querySelectorAll(".read");
var modal = document.getElementById("addBookModel");
var closeBtn = document.getElementsByClassName("close")[0];
var newBookBtn = document.getElementById("addBook");

// Model inputs
let mTitle = document.getElementById("mTitle");
let mAuthor = document.getElementById("mAuthor");
let mPages = document.getElementById("mPages");
let mHasRead = document.getElementById("mhasRead");

let bookLibrary = [];

updateLibrary();
addBook.addEventListener("click", function() {
    modal.style.display = "block";
    // let rnd = Math.floor(Math.random() * (100 - 50 + 1)) + 50;
    // addBookToLibrary("lol", "nigas", rnd, true);
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

function Book(title, author, pages, hasRead) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.hasRead = hasRead;

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

function addBookToLibrary(title, author, pages, hasRead) {
    if(title !== '' && author !== '' && pages !== 0) {
        let book = new Book(title, author, pages, hasRead);
        bookLibrary.push(book);
        addBookToGrid(book, bookLibrary.length - 1);
    }
}

function addBookToGrid(book, index) {
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
        removeBookFromLibrary(index);
    });

    let readBtn = document.createElement("button");
    readBtn.className = "read btn";
    readBtn.textContent = "Read";

    readBtn.addEventListener('click', function() {
        book.changeStatus();
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

function removeBookFromLibrary(id) {
    bookLibrary.pop(bookLibrary[id]);
    libraryGrid.removeChild(document.querySelector(`[data-index="${id}"]`));
}

function findBook(id) {
    return bookLibrary[id];
}

//
function updateLibrary() {
    bookLibrary.forEach(function(item, index) {
        let card = document.createElement("div");   
        card.className = "card";
        card.setAttribute("data-index", index);
        
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
            removeBookFromLibrary(index);
        });

        let readBtn = document.createElement("button");
        readBtn.className = "read btn";
        readBtn.textContent = "Read";

        readBtn.addEventListener('click', function() {
            item.changeStatus();
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

}