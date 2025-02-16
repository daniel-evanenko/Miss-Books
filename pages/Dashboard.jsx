const {useEffect, useState} = React
import {Chart} from '../cmps/Chart.jsx'
import {bookService} from '../services/book.service.js'

export function Dashboard() {
    const [books, setBooks] = useState([]);
    const [categoriesStats, setCategoriesStats] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  async function fetchData() {
    try {
      const booksData = await bookService.query();
      setBooks(booksData);

      const categoriesData = await bookService.getCategoriesStats();
      setCategoriesStats(categoriesData);

    } catch (err) {
      console.error('Failed to fetch data:', err);
    } finally {
      setLoading(false);
    }
  }
  if (!books && !categoriesStats) 
    return <div className="loader">Loading...</div>;
  
  return (
    <section className="dashboard">
      <h1>Dashboard</h1>
      <h2>Statistics for {books.length} Books</h2>
      <h4>By category</h4>
      <Chart data={categoriesStats}/>
      <hr/>
    </section>
  );
}