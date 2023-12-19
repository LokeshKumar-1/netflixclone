import { useState, useEffect } from "react";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import { TailSpin as Loader } from "react-loader-spinner";
import { TiWarning } from "react-icons/ti";
import "./index.css";
import SlideBar from "../SlideBar";
import HomeBanner from "../HomeBanner";
import Footer from "../Footer";
import Header from "../Header";

const statusCode = {
  initial: "INITIAL",
  inProgress: "INPROGRESS",
  success: "SUCCESS",
  failure: "FAILURE",
};

const Home = () => {
  const [trendingData, updateTrendingData] = useState([]);
  const [originalsData, updateOriginalsData] = useState([]);
  const [trendingStatus, updateTrendingStatus] = useState(statusCode.initial);
  const [originalsStatus, updateOriginalStatus] = useState(statusCode.initial);
  const [homeBanner, updateBanner] = useState({});
  const navigate = useNavigate();

  const apiCaseConverter = (data) => {
    const result = data.results.map((item) => ({
      backdropPath: item.backdrop_path,
      id: item.id,
      overview: item.overview,
      posterPath: item.poster_path,
      title: item.title,
    }));
    return result;
  };

  const fetchTrendingData = async () => {
    updateTrendingStatus(statusCode.inProgress);

    const jwtToken = Cookies.get("jwt_token");

    const trendingUrl = "https://apis.ccbp.in/movies-app/trending-movies";

    const options = {
      method: "GET",
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    };
    const trendingResponse = await fetch(trendingUrl, options);
    const fetchedTrendingData = await trendingResponse.json();

    if (trendingResponse.ok) {
      const caseConvertedTrendingData = apiCaseConverter(fetchedTrendingData);
      updateTrendingData(caseConvertedTrendingData);
      updateTrendingStatus(statusCode.success);
    } else {
      updateTrendingStatus(statusCode.failure);
    }
  };

  const fetchOriginalsData = async () => {
    updateOriginalStatus(statusCode.inProgress);

    const jwtToken = Cookies.get("jwt_token");

    const originalsUrl = "https://apis.ccbp.in/movies-app/originals";
    const options = {
      method: "GET",
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    };

    const originalsResponse = await fetch(originalsUrl, options);
    const fetchedOriginalsData = await originalsResponse.json();

    if (originalsResponse.ok) {
      const caseConvertedOriginalsData = apiCaseConverter(fetchedOriginalsData);
      updateOriginalsData(caseConvertedOriginalsData);
      const ranNum = Math.floor(
        Math.random() * caseConvertedOriginalsData.length
      );
      const newBanner = caseConvertedOriginalsData[ranNum];
      updateBanner(newBanner);
      updateOriginalStatus(statusCode.success);
    } else {
      updateOriginalStatus(statusCode.failure);
    }
  };

  useEffect(() => {
    const jwtToken = Cookies.get("jwt_token");

    if (jwtToken === undefined) {
      navigate("/login");
    } else {
      try {
        fetchTrendingData();
        fetchOriginalsData();
      } catch (e) {
        console.log(e);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const trendingTryAgainBtnTriggered = () => {
    fetchTrendingData();
  };

  const originalsTryAgainBtnTriggered = () => {
    fetchTrendingData();
  };

  const trendingSlideBar = () => (
    <div className="slideBar-container">
      <SlideBar data={trendingData} />
    </div>
  );

  const originalsSlideBar = () => (
    <div className="slideBar-container">
      <SlideBar data={originalsData} />
    </div>
  );

  const trendingSlideBarFailureView = () => (
    <div className="loader-for-slideBar">
      <TiWarning className="warningIcon" />
      <p className="failure-para">Something went wrong. Please try again</p>
      <button
        className="tryAgain-btn"
        type="button"
        onClick={trendingTryAgainBtnTriggered}
      >
        Try Again
      </button>
    </div>
  );

  const originalsSlideBarFailureView = () => (
    <div className="loader-for-slideBar">
      <TiWarning className="warningIcon" />
      <p className="failure-para">Something went wrong. Please try again</p>
      <button
        className="tryAgain-btn"
        type="button"
        onClick={originalsTryAgainBtnTriggered}
      >
        Try Again
      </button>
    </div>
  );

  const bannerFailureView = () => (
    <div className="loader-for-Banner">
      <TiWarning className="warningIcon" />
      <p className="failure-para">Something went wrong. Please try again</p>
      <button
        className="tryAgain-btn"
        type="button"
        onClick={originalsTryAgainBtnTriggered}
      >
        Try Again
      </button>
    </div>
  );

  const loader = () => (
    <div className="loader-container" testid="loader">
      <Loader type="TailSpin" color="#D81F26" height={50} width={50} />
    </div>
  );

  const sendTrendingResult = () => {
    switch (trendingStatus) {
      case "INPROGRESS":
        return <div className="loader-for-slideBar">{loader()}</div>;
      case "SUCCESS":
        return trendingSlideBar();
      case "FAILURE":
        return trendingSlideBarFailureView();
      default:
        return null;
    }
  };

  const sendOriginalsResult = () => {
    switch (originalsStatus) {
      case "INPROGRESS":
        return <div className="loader-for-slideBar">{loader()}</div>;
      case "SUCCESS":
        return originalsSlideBar();
      case "FAILURE":
        return originalsSlideBarFailureView();
      default:
        return null;
    }
  };

  const sendBannerResult = () => {
    switch (originalsStatus) {
      case "INPROGRESS":
        return <div className="loader-for-Banner">{loader()}</div>;
      case "SUCCESS":
        return <HomeBanner banner={homeBanner} />;
      case "FAILURE":
        return bannerFailureView();
      default:
        return null;
    }
  };

  return (
    <div className="Home-parent-container">
      {originalsStatus === "INPROGRESS" || originalsStatus === "FAILURE" ? (
        <Header />
      ) : null}
      {sendBannerResult()}
      <h1 className="trending-title">Trending Now</h1>
      {sendTrendingResult()}
      <h1 className="originals-title">Originals</h1>
      {sendOriginalsResult()}
      <Footer />
    </div>
  );
};

export default Home;
