import React from "react";
import { GetTranslationData } from "../../Components/GetTranslationData/GetTranslationData ";
import ScrollToTop from "../../Components/ScrollToTop/ScrollToTop";

const customerdetails = [
  {
    name: "Qucksilver",
    brand: "Amazon",
    discount: "5%",
    commision: "10%",
    margin: "15%",
    action: "",
  },
  {
    name: "Supplier 2",
    brand: "Flipcart",
    discount: "10%",
    commision: "15%",
    margin: "10%",
    action: "",
  },
  {
    name: "abcd",
    brand: "efgh",
    discount: "66%",
    commision: "89%",
    margin: "88%",
    action: "",
  },
  {
    name: "ghij",
    brand: "xlc",
    discount: "13%",
    commision: "54%",
    margin: "20%",
    action: "",
  },
];

const ClientBrandList = () => {
  const clientbrandlist = GetTranslationData("UIAdmin", "clientbrandlist");
  const clientbrandlistheading = GetTranslationData(
    "UIAdmin",
    "clientbrandlistheading"
  );
  const clientbrandlistname = GetTranslationData(
    "UIAdmin",
    "clientbrandlistname"
  );
  const clientbrandlistbrandname = GetTranslationData(
    "UIAdmin",
    "clientbrandlistbrandname"
  );
  const clientbrandlistdiscount = GetTranslationData(
    "UIAdmin",
    "clientbrandlistdiscount"
  );
  const clientbrandlistcommission = GetTranslationData(
    "UIAdmin",
    "clientbrandlistcommission"
  );
  const clientbrandlistmargin = GetTranslationData(
    "UIAdmin",
    "clientbrandlistmargin"
  );
  const clientbrandlistaction = GetTranslationData(
    "UIAdmin",
    "clientbrandlistaction"
  );
  const exportLabel = GetTranslationData("UIAdmin", "export_label");
  const selectSuppliers = GetTranslationData("UIAdmin", "selectSuppliers");
  const update = GetTranslationData("UIAdmin", "update_label");

  return (
    <>
    <ScrollToTop/>
      <div className="container-fluid">
        <div className="row">
          <div className="col-xl-12 col-xxl-12">
            <div className="card">
              <div className="container-fluid mt-2 mb-2">
                <div className="d-flex justify-content-between align-items-center mb-4 flex-wrap">
                  <div className="card-header">
                    <h4 className="card-title headdd">{clientbrandlist}</h4>
                  </div>
                  <div className="customer-search mb-sm-0 mb-3">
                    <div className="input-group search-area">
                      <input
                        type="text"
                        className="form-control only-high"
                        placeholder="Search here......"
                      />
                      <span className="input-group-text">
                        <a href="#">
                          <i className="flaticon-381-search-2"></i>
                        </a>
                      </span>
                    </div>
                  </div>
                  <div className="d-flex align-items-center flex-wrap">
                    <a
                      href="#"
                      className="btn btn-primary btn-rounded me-3 mb-2"
                    >
                      <i className="fa fa-file-excel me-2"></i>
                      {exportLabel}
                    </a>
                  </div>
                </div>
              </div>
              <div className="container-fluid mt-0">
                <div className="row">
                  <div className="col-sm-3 form-group mb-2">
                    <label htmlFor="name-f">{clientbrandlistheading}</label>
                    <select
                      className="form-select"
                      aria-label="Default select example"
                    >
                      <option>{selectSuppliers}</option>
                      <option defaultValue="First Client">All</option>
                      <option defaultValue="First Client">Quicksilver</option>
                      <option defaultValue="Second Client">Supplier 2</option>
                      <option defaultValue="Third Client">Supplier 3</option>
                    </select>
                  </div>
                </div>
              </div>
              <div className="card-body">
                <div className="table-responsive">
                  <table className="table header-border table-responsive-sm">
                    <thead>
                      <tr>
                        <th>{clientbrandlistname}</th>
                        <th>{clientbrandlistbrandname}</th>
                        <th>{clientbrandlistdiscount}</th>
                        <th>{clientbrandlistcommission}</th>
                        <th>{clientbrandlistmargin}</th>
                        <th>{clientbrandlistaction}</th>
                      </tr>
                    </thead>
                    <tbody>
                      {customerdetails.map((data, index) => (
                        <tr key={index}>
                          <td>
                            {data.name}
                            <a href="#"></a>
                          </td>
                          <td>{data.brand}</td>
                          <td>
                            <div className="input-group mb-2 w-11">
                              <input
                                type="number"
                                className="form-control update-val"
                                placeholder={data.discount}
                                pattern="/^-?\d+\.?\d*$/"
                              />
                              <div className="input-group-append">
                                <button
                                  className="btn btn-outline-primary btn-sm group-btn"
                                  type="button"
                                >
                                  {update}
                                </button>
                              </div>
                            </div>
                          </td>
                          <td>
                            <div className="input-group mb-2 w-11">
                              <input
                                type="number"
                                className="form-control update-val"
                                placeholder={data.commision}
                                pattern="/^-?\d+\.?\d*$/"
                              />
                              <div className="input-group-append">
                                <button
                                  className="btn btn-outline-primary btn-sm group-btn"
                                  type="button"
                                >
                                  {update}
                                </button>
                              </div>
                            </div>
                          </td>
                          <td>{data.margin}</td>
                          <td>
                            {" "}
                            <div className="can-toggle">
                              <input id="a" type="checkbox" />
                              <label htmlFor="a">
                                <div
                                  className="can-toggle__switch"
                                  data-checked="On"
                                  data-unchecked="off"
                                ></div>
                              </label>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ClientBrandList;
