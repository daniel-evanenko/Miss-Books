const {useState, useEffect} = React;
const {Link} = ReactRouterDOM
import { BookFilter } from "../cmps/BookFilter.jsx";
import { bookService } from "../services/book.service.js";
import { BookList } from "../cmps/BookList.jsx";

export function BookIndex() {
  const [books, setBooks] = useState(null);
  const [filterBy, setFilterBy] = useState(() => bookService.getDefaultFilter());

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
      })
      .catch(err => {
        console.log("Cannot remove book:", err);
      });
  }

  function onSetFilter(updatedFilter) {
    setFilterBy(prevFilter => ({
      ...prevFilter,
      ...updatedFilter
    }));
  }

  if (!books) return <div className="loader">Loading...</div>;

  return (
    <section className="book-index">
      <BookFilter onSetFilter={onSetFilter} filterBy={filterBy} />
      <Link to="/book/edit" className="add-book-button">
        Add book
      </Link>
      <BookList books={books} onRemoveBook={onRemoveBook} />
    </section>
  );
}
