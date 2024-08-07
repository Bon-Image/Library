// Function Design Process and Guidelines
// 1st line: Purpose 
// 2nd line: Signature (Type input1 Type input2 -> Type output)
// 3rd line: Functional examples 
// 4th line: Extra explanations (optional)

// -------------------------------------------------- Constructor - Initializers - Import Variables -------------------------------------------------- //


class Book {

    constructor(title, author, pages, bookStatus) {

        this.title = title;
        this.author = author;
        this.pages = pages;
        this.bookStatus = bookStatus;

    }

    changeBookStatus() {

        if (this.bookStatus === "read") {
            this.bookStatus = "not-read";
        } else {
            this.bookStatus = "read";
        }

    };



}








// Modifies the status of a Book
//  -> void 
// Book.changeBookStatus()



// Sample Library Data
const myLibrary = [
    new Book("Bauhaus", "Magdalena Droost", 356, "read"),
    new Book("Dieter Rams", "Klaus Klemp", 322, "not-read"),
    new Book("Harry Potter", "J.K. Rolling", 556, "read"),
    new Book("Bauhau", "Magalena Droost", 356, "read"),
    new Book("Dieter Rams", "Klaus Klap", 322, "not-read"),
    new Book("HarryPotter", "J.K. Rlling", 556, "read"),
    new Book("Bauhaus", "Magdalena Droost", 356, "read"),
    new Book("Dieter Rams", "Klaus Klemp", 322, "not-read"),
    new Book("Harry Potter", "J.K. Rolling", 556, "read"),
    new Book("Bauhau", "Magalena Droost", 356, "read"),
    new Book("Dieter Rams", "Klaus Klap", 322, "not-read"),
    new Book("HarryPotter", "J.K. Rlling", 556, "read"),
    new Book("Bauhaus", "Magdalena Droost", 356, "read"),
    new Book("Dieter Rams", "Klaus Klemp", 322, "not-read"),
    new Book("Harry Potter", "J.K. Rolling", 556, "read"),
    new Book("Bauhau", "Magalena Droost", 356, "read"),
    new Book("Dieter Rams", "Klaus Klap", 322, "not-read"),
    new Book("HarryPotter", "J.K. Rlling", 556, "read"),
];


// Fetching Data From HTML
const mainContentArea = document.querySelector(".main-content-area");
const library = document.querySelector(".library");
const dialog = document.querySelector("#dialog");
const showModalButton = document.getElementById("showModal");
const form = document.getElementById("info");
const addButton = document.querySelector("#add");
const closeButton = document.querySelector("#add + button");



// Initialize display
displayBooks(myLibrary);


// -------------------------------------------------- Display  -------------------------------------------------- //


// Display all books on the page 
// ArrayOfBooks -> void
// [new Book(... 1), new Book(... 2), new Book(... 3) ... new Book(... 3)] -> void
function displayBooks(myLibrary) {

    library.innerHTML = '';  // Clear existing content
    myLibrary.forEach(book => {
        library.appendChild(createBookSpine(book));
    })

}


// Creats HTML skleton for each book
// Book -> div 
// new Book("Bauhaus", "Magdalena Droost", 356, "read") -> void
function createBookSpine(book) {

    const bookSpine = document.createElement("div");
    bookSpine.classList.add("book-info-spine");

    // Creates a specific div for every property of the book, title, author ... 
    Object.keys(book).forEach(key => {

        const property = document.createElement("div");
        property.className = key;
        property.textContent = `${book[key]}`;
        bookSpine.appendChild(property);

    });

    // Handles the clicks on a Book spine
    bookSpine.addEventListener("click", (event) => {

        removePreviousBookCover();
        if (event.target.classList.contains("book-info-spine")) {
            showBookCover(event.target, book);
        }

    });
    return bookSpine;

}


// Creats a cover for a Book.
// div (void)-> div
// new Book("Bauhaus", "Magdalena Droost", 356, "read") div -> void
// Almost the same function as the createBookSpine but creates a full cover to display
function createBookCover(bookSpine, book) {

    const bookCover = document.createElement("div");
    bookCover.classList.add("cover");

    const bookInfoOriginal = bookSpine;
    const bookInfoClone = bookInfoOriginal.cloneNode(true);

    removeStyle(bookInfoClone);
    bookInfoClone.classList.add("book-info-cover");


    bookCover.appendChild(bookInfoClone);

    const controlPanel = document.createElement("div");
    controlPanel.classList.add("control-panel");
    bookCover.appendChild(controlPanel);

    const deleteButton = createButton(["delete", "pushable"], ["front"], "Remove");
    controlPanel.appendChild(deleteButton);

    const statusButton = createButton(["status", "pushable"], ["front"], "Update Reading Status");
    controlPanel.appendChild(statusButton);

    const closeCoverButton = createButton(["pushable"], ["front"], "Close Me");
    controlPanel.appendChild(closeCoverButton);

    deleteButton.addEventListener("click", () => {

        removeBook(book);
        bookCover.remove();

    });

    statusButton.addEventListener("click", () => {

        const updatedBook = updateBook(book);
        removePreviousBookCover();
        showBookCover(updatedBook, book);
        displayBooks(myLibrary);

    });

    closeCoverButton.addEventListener("click", () => {

        bookCover.remove();
        bookInfoOriginal.style.opacity = "1";

    })

    mainContentArea.appendChild(bookCover);

}


