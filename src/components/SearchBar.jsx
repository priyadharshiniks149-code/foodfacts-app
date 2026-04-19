import { useState } from "react";

function SearchBar({ onSearch }) {
  const [query, setQuery] = useState("");
  const [validationError, setValidationError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!query.trim()) {
      setValidationError("Please enter a food name to search.");
      return;
    }

    if (query.trim().length < 2) {
      setValidationError("Search must be at least 2 characters.");
      return;
    }

    setValidationError("");
    onSearch(query.trim());
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Search food..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />

      <button type="submit">Search</button>

      {validationError && (
        <p className="validation-error">
          {validationError}
        </p>
      )}
    </form>
  );
}

export default SearchBar;