import React from "react";
import "../../assets/css/navbar.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch, faUserCircle } from "@fortawesome/free-solid-svg-icons";

const Navbar = () => {
  return (
    <>
      <nav class="navbar navbar-expand-lg navbar-light border border-dark fixed-top">
        <div class="container-fluid">
          <a class="navbar-brand" href="/">
            Blog
          </a>
          <button
            class="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse" id="navbarSupportedContent">
            <ul class="navbar-nav ">
              <li class="nav-item">
                <a class="nav-link" href="/">
                  HOME
                </a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="/about">
                  ABOUT
                </a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="/contact">
                  CONTACT
                </a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="/blog">
                  BLOG
                </a>
              </li>
            </ul>
            {/* <form className="form_navbar">
              <input
                className="input_search form-control"
                type="search"
                placeholder="Search"
                aria-label="Search"
              />
              <button
                className="btn btn-outline-success btn_submit button_search"
                type="submit"
              >
                <FontAwesomeIcon className="fa-xs" icon={faSearch} />
              </button>
            </form> */}
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
