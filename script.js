// Function Design Process and Guidelines
// 1st line: Purpose 
// 2nd line: Signature (Type input1 Type input2 -> Type output)
// 3rd line: Functional examples 
// 4th line: Extra explanations (optional)

// -------------------------------------------------- Constructor - Initializers - Import Variables -------------------------------------------------- //


// Book Constructor
// String String Integer String -> Book
// "Bauhaus"  "Magdalena Droost"  356  "read" -> Book
// Status field takes two values: read and not-read 
function Book(title, author, pages, status) {

    this.title = title;
    this.author = author;
    this.pages = pages;
    this.status = status;

}

// Modifies the status of a Book
//  -> void 
// Book.changeBookStatus()
Book.prototype.changeBookStatus = function () {

    if (this.status === "read") {
        this.status = "not-read";
    } else {
        this.status = "read";
    }

};


// Sample Library Data
const myLibrary = [
    new Book("Bauhaus", "Magdalena Droost", 356, "read"),
    new Book("Dieter Rams", "Klaus Klemp", 322, "not-read"),
    new Book("Harry Potter", "J.K. Rolling", 556, "read"),
    new Book("Bauhau", "Magalena Droost", 356, "read"),
    new Book("Dieter Rams", "Klaus Klmp", 322, "not-read"),
    new Book("HarryPotter", "J.K. Rlling", 556, "read")
];


// Fetching Data From HTML
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
        library.appendChild(createBookCard(book));
    })

}


// Creats HTML skleton for each book
// Book -> div 
// new Book("Bauhaus", "Magdalena Droost", 356, "read") -> void
function createBookCard(book) {

    // This is the book cover, has all the info written on it
    const bookCover = document.createElement("div");
    bookCover.className = "book-info";
    // Delete button to remove a Book from the library
    const deleteButton = document.createElement("button");
    deleteButton.classList.add("delete", "hidden");
    deleteButton.textContent = "Remove";
    bookCover.appendChild(deleteButton);
    // A toggle switch to change the status of a Book to read/not-read
    const statusToggle = document.createElement("input");
    statusToggle.type = "checkbox";
    statusToggle.classList.add("hidden"); 
    bookCover.appendChild(statusToggle);
    // Creates a specific div for every property of the book, title, author ... 
    Object.keys(book).forEach(key => {

        const property = document.createElement("div");
        property.className = key;
        property.textContent = `${book[key]}`;
        bookCover.appendChild(property);

    });
    //displays delete and status-toggle buttons
    bookCover.addEventListener("click", ()=> {
        bookCover.style.opacity = "0.1";
        deleteButton.classList.remove("hidden"); 
        statusToggle.classList.remove("hidden");
    })
    // Handle Book removal
    deleteButton.addEventListener("click", () => {

        removeBook(book);
        bookCover.remove();

    });
    statusToggle.addEventListener("click", () => {

        book.changeBookStatus();
        displayBooks(myLibrary);

    })
    return bookCover;

}


// -------------------------------------------------- Interactions  -------------------------------------------------- //


// Show the dialog to add a new book
showModalButton.addEventListener("click", () => {

    dialog.showModal();

});


// Handle form submission
form.addEventListener("submit", (event) => {

    event.preventDefault();
    const formElements = form.elements; // Gathers all the form elements 
    const newBook = extractBookInfo(formElements); // Extracts book's information 
    addBookToLibrary(newBook); 
    displayBooks(myLibrary);
    form.reset();
    dialog.close();

})


// Extract Book information from form elements
// ArrayOfElement -> ArrayOfString
// [input#title, input#author, input#pages, etc.] -> ["Bauhaus", "Magdalena Droost", 356, "read"]
function extractBookInfo(elements) {

    console.log(elements); 
    let bookInfo = [];
    for (let i = 0; i < elements.length; i++) {
        if (elements[i].tagName != "BUTTON") { // we don't need infomation about sumbit and close buttons 
            bookInfo.push(elements[i].value);
        }
    }
    return new Book(bookInfo[0], bookInfo[1], bookInfo[2], bookInfo[3]);

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

});



// -------------------------------------------------- Internal functions  -------------------------------------------------- //


// Check if a book already exists in myLibrary by comparing properties
// Book -> Boolean 
// new Book("Bauhaus", "Magdalena Droost", 356, "read") -> false
function isDuplicate(newBook) {

    return myLibrary.some(book => book.title === newBook.title && book.author === newBook.author &&
        book.pages === newBook.pages && book.status === newBook.status);

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

    const index = myLibrary.findIndex(b => b.title === book.title &&
        b.author === b.author &&
        b.pages === book.pages &&
        b.status === book.status);
    return index;

};
