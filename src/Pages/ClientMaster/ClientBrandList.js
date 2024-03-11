import React, { useEffect, useState } from "react";
import { GetTranslationData } from "../../Components/GetTranslationData/GetTranslationData ";
import { CSVLink } from "react-csv";
import { useDispatch, useSelector } from "react-redux";
import { onGetSupplierBrandList, onUpdateSupplierBrandList, onUpdateSupplierBrandListReset } from "../../Store/Slices/supplierBrandListSlice";
import NoRecord from "../../Components/NoRecord/NoRecord";
import Dropdown from "../../Components/Dropdown/Dropdown";
import { onGetSupplierList } from "../../Store/Slices/supplierMasterSlice";
import ScrollToTop from "../../Components/ScrollToTop/ScrollToTop";
import ReactPaginate from "react-paginate";
import InputField from "../../Components/InputField/InputField";
import Button from "../../Components/Button/Button";
import { ToastContainer, toast } from "react-toastify";
import { useLocation } from "react-router-dom";
import PageError from "../../Components/PageError/PageError";
import { onClientProductMappingSubmit, onPostClientProductMappingReset, onPostClientProductMappingSubmit, onUpdateClientProductMappingReset, onUpdateClientProductMappingSubmit } from "../../Store/Slices/clientProductMappingSlice";

