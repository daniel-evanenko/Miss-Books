import {loadFromStorage, makeId, saveToStorage, makeLorem, getRandomIntInclusive} from './util.service.js'
import {storageService} from './async-storage.service.js'
const BOOK_KEY = 'bookDB'
_createBooks()

export const bookService = {
  query,
  get,
  remove,
  save,
  getEmptyBook,
  getDefaultFilter
}

async function query(filterBy = {}) {
  try {
    const books = await storageService.query(BOOK_KEY); // ✅ books is constant

    let filteredBooks = [...books]; // ✅ Create a new variable for filtering
  
    if (filterBy.title) {
      const regExp = new RegExp(filterBy.title, 'i');
      filteredBooks = filteredBooks.filter(book => regExp.test(book.title));
    }
  
    if (filterBy.amount) {
      filteredBooks = filteredBooks.filter(book => book.listPrice.amount >= filterBy.amount);
    }
  
    return filteredBooks; // ✅ Return the new filtered array

  } catch (error) {
    console.log(error);
    
  }
}

async function get(bookId) {
  try {
    const book = await storageService
      .get(BOOK_KEY, bookId)
    return _setNextPrevBookId(book)
  } catch (err) {
    console.log(err)
  }

}

function remove(bookId) {
  return storageService.remove(BOOK_KEY, bookId)
}

function save(book) {
  if (book.id) {
    return storageService.put(BOOK_KEY, book)
  } else {
    let newBook = _createBookObject();
    newBook.title = book.title
    newBook.listPrice.amount = book.listPrice.amount;
    return storageService.post(BOOK_KEY, newBook)
  }
}

function getEmptyBook(title = '', listPrice = {
  amount: '',
  currencyCode: '',
  isOnSale: ''
}) {
  return {title, listPrice}
}

function getDefaultFilter() {
  return {title: '', amount: ''}
}

async function _setNextPrevBookId(book) {
  const books = await query()
  const bookIdx = books.findIndex((currbook) => currbook.id === book.id)
  const nextBook = books[bookIdx + 1]
    ? books[bookIdx + 1]
    : books[0]
  const prevBook = books[bookIdx - 1]
    ? books[bookIdx - 1]
    : books[books.length - 1]
  book.nextBookId = nextBook.id
  book.prevBookId = prevBook.id
  return book
}

function _createBooks() {
  let books = loadFromStorage(BOOK_KEY)
  if (!books || !books.length) {
    books = [];
    for (let i = 0; i < 20; i++) {
      const book = _createBookObject()
      books.push(book)
    }
    saveToStorage(BOOK_KEY, books)
  }
}

/**
 * Generate a new book object with randomized values.
 */
function _createBookObject() {
  const categories = ['Love', 'Fiction', 'Poetry', 'Computers', 'Religion'];
  return {
    id: makeId(),
    title: makeLorem(2),
    subtitle: makeLorem(4),
    authors: [makeLorem(1)],
    publishedDate: getRandomIntInclusive(1950, 2024),
    description: makeLorem(20),
    pageCount: getRandomIntInclusive(20, 600),
    categories: [categories[getRandomIntInclusive(0, categories.length - 1)]],
    thumbnail: `https://www.coding-academy.org/books-photos/${getRandomIntInclusive(1, 20)}.jpg`,
    language: "en",
    listPrice: {
      amount: getRandomIntInclusive(80, 500),
      currencyCode: "EUR",
      isOnSale: Math.random() > 0.7
    }
  };
}