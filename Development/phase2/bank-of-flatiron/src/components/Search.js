import React from "react";
function Search({handleSearch}) {
  return (
    <div className="input">
      <input
        type="text"
        placeholder="Search"
        onChange={handleSearch}
      />
    </div>
  );
}
export default Search;