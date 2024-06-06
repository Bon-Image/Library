// -------------------------------------------------- Constructor - Initializers - Import Variables -------------------------------------------------- //


// Book Constructor
// String String Integer String -> Book 
// Status field takes two values: read and not-read 
function Book(title, author, pages, status) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.status = status;
}


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
    new Book("Harry Potter", "J.K. Rolling", 556, "read")
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
// ArrayOfBooks -> None
function displayBooks(myLibrary) {
    library.innerHTML = '';  // Clear existing content
    myLibrary.forEach (book => { 
        library.appendChild(createBookCard(book)); 
    }) 
}

// Creats HTML skleton for each book. 
// Book -> div 
function createBookCard(book) {

    const bookCover = document.createElement("div");  // This is the book cover, has all the info written on it. 
    bookCover.className = "book-info";

    const deleteButton = document.createElement("button");
    deleteButton.className = "delete";
    deleteButton.textContent = "Remove";
    bookCover.appendChild(deleteButton);

    const statusToggle = document.createElement("input");
    statusToggle.type = "checkbox";
    bookCover.appendChild(statusToggle);
    
    //Creates a specific div for every property of the book, title, author ... .
    Object.keys(book).forEach(key => {

        const property = document.createElement("div");
        property.className = key;
        property.textContent = `${book[key]}`;
        bookCover.appendChild(property);

    });


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
    extractBookInfo(formElements); // Extracts book's information 
    displayBooks(myLibrary);
    form.reset();
    dialog.close();
})

// Extract Book information from form elements.
// ArrayOfElement -> ArrayOfString
function extractBookInfo(elements) {

    let bookInfo = [];
    for (let i = 0; i < elements.length; i++) {
        if (elements[i].tagName != "BUTTON") { // we don't need infomation about sumbit and close buttons. 
            bookInfo.push(elements[i].value);
        }
    }
    let [title, author, pages, status] = bookInfo; 
    addBookToLibrary(new Book(title, author, pages, status));  // Adds the new book into the libraray. 
}

// Adds a new Book (object) into myLibrary.
// ArrayOfString -> None
function addBookToLibrary(newBook) {

    if (!isDuplicate(newBook)) {
        myLibrary.push(newBook);
    }
}

// Close the dialog. 
closeButton.addEventListener("click", () => {
    dialog.close();
});



// -------------------------------------------------- Internal functions  -------------------------------------------------- //

// Check if a book already exists in myLibrary by comparing properties
function isDuplicate(newBook) {
    return myLibrary.some(book => book.title === newBook.title && book.author === newBook.author &&
        book.pages === newBook.pages
    );
}

// Remove a Book 
// 
function removeBook(book) {
    const bookIndex = findIndexOfBook(book);
    if (bookIndex > -1) {
        myLibrary.splice(bookIndex, 1);
        displayBooks(myLibrary);
    }


}

// Find a Book in MyLibrary 
// Book -> Integer 
function findIndexOfBook(book) {

    const index = myLibrary.findIndex(b => b.title === book.title &&
        b.author === b.author &&
        b.pages === book.pages &&
        b.status === book.status);
    return index;
};


// Changes Book status 
// Book -> Book 
