import {bookService} from "../services/book.service.js"
import {LongTxt} from "../cmps/LongTxt.jsx"
import {AddReview} from "../cmps/AddReview.jsx"
import {showErrorMsg, showSuccessMsg} from "../services/event-bus.service.js"
import { RateByStars } from "../cmps/DynamicRevireCmps/RateByStars.jsx"
import { isNumber } from "../services/util.service.js"
const {useState, useEffect} = React
const {useParams, Link} = ReactRouterDOM

export function BookDetails() {

  const [book,
    setbook] = useState(null)
  const [reviews,
    setReviews] = useState([])
  const [loadingStates,
    setLoadingStates] = useState({});

  const params = useParams()

  useEffect(() => {
    loadbook()
  }, [params.bookId])

  function loadbook() {
    setbook(null)
    bookService
      .get(params.bookId)
      .then((book) => {
        setbook(book)
        setReviews(book.reviews)
      })
      .catch(err => {
        console.log('Cannot load book:', err)
      })

  }

  function checkPageCount() {
    if (book.pageCount > 500) 
      return "serious-reading";
    else if (book.pageCount > 200) 
      return "descent-reading";
    else if (book.pageCount > 100) 
      return "light-reading";
    else 
      return "short-read"; // Default for <= 100 pages
    }
  
  function checkPublishDate() {
    const years = new Date().getFullYear() - book.publishedDate;

    if (years > 10) 
      return "vintage"; // Books older than 10 years
    else if (years < 1) 
      return "new"; // Books published this year
    else 
      return "recent"; // Books between 1 and 10 years old
    }
  
  async function onAddReview(review) {
    setLoadingStates((prev) => ({
      ...prev,
      adding: true
    }));
    try {
      const updatedBook = await bookService.addReview(book.id, review);
      setReviews(updatedBook.reviews);
      showSuccessMsg("Added review successfully");
    } catch (error) {
      console.log(error);
      showErrorMsg("Error adding review");
    } finally {
      setLoadingStates((prev) => ({
        ...prev,
        adding: false
      }));
    }
  }

  async function onDeleteReview(reviewId) {
    setLoadingStates((prev) => ({
      ...prev,
      [reviewId]: true
    }));

    try {
      const updatedBook = await bookService.removeReview(book.id, reviewId);
      setReviews(updatedBook.reviews);
      showSuccessMsg("Review removed successfully");
    } catch (error) {
      console.log(error);
      showErrorMsg("Error removing review");
    } finally {
      setLoadingStates((prev) => ({
        ...prev,
        [reviewId]: false
      }));
    }
  }

  if (!book) 
    return <div class="loader">Loading...</div>

  return (
    <section className="book-details">
      <div className="card">
        <section>
          <button>
            <Link to={`/book/${book.prevBookId}`}>{"<-Prev book"}
            </Link>
          </button>
          <button>
            <Link to={`/book/${book.nextBookId}`}>
              {"Next book->"}</Link>
          </button>
        </section>
        <h1>Book Title: {book.title}</h1>
        <h2>Subtitle: {book.subtitle}</h2>
        <h3>Author(s): {book
            .authors
            .join(', ')}</h3>
        <p className={`book-status ${checkPublishDate()}`}>{checkPublishDate()}</p>
        <p className={`book-status ${checkPageCount()}`}>{checkPageCount().replace(/-/g, " ")}</p>

        <div>
          <div className="image-container">
            {book.listPrice.isOnSale && <span className="sale-banner">SALE</span>}
            <img src={book.thumbnail} alt={book.title}/>
          </div>
        </div>

        <p>Published: {book.publishedDate}
        </p>

        <p>Page Count: {book.pageCount}
          pages
        </p>
        <p>Category: {book
            .categories
            .join(', ')}</p>
        <p>Language: {book
            .language
            .toUpperCase()}</p>
        <p>
          Price:
          <span
            className={book.listPrice.isOnSale
            ? "on-sale"
            : "reg-price"}>
            {book.listPrice.amount}
            {book.listPrice.currencyCode}
          </span>
        </p>
        <div>Description:
          <LongTxt txt={book.description}/>
        </div>

        <AddReview addReview={onAddReview} isLoading={loadingStates.adding}/>

        <div>
          <h3>Reviews</h3>
          <ul className="review-list">
            {reviews.length > 0
              ? (reviews.map((review) => (
                <li className="review-item" key={review.id}>
                  <span className="name">{review.fullName}</span>
                   <span className="rating">{review.rating && isNumber(review.rating) ? <RateByStars val={review.rating} readOnly /> : review.rating }</span>
                  <span className="date">📅 {review.readAt}</span>
                  <button
                    className="delete-btn"
                    onClick={() => onDeleteReview(review.id)}
                    disabled={loadingStates[review.id]}>
                    {loadingStates[review.id]
                      ? "Removing..."
                      : "Delete"}
                  </button>
                </li>
              )))
              : (
                <li className="no-reviews">No reviews available</li>
              )}
          </ul>

        </div>
      </div>

    </section>
  );
};