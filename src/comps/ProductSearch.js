import React, { useState } from "react";

const ProductSearch = ({ onSearch }) => {
  const [query, setQuery] = useState("");

  const handleChange = (e) => {
    setQuery(e.target.value);
  };

  const handleSubmit = (e) => {
    if (query.trim() === "") {
      alert("Fill the input");
      window.location.reload();
    } else {
      e.preventDefault();
      onSearch(query);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="d-flex">
        <input
          type="text"
          className="form-control "
          value={query}
          onChange={handleChange}
          placeholder="поиск бренда,названия и цены"
        />
        <button className="btn btn-primary" type="submit">
          Search
        </button>
      </div>
    </form>
  );
};

export default ProductSearch;
