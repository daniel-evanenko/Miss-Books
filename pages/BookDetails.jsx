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

    if (!book) return <div class="loader">Loading...</div>
    
    return (
        <section className="book-details">
            <h1>book Title: {book.title}</h1>
            <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Facilis quae fuga eveniet, quisquam ducimus modi optio in alias accusantium corrupti veritatis commodi tenetur voluptate deserunt nihil quibusdam. Expedita, architecto omnis?</p>
            {/* <img src={`../assets/img/${book.thumbnail}.png`} alt="book-image" /> */}
            <img src={"../assets/img/2.jpg"} alt="book-image" />

            <button onClick={onBack}>Back</button>
            <section>
                <button ><Link to={`/book/${book.prevBookId}`}>Prev book</Link></button>
                <button ><Link to={`/book/${book.nextBookId}`}>Next book</Link></button>
            </section>
        </section>
    )
}