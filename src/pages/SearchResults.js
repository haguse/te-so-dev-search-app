import React, { useState } from "react";
import { Dropdown } from "react-bootstrap";
import { Link } from "react-router-dom";
import tesodevMiniLogo from "../images/tesodev_sm.png";
import "../styles/searchResults.css";

const SearchResults = ({ location }) => {
  const [orderedArray, setOrderedArray] = useState(
    location.state.searchFilteredArray
  );

  const orderByNameAscending = () => {
    const sortedArray = [...orderedArray].sort((a, b) => (a < b ? -1 : 1));
    setOrderedArray(sortedArray);
  };
  const orderByNameDescending = () => {
    const sortedArray = [...orderedArray].sort((a, b) => (a > b ? -1 : 1));
    setOrderedArray(sortedArray);
  };
  const orderByYearAscending = () => {
    console.log("x");
  };

  const orderByYearDescending = () => {
    console.log("x");
  };

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
              className="col-md-8 search-input rounded-3"
              placeholder="Search by name ..."
              type="search"
              minLength="3"
            />
            <button className="btn search-button ms-3 ">Search</button>
          </div>
        </div>
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
                  <Dropdown.Item>
                    <p onClick={orderByNameDescending}>Name Descending</p>
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
            <ul className="deneme">
              {orderedArray.map((item, value) => {
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
    </>
  );
};

export default SearchResults;