import { loadFromStorage, makeId, saveToStorage } from './util.service.js'
import { storageService } from './async-storage.service.js'

const BOOK_KEY = 'bookDB'
_createBooks()

export const carService = {
    query,
    get,
    remove,
    save,
    getEmptyBook,
    getDefaultFilter,
}

function query(filterBy = {}) {
    return storageService.query(BOOK_KEY)
        // .then(books => {
        //     if (filterBy.txt) {
        //         const regExp = new RegExp(filterBy.txt, 'i')
        //         books = books.filter(book => regExp.test(car.vendor))
        //     }
        //     if (filterBy.minSpeed) {
        //         books = books.filter(car => car.speed >= filterBy.minSpeed)
        //     }
        //     return books
        // })
}

function get(bookId) {
    return storageService.get(BOOK_KEY, bookId)
        .then(_setNextPrevBookId)
}

function remove(bookId) {
    return storageService.remove(BOOK_KEY, bookId)
}

function save(car) {
    if (car.id) {
        return storageService.put(BOOK_KEY, car)
    } else {
        return storageService.post(BOOK_KEY, car)
    }
}

function getEmptyBook(title = '', listPrice = {amount:'',currencyCode : '', isOnSale :''}) {
    return { title, listPrice }
}


function getDefaultFilter() {
    return { price: '', onSale: '' }
}


function _setNextPrevBookId(book) {
    return query().then((books) => {
        const bookIdx = books.findIndex((currCar) => currCar.id === book.id)
        const nextBook = books[bookIdx + 1] ? books[bookIdx + 1] : books[0]
        const prevBook = books[bookIdx - 1] ? books[bookIdx - 1] : books[books.length - 1]
        book.nextBookId = nextBook.id
        book.prevBookId = prevBook.id
        return book
    })
}

function _createBooks() {
    let books = loadFromStorage(BOOK_KEY)
    if (!books || !books.length) {
        books = [
            _createBook('a', {amount:103,currencyCode: 'ILS',isOnSale:false}),
            _createBook('b', {amount:107,currencyCode: 'ILS',isOnSale:false}),
            _createBook('c', {amount:45,currencyCode: 'ILS',isOnSale:true}),
            _createBook('d', {amount:76,currencyCode: 'ILS',isOnSale:false})
        ]
        saveToStorage(BOOK_KEY, books)
    }
}

function _createBook(title, listPrice) {
    const book = getEmptyBook(title, listPrice)
    book.id = makeId()
    return book
}