import React, { useEffect, useState } from 'react'
import category from '../../Assets/img/category.png'
import product from '../../Assets/img/product1.png'
import customer from '../../Assets/img/customer1.png'
import ReactApexChart from 'react-apexcharts';
import { GetTranslationData } from '../../Components/GetTranslationData/GetTranslationData ';
import { onGetCategory } from '../../Store/Slices/createCategorySlice';
import { useDispatch, useSelector } from 'react-redux';
import { onClientMasterSubmit } from '../../Store/Slices/clientMasterSlice';
import { onGetSupplierList } from '../../Store/Slices/supplierMasterSlice';
import { onGetSupplierBrandList } from '../../Store/Slices/supplierBrandListSlice';
export const Chart = () => {
  const dispatch = useDispatch();
  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const donutChartData = [5, 3];
  const productDonutChartData =[5, 1];
  const customerDonutChartData =[5, 3];
  const orderDonutChartData =[5, 2];
  useEffect(() => {
    dispatch(onGetCategory());
    dispatch(onClientMasterSubmit());
    dispatch(
      onGetSupplierBrandList({ pageNumber: page, pageSize: rowsPerPage })
    );
  }, []);
  const getCreateCategory = useSelector((state) => state.createCategoryReducer?.categoryData);
  const clientList = useSelector((state) => state.clientMasterReducer?.clientData);
  const SupplierBrandList = useSelector(
    (state) => state.supplierBrandListReducer.data?.[0]?.totalCount
  );
    const donutChartOptions = {
      labels: ['Progress', 'Remaining'],
      plotOptions: {
        pie: {
          customScale: 1.0,
          innerRadius: '60%', // Set a smaller inner radius for the "Progress" slice
          radius: '60%', // Set the radius for better visualization
        },
      },
      dataLabels: {
        enabled: false,
      },
      legend: {
        show: false,
      },
      colors: ['rgb(0, 114, 253)', 'rgb(247, 245, 255)'],
    };
  
    
  // To Get the label from api
  const categories = GetTranslationData("UIAdmin", "categories");
  const brands_label = GetTranslationData("UIAdmin", "brands_label");
  const clients_name_label = GetTranslationData("UIAdmin", "clients_name_label");
  const orders = GetTranslationData("UIAdmin", "orders");

  return (
    <>
     <div className="col-xl-6">
              <div className="row">
                <div className="col-xl-6 col-sm-6">
                  <div className="card">
                    <div className="card-body d-flex align-items-center justify-content-between cardnav">
                      <div className="menu">
                        <span className="font-w500 fs-16 d-block mb-2">{categories}</span>
                        <h2>{getCreateCategory.length}</h2>
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
                        <span className="font-w500 fs-16 d-block mb-2">{brands_label}</span>
                        <h2>{SupplierBrandList}</h2>
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
                        {clients_name_label}
                        </span>
                        <h2>{clientList?.length}</h2>
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
                        <span className="font-w500 fs-16 d-block mb-2">
                          {orders}
                        </span>
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
