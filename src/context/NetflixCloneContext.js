import React from "react";

const NetflixCloneContext = React.createContext({
  currentPage: "HOME",
  statusOfMenuBtn: false,
  enteredSearchData: "",
  isSearchBtnClicked: false,
  updateCurrentPage: () => {},
  updateMenuBtnStatus: () => {},
  updateSearchData: () => {},
  updateStatusOfSearchBtn: () => {},
});

export default NetflixCloneContext;
