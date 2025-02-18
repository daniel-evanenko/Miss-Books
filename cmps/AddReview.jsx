import {bookService} from "../services/book.service.js";
import { RateByStars } from "./DynamicRevireCmps/RateByStars.jsx";
import { SelectBoxRating } from "./DynamicRevireCmps/SelectBoxRating.jsx";
import { TextBoxRating } from "./DynamicRevireCmps/TextBoxRating.jsx";

const {useState} = React;

export function AddReview({addReview, isLoading}) {

  const [review, setReview] = useState(bookService.getDefaultReview());

  const [cmpType, setCmpType] = useState('selectBox')

  function onAddReview(ev) {
    ev.preventDefault();
    addReview(review)
    setReview(bookService.getDefaultReview())
  }

  function handleChange({target}) {
    let {value, name: field} = target;
    if (target.type === 'checkbox') {
      value = target.checked;
    }else if (target.type === 'select-one'){
      value = +value;
    }

    setReview((prevReview) => ({
      ...prevReview,
      [field]: value
    }))
  }

  return (
    <section className="add-review">
      <h1>Add review</h1>

      <div>
        <label htmlFor="rating">Rating options:</label>
        <select onChange={(ev) => setCmpType(ev.target.value)} value={cmpType}>
          <option value="selectBox">SelectBox</option>
          <option value="textBox">TextBox</option>
          <option value="rateByStars">RateByStars</option>

        </select>
      </div>
      <form onSubmit={onAddReview}>
        <label htmlFor="fullName">Fullname:</label>
        <input
          value={review.fullName}
          onChange={handleChange}
          type="text"
          name="fullName"
          id="fullName"
          required/>

        <label htmlFor="readAt">Read at:</label>
        <input
          required
          onChange={handleChange}
          value={review.readAt}
          type="date"
          id="readAt"
          name="readAt"/>

        <DynamicCmp
          type={cmpType}
          val={review.rating}
          onChangeVal={handleChange}/>

        <button type="submit" disabled={isLoading}>
          {isLoading
            ? "Adding..."
            : "Add"}
        </button>
      </form>
    </section>
  );
}


function DynamicCmp(props) {
  switch (props.type) {
    case 'textBox':
      return <TextBoxRating name="rating" {...props}/>
    case 'selectBox':
      return <SelectBoxRating name="rating" {...props}/>
    case 'rateByStars':
      return <RateByStars  name="rating" {...props}/>
  }
}
