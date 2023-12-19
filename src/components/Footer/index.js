import {FaGoogle, FaTwitter, FaInstagram, FaYoutube} from 'react-icons/fa'
import './index.css'

const Footer = () => (
  <div className="contact-container">
    <div className="social-logos-container">
      <FaGoogle className="logos" />
      <FaTwitter className="logos" />
      <FaInstagram className="logos" />
      <FaYoutube className="logos" />
    </div>
    <h3 className="contactUs-text">Contact Us</h3>
  </div>
)

export default Footer
