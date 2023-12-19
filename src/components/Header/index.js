import { Link } from "react-router-dom";
import { HiOutlineSearch } from "react-icons/hi";
import { AiFillCloseCircle } from "react-icons/ai";
import "./index.css";
import NetflixCloneContext from "../../context/NetflixCloneContext";

const Header = (props) => (
  <NetflixCloneContext.Consumer>
    {(value) => {
      const {
        currentPage,
        updateCurrentPage,
        statusOfMenuBtn,
        updateMenuBtnStatus,
        enteredSearchData,
        updateSearchData,
        updateStatusOfSearchBtn,
      } = value;

      const { isSearchPage } = props;

      const styleForHome =
        currentPage === "HOME"
          ? "selected-header-list-el"
          : "unSelected-header-list-el";
      const styleForPopular =
        currentPage === "POPULAR"
          ? "selected-header-list-el"
          : "unSelected-header-list-el";

      const styleForAccount =
        currentPage === "ACCOUNT"
          ? "selected-header-list-el"
          : "unSelected-header-list-el";

      const updatePage = (page) => {
        updateCurrentPage(page);
      };

      const menuBtnTriggered = () => {
        updateMenuBtnStatus();
      };

      const updateSearchValueFun = (event) => {
        updateSearchData(event.target.value);
      };

      const searchBtnTriggered = () => {
        updateStatusOfSearchBtn();
      };

      const searchBar = () => (
        <div className="searchInput-container">
          <input
            type="search"
            placeholder="search"
            className="search-bar-item"
            value={enteredSearchData}
            onChange={updateSearchValueFun}
          />
          <button
            type="button"
            testid="searchButton"
            className="searchIcon-button-for-searchBar"
            onClick={searchBtnTriggered}
          >
            <HiOutlineSearch className="searchIcon" />
          </button>
        </div>
      );

      const renderSearchIcon = () => (
        <button type="button" className="search-btn" testid="searchButton">
          <Link to="/search" className="link-el">
            <HiOutlineSearch className="searchIcon" />
          </Link>
        </button>
      );

      const menuOptionsForSmallDevice = () => (
        <div className="link-el-sm-container">
          <ul className="sm-list-el">
            <Link to="/" className="link-el">
              <li className={styleForHome} onClick={() => updatePage("HOME")}>
                Home
              </li>
            </Link>
            <Link to="/popular" className="link-el">
              <li
                className={styleForPopular}
                onClick={() => updatePage("POPULAR")}
              >
                Popular
              </li>
            </Link>
            <li
              className={styleForAccount}
              onClick={() => updatePage("ACCOUNT")}
            >
              <Link to="/account" className="link-el">
                Account
              </Link>
            </li>
          </ul>
          <button
            type="button"
            className="close-btn-sd"
            onClick={updateMenuBtnStatus}
          >
            <AiFillCloseCircle className="close-icon" />
          </button>
        </div>
      );

      return (
        <header>
          <nav className="header-container">
            <div className="logo-and-links-container">
              <Link
                to="/"
                className="link-el"
                onClick={() => updatePage("HOME")}
              >
                <img
                  src="https://res.cloudinary.com/dm9htjdeq/image/upload/v1701235552/headerLogo_zuvzla.svg"
                  alt="website logo"
                  className="header-logo"
                />
              </Link>
              <ul className="header-list-container">
                <Link to="/" className="link-el">
                  <li
                    className={styleForHome}
                    onClick={() => updatePage("HOME")}
                  >
                    Home
                  </li>
                </Link>
                <Link to="/popular" className="link-el">
                  <li
                    className={styleForPopular}
                    onClick={() => updatePage("POPULAR")}
                  >
                    Popular
                  </li>
                </Link>
              </ul>
            </div>
            <div className="icons-section">
              {isSearchPage === "true" ? searchBar() : renderSearchIcon()}
              <Link to="/account" className="link-el">
                <img
                  src="https://res.cloudinary.com/dm9htjdeq/image/upload/v1701256210/AvataruserLogo_vxaomb.svg"
                  alt="profile"
                  className="profileLogo"
                />
              </Link>
              <button
                type="button"
                className="search-btn"
                onClick={menuBtnTriggered}
              >
                <img
                  src="https://res.cloudinary.com/dm9htjdeq/image/upload/v1701262700/menuIcon_p8b2cc.svg"
                  alt="menu-icon"
                  className="menuIcon"
                />
              </button>
            </div>
          </nav>
          {statusOfMenuBtn ? menuOptionsForSmallDevice() : null}
        </header>
      );
    }}
  </NetflixCloneContext.Consumer>
);

export default Header;
