import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { TailSpin as Loader } from "react-loader-spinner";
import "./index.css";
import Cookies from "js-cookie";
import Header from "../Header";
import NetflixCloneContext from "../../context/NetflixCloneContext";
import Footer from "../Footer";

const statusCode = {
  initial: "INITIAL",
  inProgress: "INPROGRESS",
  empty: "EMPTY",
  success: "SUCCESS",
  failure: "FAILURE",
};

const SearchPage = () => {
  const [searchPageData, updateSearchPageData] = useState([]);
  const [searchPageFetchingStatus, updateSearchPageStatus] = useState(
    statusCode.initial
  );
  const navigate = useNavigate();

  const fetchSearchData = async (searchText, updateStatusOfSearchBtn) => {
    try {
      updateSearchPageStatus(statusCode.inProgress);
      const jwtToken = Cookies.get("jwt_token");
      const api = `https://apis.ccbp.in/movies-app/movies-search?search=${searchText}`;
      const options = {
        method: "GET",
        headers: {
          Authorization: `Bearer ${jwtToken}`,
        },
      };

      const response = await fetch(api, options);
      const fetchedData = await response.json();

      if (response.ok && fetchedData.results.length === 0) {
        updateSearchPageStatus(statusCode.empty);
      } else if (response.ok && fetchedData.results.length !== 0) {
        const formattedData = fetchedData.results.map((item) => ({
          id: item.id,
          backdropPath: item.backdrop_path,
          posterPath: item.poster_path,
          title: item.title,
        }));
        updateSearchPageData(formattedData);
        updateSearchPageStatus(statusCode.success);
      } else {
        updateSearchPageStatus(statusCode.failure);
      }
    } catch (error) {
      console.log(error);
    } finally {
      updateStatusOfSearchBtn();
    }
  };

  const contextValue = React.useContext(NetflixCloneContext);
  const { isSearchBtnClicked, enteredSearchData, updateStatusOfSearchBtn } =
    contextValue;

  useEffect(() => {
    const jwtToken = Cookies.get("jwt_token");

    if (jwtToken === undefined) {
      navigate("/login");
    } else {
      if (isSearchBtnClicked === true) {
        fetchSearchData(enteredSearchData, updateStatusOfSearchBtn);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSearchBtnClicked]);

  const tryAgainBtnTriggered = () => {
    fetchSearchData(enteredSearchData, updateStatusOfSearchBtn);
  };

  const renderSuccessView = () => (
    <>
      <ul className="search-page-list-container">
        {searchPageData.map((item) => (
          <Link
            to={`/movies/${item.id}`}
            className="popular-link-item"
            key={item.id}
          >
            <li key={item.id}>
              <img
                src={item.backdropPath}
                alt={item.title}
                className="popular-movies"
              />
            </li>
          </Link>
        ))}
      </ul>
      <Footer />
    </>
  );

  const renderEmptyPageView = () => (
    <div className="search-page-failure-and-loader-container">
      <img
        src="https://res.cloudinary.com/dm9htjdeq/image/upload/v1702713450/searchError_zzbwsf.svg"
        alt="no movies"
        className="search-page-failure-image"
      />
      <p className="search-page-failure-err-msg">
        Your search for {enteredSearchData} did not find any matches.
      </p>
    </div>
  );

  const renderLoaderView = () => (
    <div className="search-page-failure-and-loader-container" testid="loader">
      <Loader type="TailSpin" color="#D81F26" height={50} width={50} />
    </div>
  );
  console.log(searchPageFetchingStatus);

  const renderFailureView = () => (
    <div className="search-page-failure-and-loader-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/nxt-watch-no-saved-videos-img.png"
        alt="failure view"
        className="popular-failure-image"
      />
      <p className="popular-failure-para">
        Something went wrong. Please try again
      </p>
      <button
        className="popular-tryAgain-btn"
        type="button"
        onClick={tryAgainBtnTriggered}
      >
        Try Again
      </button>
    </div>
  );

  const renderResultView = () => {
    switch (searchPageFetchingStatus) {
      case "INITIAL":
        return null;
      case "INPROGRESS":
        return renderLoaderView();
      case "SUCCESS":
        return renderSuccessView();
      case "EMPTY":
        return renderEmptyPageView();
      case "FAILURE":
        return renderFailureView();
      default:
        return null;
    }
  };

  return (
    <div className="searchPage-parent-container">
      <Header isSearchPage="true" />
      {renderResultView()}
    </div>
  );
};

export default SearchPage;
