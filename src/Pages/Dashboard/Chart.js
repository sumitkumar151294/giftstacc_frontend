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
        innerRadius: 35, // Set the inner radius
        radius: 10,
      },
    },
    dataLabels: {
      enabled: false,
    },
    legend: {
      show: false, // Hide legend
    },
    colors: ["rgb(0, 114, 253)", "rgb(247, 245, 255)"], // Set colors
  };
  // To Get the label from api
  const categories = GetTranslationData("UIAdmin", "categories");
  const products = GetTranslationData("UIAdmin", "products");
  const customers = GetTranslationData("UIAdmin", "customers");
  const orders = GetTranslationData("UIAdmin", "orders");

  return (
    <>
      <div className="col-xl-6">
        <div className="row">
          <div className="col-xl-6 col-sm-6">
            <div className="card">
              <div className="card-body d-flex align-items-center justify-content-between">
                <div className="menu">
                  <span className="font-w500 fs-16 d-block mb-2">
                    {categories}
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
              <div className="card-body d-flex align-items-center justify-content-between">
                <div className="menu">
                  <span className="font-w500 fs-16 d-block mb-2">
                    {products}
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
              <div className="card-body d-flex align-items-center justify-content-between">
                <div className="menu">
                  <span className="font-w500 fs-16 d-block mb-2">
                    {customers}
                  </span>
                  <h2>247</h2>
                </div>
                <div className="d-inline-block position-relative donut-chart-sale">
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
              <div className="card-body d-flex align-items-center justify-content-between">
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
