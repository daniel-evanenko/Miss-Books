const {useState, useEffect} = React

export function BookFilter({filterBy, onSetFilter}) {

  const [filterByToEdit,
    setFilterByToEdit] = useState({
    ...filterBy
  })

  useEffect(() => {
    onSetFilter(filterByToEdit)
  }, [filterByToEdit])

  function handleChange({target}) {
    let {value, name: field} = target
    switch (target.type) {
      case 'range':
      case 'number':
        value = +target.value
        break
      case 'checkbox':
        value = target.checked
        break
    }
    setFilterByToEdit((prevFilter) => ({
      ...prevFilter,
      [field]: value
    }))
  }

  const {title, amount} = filterByToEdit
  return (
    <section className="book-filter">
      <h2>Filter Our Books</h2>
      <form>
        <label htmlFor="title">Title</label>
        <input
          onChange={handleChange}
          value={title}
          type="text"
          name="title"
          id="title"/>

        <label htmlFor="amount">Amount</label>
        <input
          onChange={handleChange}
          value={amount || ''}
          min={0}
          type="number"
          name="amount"
          id="amount"/>

      </form>
    </section>
  )
}