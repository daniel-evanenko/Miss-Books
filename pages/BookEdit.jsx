import {bookService} from "../services/book.service.js";
import {showErrorMsg, showSuccessMsg} from "../services/event-bus.service.js";

const {useState, useEffect} = React;
const {useNavigate, useParams, Link} = ReactRouterDOM;

export function BookEdit() {
  const [bookToEdit,
    setBookToEdit] = useState(bookService.getEmptyBook());
  const [isLoading,
    setIsLoading] = useState(false);

  const navigate = useNavigate();
  const {bookId} = useParams();

  useEffect(() => {
    if (bookId) 
      loadBook();
    }
  , [bookId]);

  function loadBook() {
    setIsLoading(true);
    bookService
      .get(bookId)
      .then((book) => {
        setBookToEdit(book);
      })
      .catch((err) => {
        console.log("Cannot load book:", err);
      })
      . finally(() => setIsLoading(false));
  }

  function onSaveBook(ev) {
    ev.preventDefault();
    bookService
      .save(bookToEdit)
      .then((bookToSave) => {
        console.log(`Book (${bookToSave.id}) Saved!`);
        showSuccessMsg("Book saved successfully")
      })
      .catch((err) => {
        console.log("Cannot save book:", err);
        showErrorMsg("Cannot save book")
      })
      . finally(() => navigate("/book"));
  }

  function handleChange({target}) {
    let {value, name: field} = target;

    switch (field) {
      case "listPrice":
        setBookToEdit((prevBook) => ({
          ...prevBook,
          [field]: {
            ...prevBook.listPrice,
            amount: value
          }
        }));
        break;
      case 'title':
        setBookToEdit((prevBook) => ({
          ...prevBook,
          [field]: value
        }))
      default:
        break;
    }

  }

  const {title, listPrice} = bookToEdit;
  const loadingClass = isLoading
    ? "loading"
    : "";

  return (
    <section className={`book-edit ${loadingClass}`}>
      <h1>{bookId
          ? "Edit"
          : "Add"}
        Book</h1>
      <form onSubmit={onSaveBook}>
        <label htmlFor="title">title</label>
        <input
          value={title}
          onChange={handleChange}
          type="text"
          name="title"
          id="title"
          required/>

        <label htmlFor="listPrice">Price</label>
        <input
          value={listPrice.amount}
          onChange={handleChange}
          type="number"
          name="listPrice"
          id="listPrice"
          required/>
        <section className="btns flex">
          <button>Save</button>
          <button type="button" className="back-btn">
            <Link to="/book">Back</Link>
          </button>
        </section>
      </form>
    </section>
  );
}
