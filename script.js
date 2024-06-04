const myLibrary = [
    { title: "Bauhaus", author: "Magdalena Droost", pages: 356, status: "read" },
    { title: "Dieter Rams", author: "Klaus Klemp", pages: 322, status: "notread" },
    { title: "Harry Potter", author: "J.K. Rolling", pages: 556, status: "read" }
];

let displayedBooks = [];



const library = document.querySelector(".library");


// ---------------------------------------- Display  ---------------------------------------- //


// Displays the books on the page 
// ArrayOfBooks -> None
function display(myLibrary) {
    for (const book of myLibrary) {
        if (!displayedBooks.includes(book)) {
            library.appendChild(createBookCard(book));
            displayedBooks.push(book);
        }
    }
}

// Creats HTML skleton for each book, ready to be styled as a cardboard. 
// Book -> div 
function createBookCard(book) {
    const bookInfo = document.createElement("div");  // This is the book cover, has all the info written on it. 
    bookInfo.className = "book-info";

    //Creates a specific div for every property of the book, title, author ... .
    for (const key in book) {
        const property = document.createElement("div")
        property.className = key;
        property.textContent = `${book[key]}`;
        bookInfo.appendChild(property);
    }

    return bookInfo;
}


display(myLibrary);



// ---------------------------------------- User-Input   ---------------------------------------- //

const dialog = document.querySelector("dialog");
const showModalButton = document.querySelector("dialog + button");
const addButton = document.querySelector("#add");
const closeButton = document.querySelector("#add + button")
const form = document.getElementById("info");


showModalButton.addEventListener("click", () => {
    dialog.showModal();
});



form.addEventListener("submit", (event) => {
    event.preventDefault();
    const formElements = form.elements;
    infoExtractor(formElements);

})

function infoExtractor(elements) {

    let bookInfo = [];
    for (let i = 0; i < elements.length; i++) {
        if (elements[i].tagName != "BUTTON") {
            bookInfo.push(elements[i].value);
        }
    }
    addBookToLibrary(bookInfo)
}


function addBookToLibrary(newBook) {
    let [title, author, pages, status] = newBook;
    myLibrary.push(new Book(title, author, pages, status));
}


closeButton.addEventListener("click", () => {
    dialog.close();
});

addButton.addEventListener("click", () => {
    display(myLibrary)
    dialog.close()
})










// Costructor of Book object. 
// String String Integer String 
// Status field takes two values: read and not read 
function Book(title, author, pages, status) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.status = status;
}



document.querySelector("button").addEventListener("click", Book())

