const myLibrary = [
    { title: "Bauhaus", author: "Magdalena Droost", pages: 356, status: "read" },
    { title: "Dieter Rams", author: "Klaus Klemp", pages: 322, status: "notread" },
    { title: "Harry Potter", author: "J.K. Rolling", pages: 556, status: "read" }
];



const library = document.querySelector(".library");

// Displays the books on the page 
function display(myLibrary) {
    for (const book of myLibrary) {
        library.appendChild(bookToText(book));
    }
}

function bookToText(book) {
    const bookInfo = document.createElement("div");  
    for (const key in book) {
        const property = document.createElement("div")
        property.className = key; 
        property.textContent = `${book[key]}`; 
        bookInfo.appendChild(property);
    }
    return bookInfo; 
    }

display(myLibrary);








// Costructor of Book object. 
// String String Integer String 
// Status field takes two values: read and not read 
function Book(title, author, pages, status) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.status = status;
}


function addBookToLibrary(newBook) {
    myLibrary.push(newBook)
}

document.querySelector("button").addEventListener("click", Book())

