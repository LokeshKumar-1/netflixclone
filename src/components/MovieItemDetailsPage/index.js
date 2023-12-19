import { useState, useEffect } from "react";
import Cookies from "js-cookie";
import { useParams, Link, useNavigate } from "react-router-dom";
import { format } from "date-fns";
import { TailSpin as Loader } from "react-loader-spinner";
import "./index.css";
import Header from "../Header";
import Footer from "../Footer";

const statusCode = {
  initial: "INITIAL",
  inProgress: "INPROGRESS",
  success: "SUCCESS",
  failure: "FAILURE",
};

const MovieItemDetailsPage = (props) => {
  const [movieItemData, updateMovieData] = useState({});
  const [movieItemFetchingStatus, updateStatus] = useState(statusCode.initial);
  const { id } = useParams();
  const navigate = useNavigate();
  const formattedId = id.replace(":", "");

  const getJobItemDetailsData = async () => {
    updateStatus(statusCode.inProgress);
    const jwtToken = Cookies.get("jwt_token");

    const url = `https://apis.ccbp.in/movies-app/movies/${formattedId}`;
    const options = {
      method: "GET",
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    };

    const response = await fetch(url, options);
    const fetchedData = await response.json();

    if (response.ok) {
      const movieDetails = fetchedData.movie_details;
      const formattedData = {
        adult: movieDetails.adult,
        backdropPath: movieDetails.backdrop_path,
        budget: movieDetails.budget,
        genres: movieDetails.genres,
        id: movieDetails.id,
        overview: movieDetails.overview,
        posterPath: movieDetails.poster_path,
        releaseDate: movieDetails.release_date,
        runtime: movieDetails.runtime,
        similarMovies: movieDetails.similar_movies.map((item) => ({
          backdropPath: item.backdrop_path,
          id: item.id,
          posterPath: item.poster_path,
          title: item.title,
        })),
        spokenLanguages: movieDetails.spoken_languages.map((item) => ({
          englishName: item.english_name,
          id: item.id,
        })),
        title: movieDetails.title,
        voteAverage: movieDetails.vote_average,
        voteCount: movieDetails.vote_count,
      };
      updateMovieData(formattedData);
      updateStatus(statusCode.success);
    } else {
      updateStatus(statusCode.failure);
    }
  };

  useEffect(() => {
    const jwtToken = Cookies.get("jwt_token");

    if (jwtToken === undefined) {
      navigate("/login");
    } else {
      getJobItemDetailsData();
    }
    // eslint-disable-next-line
  }, [formattedId]);

  const tryAgainBtnTriggered = () => {
    getJobItemDetailsData();
  };

  const renderSuccessView = () => {
    const {
      adult,
      backdropPath,
      budget,
      genres,
      overview,
      releaseDate,
      runtime,
      similarMovies,
      spokenLanguages,
      title,
      voteAverage,
      voteCount,
    } = movieItemData;

    const bannerBgImage = {
      backgroundImage: `url(${backdropPath})`,
    };

    const hours = Math.floor(runtime / 60);
    const totalHourRemainder = runtime % 60;
    const minutes = totalHourRemainder;

    const typeOfContent = adult === true ? "A" : "U/A";
    const date = new Date(releaseDate);
    const releasedYear = date.getFullYear();
    const formattedDate = format(date, "do MMMM yyyy");

    return (
      <>
        <div style={bannerBgImage} className="MI-banner-parent-container">
          <Header />
          <div className="MI-banner-content-section">
            <h1 className="MI-banner-title">{title}</h1>
            <div className="MI-banner-time-contentType-container">
              <p className="MI-banner-movieTime">{`${hours}h ${minutes}m`}</p>
              <p className="MI-type-of-content">{typeOfContent}</p>
              <p className="MI-banner-released-year">{releasedYear}</p>
            </div>
            <p className="MI-banner-overview">{overview}</p>
            <button className="MI-banner-btn" type="button">
              Play
            </button>
          </div>
        </div>
        <div className="selected-movie-details">
          <div>
            <h3 className="details-title">Genres</h3>
            <ul className="genre-container">
              {genres.map((item) => (
                <li className="detail-item" key={item.id}>
                  {item.name}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="details-title">Audio Available</h3>
            <ul className="genre-container">
              {spokenLanguages.map((item) => (
                <li className="detail-item" key={item.id}>
                  {item.englishName}
                </li>
              ))}
            </ul>
          </div>
          <div className="count-and-average-container">
            <div>
              <h3 className="details-title">Rating Count</h3>
              <p className="detail-item">{voteCount}</p>
            </div>
            <div className="inner-container">
              <h3 className="details-title">Rating Average</h3>
              <p className="detail-item">{voteAverage}</p>
            </div>
          </div>
          <div>
            <div>
              <h3 className="details-title">Budget</h3>
              <p className="detail-item">{budget}</p>
            </div>
            <div className="inner-container">
              <h3 className="details-title">Release Date</h3>
              <p className="detail-item">{formattedDate}</p>
            </div>
          </div>
        </div>
        <div className="similar-movies-banner">
          <h1 className="similar-title">More like this</h1>
          <ul className="similar-list-container">
            {similarMovies.map((item) => (
              <li key={item.id}>
                <Link to={`/movies/${item.id}`}>
                  <img
                    src={item.backdropPath}
                    alt={item.title}
                    className="similar-list-image-item"
                  />
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <Footer />
      </>
    );
  };

  const renderLoaderView = () => (
    <div className="movieDetails-loader-container" testid="loader">
      <Loader type="TailSpin" color="#D81F26" height={50} width={50} />
    </div>
  );

  const renderFailureView = () => (
    <div className="popular-failure-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/nxt-watch-no-saved-videos-img.png"
        alt="failure"
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

  const renderFinalView = () => {
    switch (movieItemFetchingStatus) {
      case "INPROGRESS":
        return renderLoaderView();
      case "SUCCESS":
        return renderSuccessView();
      case "FAILURE":
        return renderFailureView();
      default:
        return null;
    }
  };

  return (
    <div className="movieItem-parent-container">
      {movieItemFetchingStatus === "INPROGRESS" ||
      movieItemFetchingStatus === "Failure" ? (
        <Header />
      ) : null}
      {renderFinalView()}
    </div>
  );
};

export default MovieItemDetailsPage;
