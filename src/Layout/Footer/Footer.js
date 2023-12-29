import React from "react";
import { GetTranslationData } from "../../Componenets/GetTranslationData/GetTranslationData ";
import "./Footer.scss";
const Footer = () => {
  return (
    <div className="footer">
      <div className="copyright">
        <p>{GetTranslationData("UIAdmin", "footer_copyright")}</p>
      </div>
    </div>
  );
};
export default Footer;
