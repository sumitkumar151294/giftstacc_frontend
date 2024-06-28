import React from "react";
import { GetTranslationData } from "../../Components/GetTranslationData/GetTranslationData ";
import { Link } from "react-router-dom";
const Footer = () => {
  return (
    <div className="footer">
      <div className="copyright">
      <p>{GetTranslationData("UIAdmin", "footer_text")}
      <Link to="https://www.way2webworld.com/" target="_blank" className="footer-link"> Way2web World</Link> {new Date().getFullYear()}</p>
      </div>
    </div>
  );
};
export default Footer;
