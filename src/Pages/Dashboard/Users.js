import React, { useState } from "react";
import ReactApexChart from "react-apexcharts";
import { GetTranslationData } from "../../Components/GetTranslationData/GetTranslationData ";

const Users = () => {
  const chartTimeline = {
    options: {
      chart: {
        id: "combined-graph",
        height: 250,
        borderRadius: 0,
        stacked: false,
        toolbar: {
          show: false,
        },
        sparkline: {},
        offsetX: -10,
      },
      plotOptions: {
        bar: {
          columnWidth: "20%",
          borderRadius: "2",
          colors: {
            backgroundBarOpacity: 1,
          },
        },
        distributed: true,
      },
      colors: ["var(--primary)", "#FF4560"], // Define colors for the series
      grid: {
        show: true,
        strokeDashArray: 3,
        borderColor: "#9B9B9B",
      },
      legend: {
        show: false,
      },
      fill: {
        opacity: 1,
      },
      dataLabels: {
        enabled: false,
        colors: ["#000"],
        dropShadow: {
          enabled: true,
          top: 1,
          left: 1,
          blur: 1,
          opacity: 1,
        },
      },
      stroke: {
        show: true,
        curve: "smooth",
        lineCap: "rounded",
      },
      xaxis: {
        categories: [
          "06",
          "07",
          "08",
          "09",
          "10",
          "11",
          "12",
          "13",
          "14",
          "15",
          "16",
          "17",
          "18",
          "19",
          "20",
          "21",
          "22",
          "23",
          "24",
          "25",
          "26",
        ],
        labels: {
          style: {
            colors: "#3E4954",
            fontSize: "13px",
            fontFamily: "poppins",
            fontWeight: 100,
            cssClass: "apexcharts-xaxis-label",
          },
        },
        crosshairs: {
          show: false,
        },
        axisBorder: {
          show: false,
        },
        axisTicks: {
          show: false,
        },
      },
      yaxis: [
        {
          labels: {
            show: true,
          },
        },
        {
          opposite: true, // Display the second y-axis on the opposite side
          labels: {
            show: false, // Hide y-axis labels
          },
        },
      ],
      tooltip: {
        x: {
          show: true,
        },
      },
      responsive: [
        {
          breakpoint: 575,
          options: {
            chart: {
              height: 250,
            },
            xaxis: {
              categories: [
                "06",
                "07",
                "08",
                "09",
                "10",
                "11",
                "12",
                "13",
                "14",
              ],
            },
          },
        },
      ],
    },
    series: [
      {
        name: "Revenue (Bar)",
        data: [
          300, 450, 200, 600, 400, 350, 410, 470, 480, 700, 500, 400, 400, 600,
          250, 250, 500, 450, 300, 400, 200,
        ],
      },
    ],
  };
  const orders = GetTranslationData("UIAdmin", "orders");
  const months = GetTranslationData("UIAdmin", "months");
  const daily = GetTranslationData("UIAdmin", "daily");
  const today = GetTranslationData("UIAdmin", "today");
  const [activeTab, setActiveTab] = useState('months');

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  return (
    <>
      <div className="col-xl-12 col-xxl-12">
        <div className="row">
          <div className="col-xl-12">
            <div className="card">
              <div className="card-header border-0  flex-wrap">
                <div>
                  <h4 className="fs-20 mb-1">{orders}</h4>
                  <span>
                    {GetTranslationData("UIAdmin", "graph_Data_Label")}
                  </span>
                </div>
                <div className="d-flex">
                  <div className="card-action coin-tabs  mt-sm-0">
                    <ul className="nav nav-tabs" role="tablist">
                      <li className="nav-item">
                        <button
                          className={`nav-link ${activeTab === 'months' ? 'active' : ''}`}
                          onClick={() => handleTabClick('months')}
                        >
                          {months}
                        </button>
                      </li>
                      <li className="nav-item">
                        <button
                          className={`nav-link ${activeTab === 'daily' ? 'active' : ''}`}
                          onClick={() => handleTabClick('daily')}
                        >
                          {daily}
                        </button>
                      </li>
                      <li className="nav-item">
                        <button
                          className={`nav-link ${activeTab === 'today' ? 'active' : ''}`}
                          onClick={() => handleTabClick('today')}
                        >
                          {today}
                        </button>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
              <div className="card-body pb-2">
                <div className="tab-pane fade show active mt-3" id="Monthly">
                   <ReactApexChart
                    options={chartTimeline.options}
                    series={chartTimeline.series}
                    type="bar"
                    height={250}
                    className="chart-timeline"
                  /> 
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Users;
