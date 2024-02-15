import React from "react";
import { GetTranslationData } from "../../Components/GetTranslationData/GetTranslationData ";
const Footer = () => {
  return (
    <div className="footer">
      <div className="copyright">
      {/* <p>{GetTranslationData("UIAdmin", "footer_text")}</p>  */}
      <p>Copyright © LC Reward Dev & Developed by <a href="#" className="footer-link">Way2web World</a> 2023</p>
      </div>
    </div>
  );  
};
export default Footer;
