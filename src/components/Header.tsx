import { useApi } from "../context/ApiContext";
import { debounce } from "../utils/debounce";
import { useState, useMemo } from "react";

export function Header() {
  const { updateQueryParams, queryParams } = useApi();
  const [search, setSearch] = useState(queryParams.name ?? "");

  const clearAllFilters = () => {
    setSearch("");
    updateQueryParams({
      page: 1,
      name: "",
      sort: "none",
      status: "",
      species: "",
      gender: "",
    });
  };

  const handleSearch = (value: string) => {
    updateQueryParams({
      page: 1,
      name: value,
      sort: "none",
      status: "",
      species: "",
      gender: "",
    });
  };


  const debouncedSearch = useMemo(
    () => debounce(handleSearch, 500),
    []
  );

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearch(value);
    debouncedSearch(value);
  };

  return (
    <nav className="header__nav">
      <h1 className="header__title">Rick and Morty</h1>

      <input
        value={search}
        role="search"
        type="search"
        placeholder="Search"
        autoFocus
        onChange={handleSearchChange}
      />

      <button onClick={clearAllFilters}>Clear All</button>
    </nav>
  );
}
