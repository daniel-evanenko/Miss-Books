export function TextBoxRating({val = {},name ,onChangeVal}) {
    return (
      <div style={{ display: "inline" }}>
        <label htmlFor={name}>Rating:</label>
        <input type="text" name={name} value={val.toString()} onChange={onChangeVal}/>
      </div>
    );
  }