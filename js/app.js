/*
  BlueLib Catalogue — plain JavaScript
  BIT225 Assignment 2
  Author: Fadi · Student ID: YOUR_STUDENT_ID

  Sources: MDN Web Docs (DOM manipulation, events, form validation, Array.filter).
  AI citation: implementation drafted with assistance from Grok (xAI), October 2026.
  No frameworks or libraries are used.

  This file must be loaded at the end of body (see index.html) so the
  elements below already exist when these lines run.
*/

/* Book data lives in memory until the BlueLib API is connected. */
const books = [
  { title: "Clean Code", author: "Robert C. Martin", category: "IT", copies: 4 },
  { title: "Introduction to Algorithms", author: "Thomas H. Cormen", category: "IT", copies: 2 },
  { title: "Eloquent JavaScript", author: "Marijn Haverbeke", category: "IT", copies: 3 },
  { title: "Principles of Marketing", author: "Philip Kotler", category: "Business", copies: 5 },
  { title: "Financial Accounting", author: "Robert Libby", category: "Business", copies: 0 },
  { title: "A Brief History of Time", author: "Stephen Hawking", category: "Science", copies: 3 },
  { title: "The Art of Color", author: "Johannes Itten", category: "Arts", copies: 1 }
];

const bookList = document.getElementById("book-list");
const searchInput = document.getElementById("search");
const categoryFilter = document.getElementById("category-filter");
const resultsCount = document.getElementById("results-count");
const emptyMessage = document.getElementById("empty-message");
const addBookForm = document.getElementById("add-book-form");
const titleInput = document.getElementById("title");
const authorInput = document.getElementById("author");
const categoryInput = document.getElementById("category");
const copiesInput = document.getElementById("copies");
const formError = document.getElementById("form-error");
const formSuccess = document.getElementById("form-success");

/**
 * Returns books that match the current title search AND category filter.
 * Search is case-insensitive and matches any part of the title.
 * Category "all" means do not filter by category.
 */
function getFilteredBooks() {
  const query = searchInput.value.trim().toLowerCase();
  const category = categoryFilter.value;

  return books.filter(function (book) {
    const matchesTitle = book.title.toLowerCase().includes(query);
    const matchesCategory = category === "all" || book.category === category;
    return matchesTitle && matchesCategory;
  });
}

/**
 * Builds one card from a book object.
 * textContent is used (not innerHTML) so a title typed into the form
 * cannot be treated as HTML.
 * The click handler closes over this exact object, so borrowing the
 * right copy still works if two books share a title.
 */
function createBookCard(book) {
  const card = document.createElement("article");
  card.className = "book-card";

  const title = document.createElement("h3");
  title.textContent = book.title;

  const author = document.createElement("p");
  author.className = "book-author";
  author.textContent = book.author;

  const category = document.createElement("span");
  category.className = "book-category";
  category.textContent = book.category;

  const copies = document.createElement("p");
  copies.className = "book-copies";
  copies.textContent = "Copies available: " + book.copies;

  const button = document.createElement("button");
  button.type = "button";
  button.className = "borrow-btn";

  if (book.copies === 0) {
    card.classList.add("is-out-of-stock");

    const status = document.createElement("p");
    status.className = "stock-status";
    status.textContent = "Out of stock";
    card.append(title, author, category, copies, status);

    button.textContent = "Out of stock";
    button.disabled = true;
  } else {
    card.append(title, author, category, copies);
    button.textContent = "Borrow";
    button.addEventListener("click", function () {
      borrowBook(book);
    });
  }

  card.append(button);
  return card;
}

/**
 * Clears the grid and draws only the books that pass the current filters.
 * Called on load, on every keystroke in search, on category change,
 * after a borrow, and after a successful add.
 */
function renderBooks() {
  const visible = getFilteredBooks();

  bookList.replaceChildren();
  resultsCount.textContent = "Showing " + visible.length + " of " + books.length + " books";
  emptyMessage.hidden = visible.length !== 0;

  visible.forEach(function (book) {
    bookList.append(createBookCard(book));
  });
}

/**
 * Reduces copies by 1 on the object stored in the array, then redraws.
 * The guard stops the count going below 0 if the button is clicked twice
 * before the disabled state is painted.
 */
function borrowBook(book) {
  if (book.copies <= 0) {
    return;
  }

  book.copies -= 1;
  renderBooks();
}

/**
 * Checks the four form fields.
 * Returns an empty string when the input is valid, otherwise a message
 * the page can show to the student.
 * Copies must be a whole number of 0 or more: digits only, so 3.5, -1
 * and blank all fail, while 0 is allowed.
 */
function validateBookInput(title, author, category, copiesRaw) {
  if (title === "" || author === "" || category === "" || copiesRaw === "") {
    return "Please fill in every field before adding a book.";
  }

  if (!/^\d+$/.test(copiesRaw)) {
    return "Copies must be a whole number of 0 or more.";
  }

  return "";
}

function showError(message) {
  formError.textContent = message;
  formError.hidden = false;
  formSuccess.hidden = true;
}

function showSuccess(message) {
  formSuccess.textContent = message;
  formSuccess.hidden = false;
  formError.hidden = true;
}

/**
 * Adds a validated book to the array and shows it without reloading.
 * Filters are reset so a strict search cannot hide the book that was
 * just added — the brief asks for the new book to appear on the page.
 */
function handleAddBook(event) {
  event.preventDefault();

  const title = titleInput.value.trim();
  const author = authorInput.value.trim();
  const category = categoryInput.value;
  const copiesRaw = copiesInput.value.trim();
  const error = validateBookInput(title, author, category, copiesRaw);

  if (error !== "") {
    showError(error);
    return;
  }

  books.push({
    title: title,
    author: author,
    category: category,
    copies: Number(copiesRaw)
  });

  addBookForm.reset();
  searchInput.value = "";
  categoryFilter.value = "all";
  showSuccess("Book added to the catalogue.");
  renderBooks();
}

/**
 * Wires the page events once, then draws the starting catalogue.
 */
function init() {
  searchInput.addEventListener("input", renderBooks);
  categoryFilter.addEventListener("change", renderBooks);
  addBookForm.addEventListener("submit", handleAddBook);
  renderBooks();
}

init();
