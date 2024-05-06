/* eslint-disable react-hooks/exhaustive-deps */

import React, { useState, useEffect } from "react";
import Dropdown from "../../../Components/Dropdown/Dropdown";
import NoRecord from "../../../Components/NoRecord/NoRecord";
import ReactPaginate from "react-paginate";
import { useDispatch, useSelector } from "react-redux";
import { onGetCommissionReport } from "../../../Store/Slices/ClientAdmin/clientCommissionReportSlice";
import { CSVLink } from "react-csv";
import { GetTranslationData } from "../../../Components/GetTranslationData/GetTranslationData ";
import Button from "../../../Components/Button/Button";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import PageError from "../../../Components/PageError/PageError";

const ClientCommissionReport = () => {
  const [page, setPage] = useState(1);
  const [rowsPerPage] = useState(5);
  const [dateStart, setDateStart] = useState();
  const [dateEnd, setDateEnd] = useState();
  const [supplierBrandListData, setSupplierBrandListData] = useState([]);
  const supplierBrandData = useSelector(
    (state) => state.supplierBrandListReducer.data[0].products
    
  );  
  const supplierMasterData = useSelector(
    (state) => state?.supplierMasterReducer?.data
  );


  const [createCategory, setCreateCategory] = useState({
    supplierId: "",
    supplierBrandId: "",
    name: "",
  });


  const headers = [
    { label: "Supplier", key: "supplier" },
    { label: "Brand", key: "brand" },
    { label: "No. Of Vouchers", key: "noOfVouchers" },
    { label: "Total Face Value", key: "totalFaceValue" },
    { label: "Total Paid Amount", key: "totalPaidAmount" },
    { label: "Commission%", key: "commission" },
    { label: "Commission Amount", key: "commissionAmount" },
  ];
  const client_Commission_Report = GetTranslationData(
    "UIClient",
    "clientCommissionReport"
  );
  const export_label = GetTranslationData("UIAdmin", "export_label");
  const totalFaceValue = GetTranslationData("UIClient", "totalFaceValue");
  const totalPaidAmount = GetTranslationData("UIClient", "totalPaidAmount");
  const commission = GetTranslationData("UIClient", "commission");
  const ordersupplier = GetTranslationData("UIAdmin", "ordersupplier");
  const orderbrand = GetTranslationData("UIAdmin", "orderbrand");
  const ordervouchers = GetTranslationData("UIAdmin", "ordervouchers");
  const commissionAmount = GetTranslationData("UIClient", "commissionAmount");
  const disabled_Text = GetTranslationData("UIAdmin", "disabled_Text");
  const dispatch = useDispatch();
  const clientCommissionReport = useSelector(
    (state) => state.commissionReportReducer?.reportData
  );

  const startIndex = (page - 1) * rowsPerPage;
  const endIndex = startIndex + rowsPerPage;
  const handlePageChange = (selected) => {
    setPage(selected.selected + 1);
  };
  const handleChange = (e, fieldName) => { 
    if (fieldName === "supplierId") {
      let supplierList = [];
      Array.isArray(supplierBrandData) &&
        supplierBrandData
          ?.filter((item) => {
            return (
              item.supplierCode ===
              e.target.selectedOptions.item("").getAttribute("name") &&
              item.enabled !== false
            );
          })
          .map((item) => {
            return supplierList.push({ label: item.name, value: item.id });
          });
      setSupplierBrandListData(supplierList);
      setCreateCategory({
        ...createCategory,
        supplierBrandId: "",
        [fieldName]: e.target.value,
      });
    } else {
      setCreateCategory({
        ...createCategory,
        [fieldName]: e.target.value,
      });
    }
  };
  useEffect(() => {
    dispatch(onGetCommissionReport());
  }, []);
  const namesArray = clientCommissionReport.map((data) => ({
    supplier: data.supplier,
    brand: data.brand,
    noOfVouchers: data.noOfVouchers,
    totalFaceValue: data.totalFaceValue,
    totalPaidAmount: data.totalPaidAmount,
    commission: data.commission,
    commissionAmount: data.commissionAmount,
  }));

  // for date picker
  const onChangeHandler = (value) => {
    setDateStart(value[0]);
    setDateEnd(value[1]);
  };
  const getRoleAccess = useSelector(
    (state) => state.moduleReducer.filteredData
  )

  return (
    <div>
      {getRoleAccess[0] !== undefined ? (
        <>
          <div className="container-fluid">
            <div className="row">
              <div className="col-xl-12 col-xxl-12">
                <div className="card">
                  <div className="container-fluid pt-0">
                    <div className="d-flex justify-content-between align-items-center  flex-wrap">
                      <div className="card-header">
                        <h4 className="card-title">{client_Commission_Report}</h4>
                      </div>
                      <div className="ddop">
                        <Dropdown
                          onChange={(e) => handleChange(e, "supplierId")}
                          ariaLabel="Select"
                          value={createCategory.supplierId}
                          className="form-select"
                          options={
                            Array.isArray(supplierMasterData)
                              ? supplierMasterData
                                .filter(supplier => supplier.enabled)  // Filter to keep only enabled suppliers
                                .map(supplier => ({
                                  label: supplier.name,
                                  value: supplier.id,
                                  data: supplier.code,
                                }))
                              : []
                          }

                        />
                      </div>
                      <div className="ddop">
                        <Dropdown
                          onChange={(e) => handleChange(e, "supplierBrandId")}
                          value={createCategory.supplierBrandId}
                          ariaLabel="Select"
                          className="form-select"
                          options={supplierBrandListData}
                        />
                      </div>
                      <div className="example">
                        <DatePicker
                          id="dateStartEnd"
                          placeholderText="01/01/2015 1:30 PM - 01/01/2015 2:00 PM"
                          selectsRange={true}
                          startDate={dateStart}
                          endDate={dateEnd}
                          onChange={onChangeHandler}
                          dateFormat="dd MMM yyyy h:mm aa" // Date format including time
                          // showTimeSelect // Enable time selection
                          timeFormat="HH:mm" // Time format
                          className={"form-control form-control-sm"}
                          showDisabledMonthNavigation
                        />
                      </div>
                      <div className="d-flex align-items-center flex-wrap">
                        {clientCommissionReport &&
                          clientCommissionReport.length > 0 && (
                            <CSVLink
                              data={namesArray}
                              headers={headers}
                              filename={"ClientCommissionReport.csv"}
                            >
                              {clientCommissionReport.length > 0 && (
                                <Button
                                  className="btn btn-primary btn-sm btn-rounded me-3 mb-2"
                                  text={export_label}
                                  icons={"fa fa-file-excel"}
                                />
                              )}
                            </CSVLink>
                          )}
                      </div>
                    </div>
                  </div>
                  <div className="card-body">
                    {clientCommissionReport?.length > 0 ? (
                      <div className="table-responsive">
                        <table className="table header-border table-responsive-sm">
                          <thead>
                            <tr>
                              <th>{ordersupplier}</th>
                              <th>{orderbrand}</th>
                              <th>{ordervouchers}</th>
                              <th>{totalFaceValue}</th>
                              <th>{totalPaidAmount}</th>
                              <th>{commission}</th>
                              <th>{commissionAmount}</th>
                            </tr>
                          </thead>
                          <tbody>
                            {clientCommissionReport
                              .slice(startIndex, endIndex)
                              .map((data, index) => (
                                <tr key={index}>
                                  <td>{data.supplier}</td>
                                  <td>{data.brand}</td>
                                  <td>{data.noOfVouchers}</td>
                                  <td>{data.totalFaceValue}</td>
                                  <td>{data.totalPaidAmount}</td>
                                  <td>{data.commission}</td>
                                  <td>{data.commissionAmount}</td>
                                </tr>
                              ))}
                          </tbody>
                        </table>
                        {clientCommissionReport.length > 5 && (
                          <div className="pagination-container">
                            <ReactPaginate
                              previousLabel={"<"}
                              nextLabel={" >"}
                              breakLabel={"..."}
                              pageCount={Math.ceil(
                                clientCommissionReport.length / rowsPerPage
                              )}
                              marginPagesDisplayed={2}
                              onPageChange={handlePageChange}
                              containerClassName={"pagination"}
                              activeClassName={"active"}
                              initialPage={page - 1}
                              previousClassName={page === 1 ? disabled_Text : ""}
                            />
                          </div>
                        )}
                      </div>
                    ) : (
                      <NoRecord />
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      ) : (
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
      )}
    </div>
  );
};

export default ClientCommissionReport;
/* eslint-enable react-hooks/exhaustive-deps */
