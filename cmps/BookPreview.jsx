
export function BookPreview({ book }) {
    return (
        <article className="book-preview">
            <h2>Title: {book.title}</h2>
            {/* <img src={`../assets/img/${book.thumbnail}.png`} alt="book-image" /> */}
            <img src={'../assets/img/3.jpg'} alt="book-image" />
        </article>
    )
}