
const { useEffect, useState } = React
const { Link } = ReactRouterDOM
import { BookList } from "../cmps/BookList.jsx"
import {bookService} from "../services/book.service.js"
export function BookIndex(){

    const [books, setbooks] = useState(null)

    useEffect(() => {
        loadbooks()
    }, [])

    function loadbooks() {
        bookService.query()
        .then(setbooks)

        .catch(err => {
            console.log('Cannot get books:', err)
        })
    }

    function onRemovebook(bookId) {
        bookService.remove(bookId)
            .then(() => {
                setbooks(books => books.filter(book => book.id !== bookId))
            })
            .catch(err => {
                console.log('Cannot remove book:', err)
            })
    }


    if (!books) return <div class="loader">Loading...</div>

    return (
        <section className="book-index">
            <Link to="/book/edit">Add book</Link>
             <BookList
                books={books}
                onRemoveBook={onRemovebook}
            /> 
        </section>
    )

}