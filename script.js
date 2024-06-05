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

// Sample Library Data
const myLibrary = [
    { title: "Bauhaus", author: "Magdalena Droost", pages: 356, status: "read" },
    { title: "Dieter Rams", author: "Klaus Klemp", pages: 322, status: "not-read" },
    { title: "Harry Potter", author: "J.K. Rolling", pages: 556, status: "read" }
];

// Fetching Data From HTML

let displayedBooks = [];
const library = document.querySelector(".library");
const dialog = document.querySelector("#dialog");
const form = document.getElementById("info");
const showModalButton = document.getElementById("showModal");
const addButton = document.querySelector("#add");
const closeButton = document.querySelector("#add + button")




// Initialize display
display(myLibrary);


// -------------------------------------------------- Display  -------------------------------------------------- //


// Display all books on the page 
// ArrayOfBooks -> None
function display(myLibrary) {
    for (const book of myLibrary) {
        if (!duplicateDetector(book)) {
            library.appendChild(createBookCard(book));
            displayedBooks.push(book);
        }
    }
}

// Creats HTML skleton for each book, ready to be styled as a cardboard. 
// Book -> div 
function createBookCard(book) {
    const bookCover = document.createElement("div");  // This is the book cover, has all the info written on it. 
    bookCover.className = "book-info";
    deleteButton = document.createElement("button");
    deleteButton.className = "delete";
    deleteButton.textContent = "Remove";
    //Creates a specific div for every property of the book, title, author ... .
    for (const key in book) {
        const property = document.createElement("div")
        property.className = key;
        property.textContent = `${book[key]}`;
        bookCover.appendChild(property);
    }
    bookCover.appendChild(deleteButton);


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
    infoExtractor(formElements); // Extracts book's information 
    display(myLibrary);
    form.reset();
    dialog.close();
})

// Extracts information like title, author and etc. , and saves them into an array. 
// ArrayOfElement -> ArrayOfString
function infoExtractor(elements) {

    let bookInfo = [];
    for (let i = 0; i < elements.length; i++) {
        if (elements[i].tagName != "BUTTON") { // we don't need infomation about sumbit and close buttons. 
            bookInfo.push(elements[i].value);
        }
    }
    addBookToLibrary(bookInfo) // Adds the new book into the libraray. 
}

// Adds Book object into myLibrary.
// Book -> None
function addBookToLibrary(newBook) {

    let [title, author, pages, status] = newBook;
    myLibrary.push(new Book(title, author, pages, status));

}


closeButton.addEventListener("click", () => {
    dialog.close();
});


// -------------------------------------------------- Internal functions  -------------------------------------------------- //


function duplicateDetector(newBook) {
    return displayedBooks.some(book => book.title === newBook.title && book.author === newBook.author &&
        book.pages === newBook.pages
    );
}