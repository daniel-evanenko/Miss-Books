
export function BookPreview({ book }) {
    return (
        <article className="book-preview">
            <h2>Title: {book.title}</h2>
            <img src={`${book.thumbnail}`} alt="book-image" />

        </article>
    )
}