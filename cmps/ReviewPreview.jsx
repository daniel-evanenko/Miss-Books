import { isNumber } from "../services/util.service.js";
import { RateByStars } from "../cmps/DynamicRevireCmps/RateByStars.jsx"

export function ReviewPreview({review, deleteReview , loadingState}){
    return (
        <li className="review-item" key={review.id}>
        <span className="name">{review.fullName}</span>
        <span className="rating">{review.rating && isNumber(review.rating)
            ? <RateByStars val={review.rating} readOnly/>
            : review.rating}</span>
        <span className="date">📅 {review.readAt}</span>
        <button
          className="delete-btn"
          onClick={() => deleteReview(review.id)}
          disabled={loadingState[review.id]}>
          {loadingState[review.id]
            ? "Removing..."
            : "Delete"}
        </button>
      </li>
    )
}