import { ReviewPreview } from "./ReviewPreview.jsx";

export function ReviewList({reviews, deleteReview, loadingState}) {
  return (
    <div>
      <h3>Reviews</h3>
      <ul className="review-list">
        {reviews.length > 0
          ? (reviews.map((review) => (
                <ReviewPreview review={review} deleteReview={deleteReview} loadingState={loadingState} />
          )))
          : (
            <li className="no-reviews">No reviews available</li>
          )}
      </ul>

    </div>
  )
}