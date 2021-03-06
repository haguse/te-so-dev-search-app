import React, { useState } from "react";
import { Dropdown } from "react-bootstrap";
import { Link } from "react-router-dom";
import tesodevMiniLogo from "../images/tesodev_sm.png";
import SearchPagination from "../components/SearchPagination";
import "../styles/searchResults.css";

const SearchResults = ({ location }) => {
  // Get Items
  const [orderedArray, setOrderedArray] = useState(
    location.state.searchFilteredArray
  );
  // Stock Items
  const [searchArray] = useState(location.state.searchArray);

  // Ordering
  const orderByNameAscending = () => {
    const sortedArray = [...orderedArray].sort((a, b) => (a < b ? -1 : 1));
    setOrderedArray(sortedArray);
  };
  const orderByNameDescending = () => {
    const sortedArray = [...orderedArray].sort((a, b) => (a > b ? -1 : 1));
    setOrderedArray(sortedArray);
  };
  const orderByYearAscending = () => {
    const sortedArray = [...orderedArray].sort((a, b) => {
      let dateA = new Date(a[3].slice(-4), a[3].slice(3, 5), a[3].slice(0, 2));
      let dateB = new Date(b[3].slice(-4), b[3].slice(3, 5), b[3].slice(0, 2));
      return dateA - dateB;
    });
    setOrderedArray(sortedArray);
  };
  const orderByYearDescending = () => {
    const sortedArray = [...orderedArray].sort((a, b) => {
      let dateA = new Date(a[3].slice(-4), a[3].slice(3, 5), a[3].slice(0, 2));
      let dateB = new Date(b[3].slice(-4), b[3].slice(3, 5), b[3].slice(0, 2));
      return dateB - dateA;
    });
    setOrderedArray(sortedArray);
  };

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(4);
  // Get Current Posts
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = orderedArray.slice(indexOfFirstItem, indexOfLastItem);
  // Change Page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const [searchQuery, setSearchQuery] = useState("");

  const handleSearchWord = (e) => {
    setSearchQuery(e.target.value);
  };

  // Min. Letter Control
  const handleSearch = () => {
    if (searchQuery.length >= 3) {
      document.querySelector(".error-message").innerHTML = "";
      setOrderedArray(newFilteredSearchArray);
    } else {
      //setShowMiniSearch(false);
      document.querySelector(".error-message").innerHTML =
        '<p class="text-danger">You must enter at least 3 letters to search.</p>';
    }
  };

  let newFilteredSearchArray = searchArray.filter((item) => {
    return item[0].toLowerCase().indexOf(searchQuery.toLowerCase()) !== -1;
  });

  return (
    <>
      <div className="container-fluid mt-2">
        <div className="row">
          <div className="col-md-2">
            <Link to="/">
              <img
                className="img-fluid tesodev-logo-sm"
                src={tesodevMiniLogo}
                alt=""
              />
            </Link>
          </div>
          <div className="col-md-8 my-auto d-flex">
            <input
              className="col-md-8 search-input rounded-3 ms-1"
              placeholder="Search by name ... (ex: 'bre', 'vin')"
              type="search"
              minLength="3"
              onChange={handleSearchWord}
            />
            <button onClick={handleSearch} className="btn search-button ms-3">
              Search
            </button>
          </div>
        </div>
        <div className="error-message col-md-9 text-center"></div>
      </div>
      <div className="container mt-4">
        <div className="row">
          <div className="col-md-9 resultArea">
            <div className="order-area float-end">
              <Dropdown>
                <Dropdown.Toggle variant="secondary" id="dropdown-basic">
                  Order By
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  <Dropdown.Item onClick={orderByNameAscending}>
                    Name Ascending
                  </Dropdown.Item>
                  <Dropdown.Item onClick={orderByNameDescending}>
                    Name Descending
                  </Dropdown.Item>
                  <Dropdown.Item onClick={orderByYearAscending}>
                    Year Ascending
                  </Dropdown.Item>
                  <Dropdown.Item onClick={orderByYearDescending}>
                    Year Descending
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </div>
            <ul>
              {currentItems.map((item, value) => {
                return (
                  <li key={value}>
                    <p className="mt-2">
                      <strong>{item[0]}</strong>
                    </p>{" "}
                    <p className="d-inline float-end">{item[2]}</p>
                    <p>{item[1]}</p>
                    <p className="d-inline">
                      {item[4]} / {item[5]}
                    </p>
                    <p className="float-end">
                      <i>{item[3]}</i>
                    </p>
                    <hr />
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </div>
      <SearchPagination
        itemsPerPage={itemsPerPage}
        totalItems={orderedArray.length}
        paginate={paginate}
      />
    </>
  );
};

export default SearchResults;
