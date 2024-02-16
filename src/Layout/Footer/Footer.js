import React from "react";
import { GetTranslationData } from "../../Components/GetTranslationData/GetTranslationData ";
const Footer = () => {
  const currentDate = new Date();
  const currentYear = currentDate.getFullYear();
  return (
    <div className="footer">
      <div className="copyright">
      <p>{GetTranslationData("UIAdmin", "footer_text")}
      <a href="#" className="footer-link">Way2web World</a> {new Date().getFullYear()}</p>
      </div>
    </div>
  );
};
export default Footer;
