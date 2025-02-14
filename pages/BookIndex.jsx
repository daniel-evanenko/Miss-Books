const {useState, useEffect} = React;
const {Link} = ReactRouterDOM
import {BookFilter} from "../cmps/BookFilter.jsx";
import {bookService} from "../services/book.service.js";
import {BookList} from "../cmps/BookList.jsx";
import {showErrorMsg, showSuccessMsg} from "../services/event-bus.service.js";

export function BookIndex() {
  const [books,
    setBooks] = useState(null);
  const [filterBy,
    setFilterBy] = useState(() => bookService.getDefaultFilter());

  useEffect(() => {
    loadBooks();
  }, [filterBy]);

  function loadBooks() {
    bookService
      .query(filterBy)
      .then(books => {
        setBooks(books);
      })
      .catch(err => {
        console.log("Cannot get books:", err);
      });
  }

  function onRemoveBook(bookId) {
    bookService
      .remove(bookId)
      .then(() => {
        setBooks(prevBooks => prevBooks.filter(book => book.id !== bookId));
        showSuccessMsg("Book removed successfully")
      })
      .catch(err => {
        console.log("Cannot remove book:", err);
        showErrorMsg("Cannot remove book")

      });
  }

  function onSetFilter(updatedFilter) {
    setFilterBy(prevFilter => ({
      ...prevFilter,
      ...updatedFilter
    }));
  }

  if (!books) 
    return <div className="loader">Loading...</div>;
  
  return (
    <section className="book-index">
      <BookFilter onSetFilter={onSetFilter} filterBy={filterBy}/> {/* <Link to="/book/edit" className="add-book-button">
        Add book
      </Link> */}
      <Link to="/book/bookAdd" className="add-book-button">
        Add book
      </Link>
      <BookList books={books} onRemoveBook={onRemoveBook}/>
    </section>
  );
}
