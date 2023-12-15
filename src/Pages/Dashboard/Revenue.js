import React, { useState } from 'react'
import ReactApexChart from 'react-apexcharts';

const Revenue = () => {
    const [isLoading, setIsLoading] = useState('false')

  var revenueChart = {
    options: {
      series: [
        {
          name: 'Net Profit',
          data: [20, 30, 20, 30, 20, 30, 20, 30],
          // radius: 12,
        },
      ],
      chart: {
        type: 'area',
        height: 230,
        toolbar: {
          show: false,
        },
      },
      plotOptions: {
        bar: {
          horizontal: false,
          columnWidth: '55%',
          endingShape: 'rounded',
        },
      },
      colors: ['var(--primary)'],
      dataLabels: {
        enabled: false,
      },
      markers: {
        shape: 'circle',
      },
      legend: {
        show: false,
      },
      stroke: {
        show: true,
        width: 4,
        curve: 'smooth',
        colors: ['var(--primary)'],
      },
      grid: {
        borderColor: '#eee',
        xaxis: {
          lines: {
            show: true,
          },
        },
        yaxis: {
          lines: {
            show: false,
          },
        },
      },
      xaxis: {
        categories: ['08:00', '09:00', '10:00', '11:00', '12:00', '13:00', '14:00'],
        labels: {
          style: {
            colors: '#7E7F80',
            fontSize: '13px',
            fontFamily: 'Poppins',
            fontWeight: 100,
            cssClass: 'apexcharts-xaxis-label',
          },
        },
        crosshairs: {
          show: false,
        },
      },
      yaxis: {
        show: true,
        labels: {
          offsetX: -15,
          style: {
            colors: '#7E7F80',
            fontSize: '14px',
            fontFamily: 'Poppins',
            fontWeight: 100,
          },
          formatter: function (y) {
            return y.toFixed(0) + '';
          },
        },
      },
      fill: {
        type: 'solid',
        opacity: 1,
        colors: 'var(--primary)',
      },
      tooltip: {
        y: {
          formatter: function (val) {
            return '$ ' + val + ' thousands';
          },
        },
      },
    },
  };

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
        sparkline: {
          // enabled: true
        },
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
          '06', '07', '08', '09', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20',
          '21', '22', '23', '24', '25', '26'
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
              categories: ["06", "07", "08", "09", "10", "11", "12", "13", "14"],
            },
          },
        },
      ],
    },
    series: [
      {
        name: "Revenue (Bar)",
        data: [300, 450, 200, 600, 400, 350, 410, 470, 480, 700, 500, 400, 400, 600, 250, 250, 500, 450, 300, 400, 200],
      },
    ],
  };

  const donutChartData = [5, 3];
  const productDonutChartData =[5, 1];
  const customerDonutChartData =[5, 3];
  const orderDonutChartData =[5, 2];
  const donutChartOptions = {
    labels: ['Progress', 'Remaining'],
    plotOptions: {
      pie: {
        customScale: 1.0,
        innerRadius: 35, // Set the inner radius
        radius: 10
      },
    },
    dataLabels: {
      enabled: false,
    },
    legend: {
      show: false, // Hide legend
    },
    colors: ['rgb(0, 114, 253)', 'rgb(247, 245, 255)'], // Set colors
  };
  return (
    <>
 
 <div className="col-xl-6">
              <div className="card">
                <div className="card-header border-0 flex-wrap pb-0">
                  <div className="mb-sm-0 mb-2">
                    <h4 className="fs-20">Today’s Revenue</h4>
                    <span>Graph data is based on full system manners</span>
                  </div>
                  <div>
                    <h2 className="font-w700 mb-0">₹ 24,956</h2>
                    <p className="mb-0 font-w700">
                      <span className="text-success">0,5% </span>than last day
                    </p>
                  </div>
                </div>
                <div className="card-body py-0">
                  <ReactApexChart options={revenueChart.options} series={revenueChart.options.series} type="area" height={230} />
                </div>
              </div>
            </div>
    </>
  )
}

export default Revenue