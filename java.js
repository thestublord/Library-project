const myLibrary = [];

function Book(title, author, pages, read = false) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
}

Book.prototype.toggleReadStatus = function () {
    this.read = !this.read;
}

function addBookToLibrary(title, author, pages, read) {
    const newBook = new Book(title, author, pages, read);
    myLibrary.push(newBook);
    displayBooks();
}

function removeBookFromLibrary(index) {
    myLibrary.splice(index, 1);
    displayBooks();
}

function displayBooks() {
    const libraryContainer = document.querySelector('.library-container');
    libraryContainer.innerHTML = '';
    myLibrary.forEach((book, index) => {
        const bookCard = document.createElement('div');
        bookCard.className = 'book-card';
        bookCard.dataset.index = index;
        bookCard.innerHTML = `
      <div><strong>Title:</strong> ${book.title}</div>
      <div><strong>Author:</strong> ${book.author}</div>
      <div><strong>Pages:</strong> ${book.pages}</div>
      <div><strong>Read:</strong> ${book.read ? 'Yes' : 'No'}</div>
      <button onclick="removeBookFromLibrary(${index})">Remove</button>
      <button onclick="toggleReadStatus(${index})">Toggle Read Status</button>
    `;
        libraryContainer.appendChild(bookCard);
    });
}

function toggleReadStatus(index) {
    myLibrary[index].toggleReadStatus();
    displayBooks();
}

document.getElementById('newBookButton').addEventListener('click', () => {
    document.getElementById('bookDialog').showModal();
});

document.getElementById('bookForm').addEventListener('submit', (event) => {
    event.preventDefault();

    const formData = new FormData(event.target);
    const title = formData.get('title');
    const author = formData.get('author');
    const pages = formData.get('pages');
    const read = formData.get('read') ? true : false;

    addBookToLibrary(title, author, pages, read);
    document.getElementById('bookDialog').close();
});

// Manually adding books to the library
addBookToLibrary('The Hobbit', 'J.R.R. Tolkien', 310, true);
addBookToLibrary('1984', 'George Orwell', 328, false);

// Displaying the books on the page
displayBooks();


// Function to validate form before submission
function validateForm() {
    // Getting the form element
    const form = document.getElementById('bookForm');
    
    // Looping through all required fields in the form
    for (const input of form.querySelectorAll('[required]')) {
        if (!input.value) {
            // If a required field is empty, show an alert and prevent form submission
            alert('Please fill out all required fields.');
            return false;
        }
    }
    
    // If all required fields are filled, allow form submission
    return true;
}

// Attaching the validateForm function to the form's submit event
document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('bookForm');
    form.onsubmit = validateForm;
});
