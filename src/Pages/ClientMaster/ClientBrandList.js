import React from "react";
import { GetTranslationData } from "../../Components/GetTranslationData/GetTranslationData ";

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
      <div class="container-fluid">
        <div class="row">
          <div class="col-xl-12 col-xxl-12">
            <div class="card">
              <div class="container-fluid mt-2 mb-2">
                <div class="d-flex justify-content-between align-items-center mb-4 flex-wrap">
                  <div class="card-header">
                    <h4 class="card-title headdd">{clientbrandlist}</h4>
                  </div>
                  <div class="customer-search mb-sm-0 mb-3">
                    <div class="input-group search-area">
                      <input
                        type="text"
                        class="form-control only-high"
                        placeholder="Search here......"
                      />
                      <span class="input-group-text">
                        <a href="javascript:void(0)">
                          <i class="flaticon-381-search-2"></i>
                        </a>
                      </span>
                    </div>
                  </div>
                  <div class="d-flex align-items-center flex-wrap">
                    <a
                      href="javascript:void(0);"
                      class="btn btn-primary btn-rounded me-3 mb-2"
                    >
                      <i class="fa fa-file-excel me-2"></i>
                      {exportLabel}
                    </a>
                  </div>
                </div>
              </div>
              <div class="container-fluid mt-0">
                <div class="row">
                  <div class="col-sm-3 form-group mb-2">
                    <label for="name-f">{clientbrandlistheading}</label>
                    <select
                      class="form-select"
                      aria-label="Default select example"
                    >
                      <option selected="">{selectSuppliers}</option>
                      <option value="First Client">All</option>
                      <option value="First Client">Quicksilver</option>
                      <option value="Second Client">Supplier 2</option>
                      <option value="Third Client">Supplier 3</option>
                    </select>
                  </div>
                </div>
              </div>
              <div class="card-body">
                <div class="table-responsive">
                  <table class="table header-border table-responsive-sm">
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
                      {customerdetails.map((data) => (
                        <tr>
                          <td>
                            {data.name}
                            <a href="javascript:void();"></a>
                          </td>
                          <td>{data.brand}</td>
                          <td>
                            <div class="input-group mb-2 w-11">
                              <input
                                type="number"
                                class="form-control update-val"
                                placeholder={data.discount}
                                pattern="/^-?\d+\.?\d*$/"
                                onKeyPress="if(this.value.length==2) return false;"
                              />
                              <div class="input-group-append">
                                <button
                                  class="btn btn-outline-primary btn-sm group-btn"
                                  type="button"
                                >
                                  {update}
                                </button>
                              </div>
                            </div>
                          </td>
                          <td>
                            <div class="input-group mb-2 w-11">
                              <input
                                type="number"
                                class="form-control update-val"
                                placeholder={data.commision}
                                pattern="/^-?\d+\.?\d*$/"
                                onKeyPress="if(this.value.length==2) return false;"
                              />
                              <div class="input-group-append">
                                <button
                                  class="btn btn-outline-primary btn-sm group-btn"
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
                            <div class="can-toggle">
                              <input id="a" type="checkbox" />
                              <label for="a">
                                <div
                                  class="can-toggle__switch"
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
