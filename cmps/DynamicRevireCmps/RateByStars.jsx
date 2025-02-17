const { useState } = React

 export function RateByStars({ val = {},name ,onChangeVal, readOnly = false }){
    
    const [hovered, setHovered] = React.useState(null);

    const handleClick = (rating) => {
      if (!readOnly) {
        onChangeVal({
          target: {
            name,
            type: "number",
            value: rating,
          },
        });
      }
    };
  
    return (
        <div className="rate-by-stars" style={{ cursor: readOnly ? "default" : "pointer" }}>
        {[1, 2, 3, 4, 5].map((star) => (
          <i
            key={star}
            className={
              star <= (hovered !== null ? hovered : val)
                ? "fas fa-star text-yellow-500"
                : "far fa-star text-gray-400"
            }
            onMouseEnter={() => !readOnly && setHovered(star)}
            onMouseLeave={() => !readOnly && setHovered(null)}
            onClick={() => handleClick(star)}
          />
        ))}
      </div>
    );
  };

