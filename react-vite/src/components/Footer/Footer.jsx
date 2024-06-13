import "./Footer.css";
import { RxGithubLogo } from "react-icons/rx";
import { FaReact, FaLinkedin, FaAws } from "react-icons/fa";
import { PiFileHtmlDuotone, PiFileCssFill } from "react-icons/pi";
import { IoLogoJavascript } from "react-icons/io";
import { SiPython } from "react-icons/si";

function Footer() {
  return (
    <div className="footer-wrapper">
      <div className="footer-content">
        <div className="footer-top">
          {/* <h1 className="footer-branding">ShopoThalamus</h1> */}
          <div className="logo-texta">
              <img className="logo-imgy" src="/logo.png" alt="Nur's icon" />
              hopoThalamus
          </div>
            <img
              className="logo-img"
              src="https://rainforest-dev.s3.us-west-1.amazonaws.com/amazonArrow.png"
              alt="logo"
            />
          {/* <img
            className="logo"
            src="/logo.png"
            alt="Nur's icon"
          /> */}
          <p className="tagline">Bringing creativity and community together.</p>
        </div>

        <div className="team-section">
          <div className="team-member">
            <h4>Created by Nur Unlu</h4>
            <div className="social-links">
              <a href="https://github.com/NurCodeWiz">
                <RxGithubLogo />
              </a>
              <a href="https://www.linkedin.com/in/nur-unlu/">
                <FaLinkedin />
              </a>
            </div>
          </div>
          <div className="icon-container">
            <img
              className="nur"
              src="https://nurawsbucket.s3.amazonaws.com/IMG_7110.jpg"
              alt="Nur's icon"
            />
          </div>
        </div>

        <div className="footer-bottom">
          <div className="technologies-used">
             <img
            className="logo"
            src="/logo.png"
            alt="Nur's icon"
          />
            <h3>Powered by:</h3>
            <div className="tech-icons">
              <i className="fab fa-react"><FaReact /></i>
              <i className="fab fa-html5"><PiFileHtmlDuotone /></i>
              <i className="fab fa-css3-alt"><PiFileCssFill /></i>
              <i className="fab fa-js-square"><IoLogoJavascript /></i>
              <i className="fab fa-python"><SiPython /></i>
              <i className="fab fa-aws"><FaAws /></i>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Footer;
