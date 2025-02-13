import {bookService} from "../services/book.service.js";

const {useState} = React;

export function AddReview({addReview, isLoading}) {

  const [review,
    setReview] = useState(bookService.getDefaultReview());

  function onAddReview(ev) {
    ev.preventDefault();
    addReview(review)
    setReview(bookService.getDefaultReview())
  }

  function handleChange({target}) {
    let {value, name: field} = target
    switch (target.type) {
      case 'checkbox':
        value = target.checked
        break
    }
    setReview((prevReview) => ({
      ...prevReview,
      [field]: value
    }))
  }

  return (
    <section className="add-review">
      <h1>Add review</h1>
      <form onSubmit={onAddReview}>
        <label htmlFor="fullName">Fullname:</label>
        <input
          value={review.fullName}
          onChange={handleChange}
          type="text"
          name="fullName"
          id="fullName"
          required/>

        <label htmlFor="rating">Rating:</label>
        <select onChange={handleChange} value={review.rating} name="rating" id="rating">
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
        </select>

        <label htmlFor="readAt">Read at:</label>
        <input
          required
          onChange={handleChange}
          value={review.readAt}
          type="date"
          id="readAt"
          name="readAt"/>

        <button type="submit" disabled={isLoading}>
          {isLoading
            ? "Adding..."
            : "Add"}
        </button>
      </form>
    </section>
  );
}
