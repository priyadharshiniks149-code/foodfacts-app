import { useState } from "react";
import SearchBar from "./components/SearchBar";
import FoodList from "./components/FoodList";

function App() {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searched, setSearched] = useState(false);

  const handleSearch = async (query) => {
    if (!query) return;

    setLoading(true);
    setSearched(true);

    try {
      const response = await fetch(
        `https://world.openfoodfacts.org/cgi/search.pl?search_terms=${encodeURIComponent(query)}&json=true`
      );

      const data = await response.json();

      console.log(data.products); // DEBUG

      // ✅ safer filter (DON'T over-filter)
      const filtered = data.products.filter((p) => p.product_name);

      setResults(filtered);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="app">
      <h1>FoodFacts</h1>

      <SearchBar onSearch={handleSearch} />

      {loading && <p>Loading...</p>}

      {!loading && !searched && (
        <p>Search for a food to see nutrition info.</p>
      )}

      {!loading && searched && results.length === 0 && (
        <p>No results found.</p>
      )}

      {!loading && results.length > 0 && (
        <FoodList products={results} />
      )}
    </div>
  );
}

export default App;