export function SelectBoxRating({val = {},name ,onChangeVal}) {
    const opts = [1, 2, 3, 4, 5];
    return (
      <div style={{ display: "inline" }}>
        <label htmlFor={name}>Rating:</label>
        <select value={val} onChange={onChangeVal} name={name}>
          {opts.map(opt => (
            <option key={opt} value={opt}>{opt}</option>
          ))}
        </select>
      </div>
    );
  }