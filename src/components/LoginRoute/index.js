import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import Cookies from "js-cookie";
import "./index.css";

const LoginRoute = (props) => {
  const navigate = useNavigate();
  const [username, updateUsername] = useState("");
  const [password, updatePassword] = useState("");
  const [showErrorMsg, updateErrorMsgStatus] = useState(false);
  const [errorMsg, updateErrorMsg] = useState("");

  console.log(username, password);

  useEffect(() => {
    const jwtToken = Cookies.get("jwt_token");

    if (jwtToken !== undefined) {
      navigate("/");
    }
  }, [navigate]);

  const handleNameInput = (event) => {
    updateUsername(event.target.value);
  };

  const handlePasswordInput = (event) => {
    updatePassword(event.target.value);
  };

  const onSubmitSuccessProcess = (jwtToken) => {
    Cookies.set("jwt_token", jwtToken, { expires: 30 });
    navigate("/");
    localStorage.setItem(
      "userCredentials",
      JSON.stringify({ username, password })
    );
  };

  const onSubmitFailureProcess = (receivedErrMsg) => {
    updateErrorMsgStatus(true);
    updateErrorMsg(receivedErrMsg);
  };

  const loginBtnTriggered = async (event) => {
    event.preventDefault();
    const userDetails = {
      username,
      password,
    };

    const options = {
      method: "POST",
      body: JSON.stringify(userDetails),
    };

    const response = await fetch("https://apis.ccbp.in/login", options);
    const data = await response.json();

    if (response.ok) {
      onSubmitSuccessProcess(data.jwt_token);
    } else {
      onSubmitFailureProcess(data.error_msg);
    }
  };

  return (
    <div className="Login-parent-container">
      <img
        src="https://res.cloudinary.com/dm9htjdeq/image/upload/v1694491526/Group_7399_loginLogo_wmwfjg.png"
        alt="login website logo"
        className="login-movie-logo"
      />
      <form className="login-form-container" onSubmit={loginBtnTriggered}>
        <h1 className="form-title">Login</h1>
        <div className="form-input-container">
          <label className="form-label-el" htmlFor="username">
            USERNAME
          </label>
          <input
            type="text"
            placeholder="Username"
            className="form-input-el"
            id="username"
            onChange={handleNameInput}
          />
        </div>
        <div className="form-input-container">
          <label className="form-label-el" htmlFor="password">
            PASSWORD
          </label>
          <input
            type="password"
            placeholder="Password"
            className="form-input-el"
            id="password"
            onChange={handlePasswordInput}
          />
        </div>
        {showErrorMsg && <p className="errorMsg-el">{errorMsg}</p>}
        <button className="login-btn" type="submit">
          Login
        </button>
      </form>
      <div className="mobile-view-container">
        <h1 className="mobile-form-title">Login</h1>
        <div className="mobile-input-container">
          <label className="form-mobile-label-el" htmlFor="mobileUsername">
            USERNAME
          </label>
          <input
            type="text"
            placeholder="Username"
            className="form-mobile-input-el"
            id="mobileUsername"
            onChange={handleNameInput}
          />
        </div>
        <div className="mobile-input-container">
          <label className="form-mobile-label-el" htmlFor="mobilePassword">
            Password
          </label>
          <input
            type="password"
            placeholder="Password"
            className="form-mobile-input-el"
            id="mobilePassword"
            onChange={handlePasswordInput}
          />
        </div>
        {showErrorMsg && <p className="mobile-errorMsg-el">{errorMsg}</p>}
        <div className="mobile-btn-el">
          <button
            className="signIn-btn"
            type="button"
            onClick={loginBtnTriggered}
          >
            Sign in
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoginRoute;
