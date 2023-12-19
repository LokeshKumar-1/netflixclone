import { Link } from "react-router-dom";
import "./index.css";

const NotFoundImage = () => (
  <div className="NF-parent-container">
    <h1 className="NF-title">Lost Your Way ?</h1>
    <p className="NF-para">
      we are sorry, the page you requested could not be found Please go back to
      the homepage.
    </p>
    <Link to="/">
      <button type="button" className="NF-btn">
        Go to Home
      </button>
    </Link>
  </div>
);

export default NotFoundImage;
