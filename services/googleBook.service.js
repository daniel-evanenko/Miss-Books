import {makeLorem, getRandomIntInclusive} from './util.service.js'
import {storageService} from './async-storage.service.js'
const BOOK_KEY = 'bookDB'
export const googleBookService = {
  query,
  addGoogleBook
}

async function query(txt) {
  try {
    let response = await fetch(`https://www.googleapis.com/books/v1/volumes?q=${txt}`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error)
  }
}

async function addGoogleBook(googleBook) {

try {
    const books = await storageService.query(BOOK_KEY)
    const isBookExists = books.some((book) => book.id === googleBook.id);
    if (isBookExists) {
      return;
    }
    let newBook = {
      id: googleBook.id,
      title: googleBook.volumeInfo.title || "Unknown Title",
      subtitle: makeLorem(4),
      authors: googleBook.volumeInfo.authors || ["Unknown Author"],
      publishedDate: getRandomIntInclusive(1950, 2024),
      description: googleBook.volumeInfo.description || makeLorem(120),
      pageCount: googleBook.volumeInfo.pageCount || getRandomIntInclusive(20, 600),
      categories: googleBook.volumeInfo.categories || ["General"],
      thumbnail: (googleBook.volumeInfo.imageLinks && googleBook.volumeInfo.imageLinks.thumbnail) || `https://www.coding-academy.org/books-photos/${getRandomIntInclusive(1, 20)}.jpg`,
      language: googleBook.volumeInfo.language || "en",
      listPrice: {
        amount: getRandomIntInclusive(80, 500),
        currencyCode: "EUR",
        isOnSale: Math.random() > 0.7
      },
      reviews: []
    };
    return await storageService.post(BOOK_KEY, newBook)
} catch (error) {
    console.log(error)
}

}