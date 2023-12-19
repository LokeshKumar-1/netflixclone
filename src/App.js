import { Route, Routes } from "react-router-dom";
import { Component } from "react";
import "./App.css";
import LoginRoute from "./components/LoginRoute";
import Home from "./components/Home";
import NetflixCloneContext from "./context/NetflixCloneContext";
import Popular from "./components/Popular";
import MovieItemDetailsPage from "./components/MovieItemDetailsPage";
import SearchPage from "./components/SearchPage";
import AccountRoute from "./components/AccountRoute";
import NotFoundPage from "./components/NotFoundPage";

class App extends Component {
  state = {
    currentPage: "HOME",
    menuStatus: false,
    dataToSearch: "",
    searchBtnStatus: false,
  };

  changePage = (page) => {
    this.setState({ currentPage: page });
  };

  changeMenuBtnStatus = () => {
    this.setState((prevState) => ({
      menuStatus: !prevState.menuStatus,
    }));
  };

  updateDataToSearch = (data) => {
    this.setState({ dataToSearch: data });
  };

  updateSearchBtnStatus = () => {
    this.setState((prevState) => ({
      searchBtnStatus: !prevState.searchBtnStatus,
    }));
  };

  render() {
    const { currentPage, menuStatus, dataToSearch, searchBtnStatus } =
      this.state;

    return (
      <NetflixCloneContext.Provider
        value={{
          currentPage,
          statusOfMenuBtn: menuStatus,
          updateCurrentPage: this.changePage,
          updateMenuBtnStatus: this.changeMenuBtnStatus,
          enteredSearchData: dataToSearch,
          updateSearchData: this.updateDataToSearch,
          isSearchBtnClicked: searchBtnStatus,
          updateStatusOfSearchBtn: this.updateSearchBtnStatus,
        }}
      >
        <Routes>
          <Route exact path="/login" element={<LoginRoute />} />
          <Route exact path="/" element={<Home />} />
          <Route exact path="/popular" element={<Popular />} />
          <Route exact path="/movies/:id" element={<MovieItemDetailsPage />} />
          <Route exact path="/search" element={<SearchPage />} />
          <Route exact path="/account" element={<AccountRoute />} />
          <Route element={<NotFoundPage />} />
        </Routes>
      </NetflixCloneContext.Provider>
    );
  }
}
export default App;
