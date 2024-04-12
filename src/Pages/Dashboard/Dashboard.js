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
      {console.log(getRoleAccess?.filteredData[0] === undefined && getRoleAccess.apiCalled, getRoleAccess?.filteredData[0], getRoleAccess)}
      {getRoleAccess?.filteredData[0] !== undefined && getRoleAccess.apiCalled ? (
        <div className="row">
          <ScrollToTop />
          <Chart />
          <Revenue />
          <Users />
        </div>
      ) : getRoleAccess?.filteredData[0] === undefined && getRoleAccess.apiCalled ?
        <PageError
          pageError={{
            StatusCode: "401",
            ErrorName: "Permission Denied",
            ErrorDesription:
              "Your application url is not registerd to our application",
            url: "/",
            buttonText: "Back to Home",
          }}
        />: <></>
        }
    </div>
  );
};

export default Dashboard;
