import { bookService } from "../services/book.service.js"

const { useState, useEffect } = React
const { useParams, useNavigate, Link } = ReactRouterDOM

export function BookDetails(){

    const [book, setbook] = useState(null)
    const params = useParams()
    const navigate = useNavigate()

    useEffect(() => {
        loadbook()
    }, [params.bookId])

    function loadbook() {
        setbook(null)
        bookService.get(params.bookId)
            .then(setbook)
            .catch(err => {
                console.log('Cannot load book:', err)
            })
    }

    function onBack() {
        navigate('/book')
    }

    function checkPageCount() {
        if (book.pageCount > 500) return "serious-reading";
        else if (book.pageCount > 200) return "descent-reading";
        else if (book.pageCount > 100) return "light-reading";
        else return "short-read"; // Default for <= 100 pages
    }

    function checkPublishDate() {
        const years = new Date().getFullYear() - book.publishedDate;
        
        if (years > 10) return "vintage";  // Books older than 10 years
        else if (years < 1) return "new";  // Books published this year
        else return "recent";              // Books between 1 and 10 years old
    }

    if (!book) return <div class="loader">Loading...</div>
    
    return (
        <section className="book-details">
        <div>
        <h1>Book Title: {book.title}</h1>
            <h2>Subtitle: {book.subtitle}</h2>
            <h3>Author(s): {book.authors.join(', ')}</h3>
            <p className={`book-status ${checkPublishDate()}`}>{checkPublishDate()} </p>
            <p className={`book-status ${checkPageCount()}`}>{checkPageCount().replace(/-/g, " ")}</p>
            <p>Published: {book.publishedDate} </p>
            <p>Description: {book.description}</p>
            <p>Page Count: {book.pageCount} pages </p>
            <p>Category: {book.categories.join(', ')}</p>
            <p>Language: {book.language.toUpperCase()}</p>

            <div className="image-container">
                {book.listPrice.isOnSale && <span className="sale-banner">SALE</span>}
                <img src={book.thumbnail} alt={book.title} />
            </div>

            <p>
            Price: <span className={book.listPrice.isOnSale ? "on-sale" : "reg-price"}>
    {book.listPrice.amount} {book.listPrice.currencyCode}
</span>            
            </p>

            <button onClick={onBack}>Back</button>

            <section>
                <button>
                    <Link to={`/book/${book.prevBookId}`}>Prev book</Link>
                </button>
                <button>
                    <Link to={`/book/${book.nextBookId}`}>Next book</Link>
                </button>
            </section>
        </div>

        </section>
    );
};