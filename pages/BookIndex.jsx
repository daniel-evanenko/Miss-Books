const {useEffect, useState} = React
const {Link} = ReactRouterDOM
import {BookFilter} from "../cmps/BookFilter.jsx"
import {bookService} from "../services/book.service.js"
import {BookList} from "../cmps/BookList.jsx"
export function BookIndex() {

  const [books,setBooks] = useState(null)
  const [filterBy,setFilterBy] = useState(bookService.getDefaultFilter())

  useEffect(() => {
    loadBooks()
  }, [filterBy])

  function loadBooks() {
    bookService
      .query(filterBy)
      .then(books => {
        console.log("Books loaded:", books); // Debugging
        setBooks(books);
      })
      .catch(err => {
        console.log("Cannot get books:", err);
      });
  }
  

  function onRemovebook(bookId) {
    bookService
      .remove(bookId)
      .then(() => {
        setBooks(books => books.filter(book => book.id !== bookId))
      })
      .catch(err => {
        console.log('Cannot remove book:', err)
      })
  }

  function onSetFilter(filterBy) {
    setFilterBy(prevFilter => ({
      ...prevFilter,
      ...filterBy
    }))
  }
  if (!books) 
    return <div class="loader">Loading...</div>

  return (
    <section className="book-index">
      <BookFilter onSetFilter={onSetFilter} filterBy={filterBy}/>
      <Link to="/book/edit" className="add-book-button">
        Add book
      </Link>
      <BookList books={books} onRemoveBook={onRemovebook}/>
    </section>
  )

}