const ClientBrandList = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const [selectedSupplierCode, setSelectedSupplierCode] = useState("Select");
  const [supplierList, setSupplierList] = useState([]);
  const [copySupplierBrandList, setCopySupplierBrandList] = useState([]);
  const [copyClientMapping, setCopyClientMapping] = useState([]);
  const SupplierBrandList = useSelector(
    (state) => state.supplierBrandListReducer.data
  );
  const ClientProducts = useSelector(
    (state) => state.clientProductMappingReducer
  );
  const suppliers = useSelector((state) => state.supplierMasterReducer);
  const search_here_label = GetTranslationData("UIAdmin", "search_here_label");
  const export_label = GetTranslationData("UIAdmin", "export_label");
  const selectSuppliers = GetTranslationData("UIAdmin", "selectSuppliers");
  const supplier_products = GetTranslationData("UIAdmin", "clientbrandlist");
  const supplierName = GetTranslationData("UIAdmin", "supplierName");
  const supplierBrandName = GetTranslationData("UIAdmin", "clientbrandlistbrandname");
  const supplierMargin = GetTranslationData("UIAdmin", "supplierMargin");
  const clientbrandlistdiscount = GetTranslationData("UIAdmin", "clientbrandlistdiscount");
  const clientbrandlistcommission = GetTranslationData("UIAdmin", "clientbrandlistcommission");
  const status = GetTranslationData("UIAdmin", "Status_label");
  const action = GetTranslationData("UIAdmin", "action_label");
  const update = GetTranslationData("UIAdmin", "update_label");
  const [searchQuery, setSearchQuery] = useState("");
  const [rowsPerPage] = useState(5);
  useEffect(() => {
    dispatch(onGetSupplierBrandList());
    dispatch(onGetSupplierList());
    dispatch(onClientProductMappingSubmit());
  }, []);

  useEffect(() => {
    const filterData = SupplierBrandList?.filter((item) => {
      return item.enabled === true
    })
    setCopySupplierBrandList(filterData)
  }, [SupplierBrandList])

  useEffect(() => {
   const copyData = Array.isArray(ClientProducts.clientData) && [...ClientProducts.clientData]
    setCopyClientMapping(copyData);
  }, [ClientProducts.clientData])

  useEffect(() => {
    if (ClientProducts?.post_status_code === "201") {
      toast.success(ClientProducts?.message)
      dispatch(onClientProductMappingSubmit());
      dispatch(onPostClientProductMappingReset());
    }else if (ClientProducts?.update_status_code === "201") {
      toast.success(ClientProducts?.updateMessage)
      dispatch(onClientProductMappingSubmit());
      dispatch(onUpdateClientProductMappingReset());
    }
  }, [ClientProducts])

  const handlePageChange = (selected) => {
    setPage(selected.selected + 1);
  };
  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
    setPage(1);
  };

  const [page, setPage] = useState(1);
  const startIndex = (page - 1) * rowsPerPage;

  const endIndex = startIndex + rowsPerPage;
  const headers = [
    { label: "id", key: "id" },
    { label: "brands", key: "brands" },
    { label: "supplier_Margin", key: "supplier_Margin" },
    { label: "status", key: "status" },
    { label: "action", key: "action" },
  ];
  const generateUniqueId = (index) => `toggleSwitch-${index}`;

  useEffect(() => {
    if (suppliers?.data.length && !supplierList.length) {
      let tempSupplier = [];
      suppliers?.data?.map((item) => {
        tempSupplier.push({ label: item.name, value: item.code });
      });
      setSupplierList(tempSupplier);
    }
  }, [suppliers]);

  const handleChange = (e) => {
    const filterData = SupplierBrandList?.filter((item) => {
      return item.enabled === true
    })
    const selectedSupplierCode = e.target.value;
    if (selectedSupplierCode === "Select") {
      setCopySupplierBrandList(filterData);
    } else {
      let filteredSupplierList = Array.isArray(filterData) && filterData?.filter((vendor) =>
        vendor?.supplierCode.toLowerCase() === selectedSupplierCode.toLowerCase()
      );
      setCopySupplierBrandList(filteredSupplierList);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "e" || e.key === "+" || e.key === "-") {
      e.preventDefault();
    }
  };

  const handleInputChange = (e, ids, name) => {
    const newValue = e.target.value < 0 ? 0 : e.target.value;
    const mapping = [...copyClientMapping];
    const isUpdate = copyClientMapping.find((item)=>(
      item.productId === ids
    ))
    if(!isUpdate){
      mapping.push({
          productId: ids,
          clientId: location?.state?.id,
          customerDiscount: 1,
          clientCommission: 1,
          enabled:false
      })
    }
    const updatedClinetMapping = mapping.map(item => {
      if (item.productId === ids) {
        return { ...item, [name]: newValue };
      } else {
        return item;
      }
    });
    setCopyClientMapping(updatedClinetMapping);
  };


  const handleUpdate = (data) => {
    const isUpdate = copyClientMapping.find((item)=>(
      item.productId === data?.id
    ))
    if(isUpdate && isUpdate?.id){
      const updatedValues = {
        clientCommission: isUpdate?.clientCommission,
        customerDiscount: isUpdate?.customerDiscount,
        clientId: location?.state?.id,
        enabled: isUpdate?.enabled,
        productId: data?.id,
        id: isUpdate?.id
      };
      dispatch(onUpdateClientProductMappingSubmit(updatedValues))
    }else{
      const updatedValues = {
        clientCommission: isUpdate?.clientCommission,
        customerDiscount: isUpdate?.customerDiscount,
        clientId: location?.state?.id,
        enabled: false,
        productId: data?.id
      };
      dispatch(onPostClientProductMappingSubmit(updatedValues))
    }
  };

  const updateStatus = (data) => {
    const isUpdate = copyClientMapping.find((item)=>(
      item.productId === data?.id
    ))
    if(isUpdate){
      const updatedValues = {
        clientCommission: isUpdate?.clientCommission,
        customerDiscount: isUpdate?.customerDiscount,
        clientId: location?.state?.id,
        enabled: !isUpdate?.enabled,
        productId: data?.id,
        id: isUpdate?.id
      };
      dispatch(onUpdateClientProductMappingSubmit(updatedValues))
    }else{
      const updatedValues = {
        clientCommission: 1,
        customerDiscount: 1,
        clientId: location?.state?.id,
        enabled: true,
        productId: data?.id
      };
      dispatch(onPostClientProductMappingSubmit(updatedValues))
    }
  }

  useEffect(() => {
    const filterData = SupplierBrandList?.filter((item) => {
      return item.enabled === true
    })
    let filteredSupplierList = Array.isArray(filterData) && SupplierBrandList?.filter((vendor) =>
      vendor?.name.toLowerCase().includes(searchQuery?.toLowerCase()) &&
      (vendor?.supplierCode.toLowerCase() === selectedSupplierCode.toLowerCase() || selectedSupplierCode === "Select")
    );
    setCopySupplierBrandList(filteredSupplierList);
  }, [searchQuery, selectedSupplierCode]);

  const getSupplierName = (code) => {
    const filterData = Array.isArray(suppliers?.data) && suppliers?.data?.filter((item) => {
      return item.code === code
    })
    return filterData[0]?.name.length ? filterData[0]?.name : ""
  };

  const getValues = (id, name) =>{  
    const data = copyClientMapping.find((item)=>(
      item.productId === id
    ))
    return data?.[name] ? data?.[name] : "";
  }

  return (
    <>
      <ScrollToTop />
      {location.state ?
        <div>
          <div className="container-fluid">
            <div className="row">
              <div className="col-xl-12 col-xxl-12">
                <div className="card d-flex justify-content-between ">
                  <div className="container-fluid mt-2 mb-2 ">
                    <div className="d-flex justify-content-between align-items-center mb-4 mt-7-supplier flex-wrap">
                      <div className="card-header">
                        <h4 className="card-title">{supplier_products}</h4>
                      </div>
                      <div className="customer-search mb-sm-0 mb-3">
                        <div className="input-group search-area">
                          <InputField
                            type="text"
                            value={searchQuery}
                            onChange={handleSearch}
                            className="form-control only-high"
                            placeholder={search_here_label}
                          />
                          <span className="input-group-text">
                            <i className="fa fa-search"></i>
                          </span>
                        </div>
                      </div>
                      <div className="d-flex align-items-center flex-wrap">
                        {copySupplierBrandList &&
                          copySupplierBrandList.length > 0 && (
                            <CSVLink
                              data={SupplierBrandList}
                              headers={headers}
                              filename={"SupplierBrandList.csv"}
                            >
                              <Button
                                className="btn btn-primary btn-sm btn-rounded me-3 mb-2"
                                icons={"fa fa-file-excel"}
                                text={export_label}
                              />
                            </CSVLink>
                          )}
                      </div>
                    </div>
                  </div>
                  <div className="card-body">
                    <form>
                      <div className="row flex-column px-1">
                        <div className="col-sm-3 form-group mb-2">
                          <label htmlFor="name-f">{selectSuppliers}</label>
                          <Dropdown
                            className="form-select"
                            aria-label="Default select example"
                            onChange={(e) => {
                              setSelectedSupplierCode(e.target.value);
                              handleChange(e);
                            }}
                            options={supplierList}
                          />
                        </div>
                      </div>
                    </form>
                    <div className="row px-1">
                      <div className="col-lg-12">
                        <div>
                          {Array.isArray(copySupplierBrandList) &&
                            copySupplierBrandList.length > 0 ? (
                            <div className="card-body">
                              <div className="table-responsive">
                                <table className="table header-border table-responsive-sm">
                                  <thead>
                                    <tr>
                                      <th>{supplierName}</th>
                                      <th>{supplierBrandName}</th>
                                      <th>{clientbrandlistdiscount}</th>
                                      <th>{clientbrandlistcommission}</th>
                                      <th>{supplierMargin}</th>
                                      <th>{status}</th>
                                      <th>{action}</th>
                                    </tr>
                                  </thead>
                                  <tbody>
                                    {copySupplierBrandList
                                      .slice(startIndex, endIndex)
                                      .map((data, index) => (
                                        <tr key={index}>
                                          <td>{getSupplierName(data.supplierCode)}</td>
                                          <td>{data.name}</td>
                                          <td>
                                            <div className="input-group mb-2 w-11">
                                              <InputField
                                                type="number"
                                                className="form-control htt"
                                                placeholder={data.customerDiscount}
                                                pattern="/^-?\d+\.?\d*$/"
                                                value={getValues(data.id, "customerDiscount")}
                                                onChange={(e) => handleInputChange(e, data.id, "customerDiscount")}
                                                onKeyPress={(e) => handleKeyPress(e, index)}
                                              />
                                              <div className="input-group-append">
                                                <Button
                                                  onClick={() =>
                                                    handleUpdate(data, data.id)
                                                  }
                                                  className="btn btn-outline-primary btn-sm group-btn btn-pad"
                                                  type="button"
                                                  text={update}
                                                />
                                              </div>
                                            </div>
                                          </td>
                                          <td>
                                            <div className="input-group mb-2 w-11">
                                              <InputField
                                                type="number"
                                                className="form-control htt"
                                                placeholder={data.clientCommission}
                                                pattern="/^-?\d+\.?\d*$/"
                                                value={getValues(data.id, "clientCommission")}
                                                onChange={(e) => handleInputChange(e, data.id, "clientCommission")}
                                                onKeyPress={(e) => handleKeyPress(e, index)}
                                              />
                                              <div className="input-group-append">
                                                <Button
                                                  onClick={() =>
                                                    handleUpdate(data, data.id)
                                                  }
                                                  className="btn btn-outline-primary btn-sm group-btn btn-pad"
                                                  type="button"
                                                  text={update}
                                                />
                                              </div>
                                            </div>
                                          </td>
                                          <td>{data.supplierMargin}</td>
                                          <td>
                                            <span
                                              className={
                                                getValues(data.id, "enabled") === true
                                                  ? "badge badge-success"
                                                  : "badge badge-danger"
                                              }
                                            >
                                              { getValues(data.id, "enabled") === true
                                                ? "Active"
                                                : "Non-Active"}
                                            </span>
                                          </td>
                                          <td>
                                            <div className="can-toggle">
                                              <input id={generateUniqueId(index)} type="checkbox" checked={ getValues(data.id, "enabled")}></input>
                                              <label
                                                htmlFor={generateUniqueId(index)}
                                              >
                                                <div
                                                  className="can-toggle__switch"
                                                  data-unchecked={"OFF"}
                                                  data-checked={"ON"}
                                                  onClick={() => updateStatus(data, index)}
                                                ></div>
                                              </label>
                                            </div>
                                          </td>
                                        </tr>
                                      ))}
                                  </tbody>
                                </table>
                                {copySupplierBrandList?.length > 5 &&
                                  <div className="pagination-container">
                                    <ReactPaginate
                                      previousLabel={"<"}
                                      nextLabel={" >"}
                                      breakLabel={"..."}
                                      pageCount={Math.ceil(
                                        SupplierBrandList.length / rowsPerPage
                                      )}
                                      marginPagesDisplayed={2}
                                      onPageChange={handlePageChange}
                                      containerClassName={"pagination"}
                                      activeClassName={"active"}
                                      initialPage={page - 1} // Use initialPage instead of forcePage
                                      previousClassName={
                                        page === 0 ? "disabled" : ""
                                      }
                                    />
                                  </div>
                                }
                              </div>
                            </div>
                          ) : (
                            <NoRecord />
                          )}
                        </div>
                        <ToastContainer />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        :
        <PageError
          pageError={{
            StatusCode: "401",
            ErrorName: "Not Authorised",
            ErrorDesription: "You are not authorised to view this page",
            url: "/",
            buttonText: "Back to home",
          }}
        />}
    </>
  );
};

export default ClientBrandList;
