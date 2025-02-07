
const { useEffect, useState } = React
const { Link } = ReactRouterDOM
import { BookFilter } from "../cmps/BookFilter.jsx"
import {bookService} from "../services/book.service.js"
import {BookList} from "../cmps/BookList.jsx"
export function BookIndex(){

    const [books, setbooks] = useState(null)
    const [filterBy, setFilterBy] = useState(bookService.getDefaultFilter())

    useEffect(() => {
        loadbooks()
    }, [filterBy])

    function loadbooks() {
        bookService.query(filterBy)
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

    function onSetFilter(filterBy) {
        console.log('filterBy:', filterBy)
        setFilterBy(prevFilter => ({ ...prevFilter, ...filterBy }))
    }
    if (!books) return <div class="loader">Loading...</div>

    return (
        <section className="book-index">
        <BookFilter onSetFilter={onSetFilter} filterBy={filterBy}/>
            <Link to="/book/edit">Add book</Link>
             <BookList
                books={books}
                onRemoveBook={onRemovebook}
            /> 
        </section>
    )

}