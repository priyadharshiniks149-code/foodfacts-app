import { useState } from "react";

function useFoodSearch() {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const searchFood = async (query) => {
    setLoading(true);
    setError("");

    try {
      const response = await fetch(
`/api/cgi/search.pl?search_terms=${query}&json=1&page_size=10`
);

      const data = await response.json();

      setResults(data.products);
    } catch (err) {
      if (err.response) {
    setError(`Server error: ${err.response.status}. Please try again.`);
  } else if (err.request) {
    setError("Network error. Check your connection and try again.");
  } else {
    setError("Something went wrong. Please try again.");
  }

  setResults([]);
    }

    setLoading(false);
  };

  return { results, loading, error, searchFood };
}

export default useFoodSearch;