import React, { useState, useEffect } from "react";
import Dropdown from "../../../Components/Dropdown/Dropdown";
import NoRecord from "../../../Components/NoRecord/NoRecord";
import ReactPaginate from "react-paginate";
import InputField from "../../../Components/InputField/InputField";
import { useDispatch, useSelector } from "react-redux";
import { onGetCommissionReport } from "../../../Store/Slices/ClientAdmin/clientCommissionReportSlice";
import { CSVLink } from "react-csv";
import Button from "../../../Components/Button/Button";
import { GetTranslationData } from "../../../Components/GetTranslationData/GetTranslationData ";

const ClientCommissionReport = () => {
  const [page, setPage] = useState(1);
  const [rowsPerPage] = useState(5);

  const [addData, setAddData] = useState({
    supplier: "",
    brand: "",
  });
  const [errors, setErrors] = useState({
    supplier: "",
    brand: "",
  });
  const headers = [
    { label: "Supplier", key: "supplier" },
    { label: "Brand", key: "brand" },
    { label: "No. Of Vouchers", key: "noOfVouchers" },
    { label: "Total Face Value", key: "totalFaceValue" },
    { label: "Total Paid Amount", key: "totalPaidAmount" },
    { label: "Commission%", key: "commission" },
    { label: "Commission Amount", key: "commissionAmount" }
  ];
  const selectSupplierOptions = [
    { value: "Qwik Silver", label: "Qwik Silver" },
    { value: "Supplier 2", label: "Supplier 2" },
    { value: "Supplier 3", label: "Supplier 3" },
  ];
  const selectBrandOptions = [
    { value: "Amazon", label: "Amazon" },
    { value: "Flipcart", label: "Flipcart" },
    { value: "Nykaa", label: "Nykaa" },
  ];
  const export_label = GetTranslationData("UIAdmin", "export_label");
  const dispatch = useDispatch();
  const clientCommissionReport = useSelector(
    (state) => state.commissionReportReducer?.reportData
  );

  const startIndex = (page - 1) * rowsPerPage;
  const endIndex = startIndex + rowsPerPage;
  const handlePageChange = (selected) => {
    setPage(selected.selected + 1);
  };
  const handleInputChange = (e, fieldName) => {
    setAddData({
      ...addData,
      [fieldName]: e.target.value,
    });
    setErrors({
      ...errors,
      [fieldName]: "",
    });
  };
  useEffect(() => {
    dispatch(onGetCommissionReport());
  }, []);
  const namesArray = clientCommissionReport.map(data => ({
    supplier:data.supplier,
    brand:data.brand,
    noOfVouchers:data.noOfVouchers,
    totalFaceValue:data.totalFaceValue,
    totalPaidAmount:data.totalPaidAmount,
    commission:data.commission,
    commissionAmount:data.commissionAmount
  }));
  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-xl-12 col-xxl-12">
          <div className="card">
            <div className="container-fluid pt-0">
              <div className="d-flex justify-content-between align-items-center  flex-wrap">
                <div className="card-header">
                  <h4 className="card-title">Client Commission Report</h4>
                </div>
                <div className="ddop">
                  <Dropdown
                    value={addData.supplier || ""}
                    onChange={(e) => handleInputChange(e, "supplier")}
                    className="form-select"
                    options={selectSupplierOptions}
                  />
                </div>
                <div className="ddop">
                  <Dropdown
                    value={addData.brand || ""}
                    onChange={(e) => handleInputChange(e, "brand")}
                    className="form-select"
                    options={selectBrandOptions}
                  />
                </div>
                <div className="example">
                  <InputField
                    type="text"
                    value="01/01/2015 1:30 PM - 01/01/2015 2:00 PM"
                    className="form-control input-daterange-timepicker"
                    name="daterange"
                  />
                </div>
                <div className="d-flex align-items-center flex-wrap">
                    {clientCommissionReport && clientCommissionReport.length > 0 && (
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
                        <th>Supplier</th>
                        <th>Brand</th>
                        <th>No. of Vouchers</th>
                        <th>Total Face Value</th>
                        <th>Total Paid Amount</th>
                        <th>Commission%</th>
                        <th>Commission Amount</th>
                      </tr>
                    </thead>
                    <tbody>
                      {clientCommissionReport
                        .slice(startIndex, endIndex)
                        .map((data) => (
                          <tr>
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
                        previousClassName={page === 1 ? "disabled" : ""}
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
  );
};

export default ClientCommissionReport;
