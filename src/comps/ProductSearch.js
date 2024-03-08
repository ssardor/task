import React, { useState } from "react";

const ProductSearch = ({ onSearch, setLoading }) => {
  const [query, setQuery] = useState("");
// сохраняется в state
  const handleChange = (e) => {
    setQuery(e.target.value);
  };
// функция которая проверяет не пустая ли value если пустая вернет alert в другом случае отправляет value для запроса 
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!query.trim()) {
      alert("Fill the input");
      return;
    }
    onSearch(query);
    setLoading(true);
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
          Искать
        </button>
      </div>
    </form>
  );
};

export default ProductSearch;