// -------------------------------------------------- Interactions  -------------------------------------------------- //





// Show the dialog to add a new book
showModalButton.addEventListener("click", () => {
    mainContentArea.style.opacity = "0.01";
    dialog.showModal();

});


document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && dialog.open) {
        mainContentArea.style.opacity = "1";
    }
})


// Handle form submission
form.addEventListener("submit", (event) => {

    event.preventDefault();
    const formElements = form.elements; // Gathers all the form elements 
    const newBook = extractBookInfo(formElements); // Extracts book's information 
    addBookToLibrary(newBook);
    displayBooks(myLibrary);
    form.reset();
    dialog.close();
    mainContentArea.style.opacity = "1";


})


// Extract Book information from form elements
// ArrayOfElement -> ArrayOfString
// [input#title, input#author, input#pages, etc.] -> ["Bauhaus", "Magdalena Droost", 356, "read"]
function extractBookInfo(elements) {

    let bookInfo = [];
    for (let i = 0; i < elements.length; i++) {
        if (elements[i].tagName != "BUTTON") { // we don't need infomation about sumbit and close buttons 
            bookInfo.push(elements[i].value);
        }
    }
    return new Book(bookInfo[0], bookInfo[1], bookInfo[2], bookInfo[3]);
    s
}


// Adds a new Book (object) into myLibrary
// ArrayOfString -> void
// ["Bauhaus", "Magdalena Droost", 356, "read"] -> void
function addBookToLibrary(newBook) {

    if (!isDuplicate(newBook)) {
        myLibrary.push(newBook);
    }

}

// Close the dialog
closeButton.addEventListener("click", () => {

    dialog.close();
    mainContentArea.style.opacity = "1";


});



// -------------------------------------------------- Internal functions  -------------------------------------------------- //


// Check if a book already exists in myLibrary by comparing properties
// Book -> Boolean 
// new Book("Bauhaus", "Magdalena Droost", 356, "read") -> false
function isDuplicate(newBook) {

    return myLibrary.some(book => book.title === newBook.title && book.author === newBook.author &&
        book.pages === newBook.pages && book.bookStatus === newBook.status);

}


// Remove a Book 
// Book -> void
// new Book("Bauhaus", "Magdalena Droost", 356, "read") -> void
function removeBook(book) {

    const bookIndex = findIndexOfBook(book);
    if (bookIndex > -1) {
        myLibrary.splice(bookIndex, 1);
        displayBooks(myLibrary);
    }

}


// Find the index of a  Book in myLibrary 
// Book -> Integer 
// new Book("Bauhaus", "Magdalena Droost", 356, "read") -> 1 
function findIndexOfBook(book) {

    return myLibrary.findIndex(b =>
        b.title === book.title &&
        b.author === b.author &&
        b.pages === book.pages &&
        b.bookStatus === book.status);

};


// Shows a Book cover upon clicking 
// div -> div
// ??? 
function showBookCover(bookSpine, thisBook) {

    const allBookSpines = document.querySelectorAll(".book-info-spine");
    allBookSpines.forEach(spine => {
        spine.style.opacity = "1";
    });

    bookSpine.style.opacity = "0.1";
    createBookCover(bookSpine, thisBook);

}

// Removes the existing Book Cover 
// void -> void
// ???
function removePreviousBookCover() {

    const cover = document.querySelector(".cover");
    if (cover) {
        cover.parentNode.removeChild(cover);

    }

}


// Removes inhertited style from a Book spine. 
// div -> div
//???
function removeStyle(booksSpine) {

    booksSpine.classList.remove("book-info-spine");
    booksSpine.style.opacity = "1";

}

// Updates a Book 
// Book -> div
// ???
function updateBook(book) {
    book.changeBookStatus();
    return createBookSpine(book);
}

// Creates a pushable button
// listOfString listOfString string -> button 
// ???
// First Array : Button's class list  - Second Array: Span's class list (inside the button)  - Third Argument: Button's text
function createButton(buttonClassList, spanClassList, buttonText) {

    const button = document.createElement("button");
    button.classList.add(...buttonClassList);

    const span = document.createElement("span");
    span.classList.add(...spanClassList);
    span.textContent = buttonText

    button.appendChild(span);

    return button;

}