import { BookPreview } from "./BookPreview.jsx"
const { Link } = ReactRouterDOM

export function BookList({ books, onRemovebook }) {
    return (
        <ul className='book-list' title='Some Pop Up' >
            {books.map(book =>
                <li key={book.id}>
                    <BookPreview book={book} />
                    <section>
                        <button onClick={() => onRemovebook(book.id)}> Remove</button>
                        <button><Link to={`/book/${book.id}`}>Details</Link></button>
                        <button><Link to={`/book/edit/${book.id}`}>Edit</Link></button>
                    </section>
                </li>
            )}
        </ul>
    )
}