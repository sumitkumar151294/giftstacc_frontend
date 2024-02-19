import React from "react";
import category from "../../Assets/img/category.png";
import product from "../../Assets/img/product1.png";
import customer from "../../Assets/img/customer1.png";
import ReactApexChart from "react-apexcharts";
import { GetTranslationData } from "../../Components/GetTranslationData/GetTranslationData ";
export const Chart = () => {
  const donutChartData = [5, 3];
  const productDonutChartData = [5, 1];
  const customerDonutChartData = [5, 3];
  const orderDonutChartData = [5, 2];
  const donutChartOptions = {
    labels: ["Progress", "Remaining"],
    plotOptions: {
      pie: {
        customScale: 1.0,
        innerRadius: "60%", // Set a smaller inner radius for the "Progress" slice
        radius: "60%", // Set the radius for better visualization
      },
    },
    dataLabels: {
      enabled: false,
    },
    legend: {
      show: false,
    },
    colors: ["rgb(0, 114, 253)", "rgb(247, 245, 255)"],
  };

  // To Get the label from api
  const categories = GetTranslationData("UIAdmin", "categories");
  const brands_label = GetTranslationData("UIAdmin", "brands_label");
  const clients_name_label = GetTranslationData(
    "UIAdmin",
    "clients_name_label"
  );
  const orders = GetTranslationData("UIAdmin", "orders");
  const url = window.location.hash;

  return (
    <>
      <div className="col-xl-6">
        <div className="row">
          <div className="col-xl-6 col-sm-6">
            <div className="card">
              <div className="card-body d-flex align-items-center justify-content-between cardnav">
                <div className="menu">
                  <span className="font-w500 fs-16 d-block mb-2">
                    {url === "#/lc-user-Admin/dashboard"
                      ? "Abandoned Cart"
                      : categories}
                  </span>
                  <h2>45</h2>
                </div>
                <div className="d-inline-block position-relative donut-chart-sale">
                  <ReactApexChart
                    options={donutChartOptions}
                    series={donutChartData}
                    type="donut"
                  />
                  <small className="text-black">
                    <img
                      className="w-35px"
                      src={category}
                      alt="file not exist"
                    />
                  </small>
                </div>
              </div>
            </div>
          </div>
          <div className="col-xl-6 col-sm-6">
            <div className="card">
              <div className="card-body d-flex align-items-center justify-content-between cardnav ">
                <div className="menu">
                  <span className="font-w500 fs-16 d-block mb-2">
                    {brands_label}
                  </span>
                  <h2>85</h2>
                </div>
                <div className="d-inline-block position-relative donut-chart-sale">
                  <ReactApexChart
                    options={donutChartOptions}
                    series={productDonutChartData}
                    type="donut"
                  />
                  <small className="text-black">
                    <img
                      className="w-35px"
                      src={product}
                      alt="file not exist"
                    />
                  </small>
                </div>
              </div>
            </div>
          </div>

          <div className="col-xl-6 col-sm-6">
            <div className="card">
              <div className="card-body d-flex align-items-center justify-content-between cardnav">
                <div className="menu">
                  <span className="font-w500 fs-16 d-block mb-2">
                    {url === "#/lc-user-Admin/dashboard"
                      ? "Customers"
                      : clients_name_label}
                  </span>
                  <h2>247</h2>
                </div>
                <div className="d-inline-block position-relative donut-chart-sale ">
                  <ReactApexChart
                    options={donutChartOptions}
                    series={customerDonutChartData}
                    type="donut"
                  />
                  <small className="text-black">
                    <img
                      className="w-35px"
                      src={customer}
                      alt="file not exist"
                    />
                  </small>
                </div>
              </div>
            </div>
          </div>
          <div className="col-xl-6 col-sm-6">
            <div className="card">
              <div className="card-body d-flex align-items-center justify-content-between cardnav">
                <div className="menu">
                  <span className="font-w500 fs-16 d-block mb-2">{orders}</span>
                  <h2>872</h2>
                </div>
                <div className="d-inline-block position-relative donut-chart-sale">
                  <ReactApexChart
                    options={donutChartOptions}
                    series={orderDonutChartData}
                    type="donut"
                  />
                  <small className="text-black">
                    <img
                      className="w-35px"
                      src={category}
                      alt="file not exist"
                    />
                  </small>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
