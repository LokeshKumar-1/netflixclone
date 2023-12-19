import Cookies from "js-cookie";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./index.css";
import Header from "../Header";
import Footer from "../Footer";

const AccountDetails = (props) => {
  const userCred = localStorage.getItem("userCredentials");
  const parsedUserCred = JSON.parse(userCred);
  const maskedPass = "*".repeat(parsedUserCred.password.length);
  console.log(parsedUserCred.username, parsedUserCred.password);
  const navigate = useNavigate();

  const logoutBtnTriggered = () => {
    Cookies.remove("jwt_token");
    localStorage.removeItem("userCredentials");
    navigate("/login");
  };

  useEffect(() => {
    const jwtToken = Cookies.get("jwt_token");

    if (jwtToken === undefined) {
      navigate("/login");
    }
  }, [navigate]);

  return (
    <div className="AD-parent-container">
      <Header />
      <div className="AD-content-bg-container">
        <div className="AD-content-container">
          <h1 className="AD-title">Account</h1>
          <hr className="hr-line" />
          <div className="AD-userDetails-container">
            <p className="AD-userName-title">Member ship</p>
            <div>
              <p className="username-cred">
                {parsedUserCred.username}@gmail.com
              </p>
              <p className="password-cred">
                Password <span>: {maskedPass}</span>
              </p>
            </div>
          </div>
          <hr className="hr-line" />
          <div className="AD-userDetails-container">
            <p className="AD-userName-title">Plan details </p>
            <p className="username-cred">Premium </p>
            <p className="ultra-HD-text">Ultra HD</p>
          </div>
          <hr className="hr-line" />
          <button
            type="button"
            className="logout-btn"
            onClick={logoutBtnTriggered}
          >
            Logout
          </button>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default AccountDetails;
