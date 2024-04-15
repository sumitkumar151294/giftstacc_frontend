import React from "react";
import { Chart } from "./Chart";
import Revenue from "./Revenue";
import Users from "./Users";
import ScrollToTop from "../../Components/ScrollToTop/ScrollToTop";
import { useSelector } from "react-redux";
import PageError from "../../Components/PageError/PageError";

const Dashboard = () => {
  const getRoleAccess = useSelector(
    (state) => state.moduleReducer
  );
  return (
    <div className="container-fluid">    
      {getRoleAccess?.filteredData[0] !== undefined? (
        <div className="row">
          <ScrollToTop />
          <Chart />
          <Revenue />
          <Users />
        </div>
      ) :
        <PageError
          pageError={{
            StatusCode: "401",
            ErrorName: "Permission Denied",
            ErrorDesription:
              "Your application url is not registerd to our application",
            url: "/",
            buttonText: "Back to Home",
          }}
        />
        }
    </div>
  );
};

export default Dashboard;
