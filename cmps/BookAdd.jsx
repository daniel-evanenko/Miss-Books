const {useState, useEffect, useRef} = React;
const {useNavigate} = ReactRouterDOM

import {debounce} from "../services/util.service.js";
import {googleBookService} from "../services/googleBook.service.js";
import {showSuccessMsg} from "../services/event-bus.service.js";
export function BookAdd() {
  const [query,
    setQuery] = useState("");
  const [books,
    setBooks] = useState([]);
  const [loadingStates,
    setLoadingStates] = useState({});
  const debouncedFetchBooks = useRef(debounce(fetchBooks)).current;
  const navigate = useNavigate();

  useEffect(() => {
    if (query.trim()) {
      debouncedFetchBooks(query);
    }
  }, [query, debouncedFetchBooks]);

  async function fetchBooks(searchTerm) {
    setLoadingStates((prev) => ({
      ...prev,
      searching: true
    }));
    try {
      const data = await googleBookService.query(searchTerm);
      setBooks(data.items || []);
    } catch (error) {
      console.error("Error fetching books:", error);
    } finally {
      setLoadingStates((prev) => ({
        ...prev,
        searching: false
      }));
    }
  };

  async function addBook(googleBook) {
    setLoadingStates((prev) => ({
      ...prev,
      [googleBook.id]: true
    }));
    try {
      const updatedBook = await googleBookService.addGoogleBook(googleBook);
      if (!updatedBook) 
        showErrorMsg("Book is already exists in the shop")
      else {
        showSuccessMsg("Book added successfully")
        // setBooks((prev)=> prev = prev.filter((book) => book.id != updatedBook.id))
        navigate("/book");
      }

    } catch (error) {
      console.log(error)
    } finally {
      setLoadingStates((prev) => ({
        ...prev,
        [googleBook.id]: false
      }));
    }

  };

  return (
    <div className="book-add">
      <div >
        <input
          type="search"
          placeholder="Search for books..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}/>
      </div>
      {loadingStates.searching && <p>Searching...</p>}
      {/* Book List */}
      <ul className="books-list">
        {books.length > 0
          ? (books.map((book) => (
            <li className="book-item" key={book.id}>
              <div >
                <h3>{book.volumeInfo.title}</h3>
              </div>
              <button onClick={() => addBook(book)} disabled={loadingStates[book.id]}>
                {loadingStates[book.id]
                  ? "Adding"
                  : "+"}
              </button>

            </li>
          )))
          : (
            <li className="book-item no-reviews">No books found</li>

          )}
      </ul>
    </div>
  );
};
