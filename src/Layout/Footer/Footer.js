import React from "react";
import { GetTranslationData } from "../../Components/GetTranslationData/GetTranslationData ";
const Footer = () => {
  return (
    <div className="footer">
      <div className="copyright">
      <p>{GetTranslationData("UIAdmin", "footer_text")}</p>
      </div>
    </div>
  );
};
export default Footer;
