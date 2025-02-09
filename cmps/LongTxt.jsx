const {useState} = React;
export function LongTxt({
  txt = "",
  length = 100
}) {
  const [isExpanded,
    setIsExpanded] = useState(false);

  function toggleReadMore() {
    setIsExpanded(prevState => !prevState);
  }

  // Ensure txt is a string to prevent errors
  const safeTxt = typeof txt === "string"
    ? txt
    : "";
  const isLong = safeTxt.length > length; // Check if truncation is needed

  // Determine what text to show
  const displayTxt = isExpanded
    ? safeTxt
    : isLong
      ? safeTxt.slice(0, length) + "..."
      : safeTxt;

  return (
    <section className="long-text">
      <p>
        {displayTxt}
        {isLong && (
          <button className="read-more-btn" onClick={toggleReadMore}>
            {isExpanded
              ? " Read Less"
              : " Read More"}
          </button>
        )}
      </p>
    </section>

  );
}