import { useSelector } from "react-redux";
import { GetTranslationData } from "../../../Components/GetTranslationData/GetTranslationData ";
import InputField from "../../../Components/InputField/InputField";
import PageError from "../../../Components/PageError/PageError";

const AbandonedCartReport = () => {
   const abandonedCartReport = GetTranslationData("UIClient", "abandonedCartReport");
    const name_label = GetTranslationData("UIAdmin", "failedordersname");
    const email_label = GetTranslationData("UIAdmin", "failedordersemail");
    const mobile_label = GetTranslationData("UIAdmin", "failedordersmobile");
    const cart_Label = GetTranslationData("UIAdmin", "failedorderscartvalue");
    const export_label = GetTranslationData("UIAdmin", "export_label");
    const status = GetTranslationData("UIClient", "status");
    const action = GetTranslationData("UIClient", "actionLabel");
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
              <div className="d-flex justify-content-between align-items-center flex-wrap">
                <div className="card-header">
                  <h4 className="card-title">{abandonedCartReport}</h4>
                </div>
                <div className="customer-search mb-sm-0 mb-3">
                  <div className="input-group search-area">
                    <InputField
                         type="text"
                         className="form-control only-high"
                         placeholder="Mobile/Email/Name"
                        />
                    <span className="input-group-text">
                    <i className="fa fa-search"></i>
                    </span>
                  </div>
                </div>

                <div className="example">
                   <InputField
                    type="text"
                    className="form-control input-daterange-timepicker"
                    name="daterange"
                    value="01/01/2015 1:30 PM - 01/01/2015 2:00 PM"
                  />
                </div>
                <div className="d-flex align-items-center flex-wrap">
                  <a
                    href="javascript:void(0);"
                    className="btn btn-primary btn-sm btn-rounded me-3 mb-2"
                  >
                    <i className="fa fa-file-excel me-2"></i>{export_label}
                  </a>
                </div>
              </div>

              <div className="card-body p-0">
                <div className="d-flex justify-content-between weak">
                  <div className="1st">
                    <h6>{name_label}</h6>
                    <p>Jaswant Rawat</p>
                  </div>

                  <div className="1st">
                    <h6>{email_label}</h6>
                    <p>jaswantjojo21@gmail.com</p>
                  </div>

                  <div className="1st">
                    <h6>{mobile_label}</h6>
                    <p>9876543210</p>
                  </div>

                  <div className="1st">
                    <h6>{cart_Label}</h6>
                    <p>₹5000</p>
                  </div>

                  <div className="1st">
                    <h6>{status}</h6>
                    <span className="btn btn-danger btn-xxs">Pending</span>
                  </div>

                  <div className="1st">
                    <h6>{action}</h6>
                    <button
                      type="button"
                      className="btn btn-rounded btn-secondary btn-xxs"
                    >
                      <i className="fa fa-info"></i> &nbsp;Notify{" "}
                    </button>{" "}
                  </div>
                </div>
              </div>

              <div className="card-body theorder">
                <div className="row">
                  <div className="col-lg-1">
                    <h5>S.NO</h5>
                    <p>1</p>
                  </div>

                  <div className="col-lg-3">
                    <h5>Brand Name</h5>
                    <p>Amazon</p>
                  </div>

                  <div className="col-lg-3">
                    <h5>Face Value</h5>
                    <p>₹2000</p>
                  </div>

                  <div className="col-lg-1">
                    <h5>QTY</h5>
                    <p>3</p>
                  </div>

                  <div className="col-lg-2">
                    <h5>SKU</h5>
                    <p>#45555</p>
                  </div>

                  <div className="col-lg-2">
                    <h5>Discounted Amt.</h5>
                    <p>₹250</p>
                  </div>
                </div>

                <div className="row">
                  <div className="col-lg-1">
                    <h5>S.NO</h5>
                    <p>2</p>
                  </div>

                  <div className="col-lg-3">
                    <h5>Brand Name</h5>
                    <p>Amazon</p>
                  </div>

                  <div className="col-lg-3">
                    <h5>Face Value</h5>
                    <p>₹5000</p>
                  </div>

                  <div className="col-lg-1">
                    <h5>QTY</h5>
                    <p>1</p>
                  </div>

                  <div className="col-lg-2">
                    <h5>SKU</h5>
                    <p>#45555</p>
                  </div>

                  <div className="col-lg-2">
                    <h5>Discounted Amt.</h5>
                    <p>₹500</p>
                  </div>
                </div>

                <div className="row weak justify-content-end pb-0">
                  <div className="col-lg-2">
                    <h4>Subtotal</h4>
                  </div>

                  <div className="col-lg-2">
                    <h4>QTY</h4>
                    <p>6</p>
                  </div>

                  <div className="col-lg-2">
                    <h4>Amount</h4>
                    <p>₹6000</p>
                  </div>
                </div>

                <div className="row mt-2">
                  <div className="col-lg-1">
                    <h5>S.NO</h5>
                    <p>3</p>
                  </div>

                  <div className="col-lg-3">
                    <h5>Brand Name</h5>
                    <p>Flipcart</p>
                  </div>

                  <div className="col-lg-3">
                    <h5>Face Value</h5>
                    <p>₹2000</p>
                  </div>

                  <div className="col-lg-1">
                    <h5>QTY</h5>
                    <p>3</p>
                  </div>

                  <div className="col-lg-2">
                    <h5>SKU</h5>
                    <p>#45555</p>
                  </div>

                  <div className="col-lg-2">
                    <h5>Discounted Amt.</h5>
                    <p>₹250</p>
                  </div>
                </div>

                <div className="row weak justify-content-end pb-0">
                  <div className="col-lg-2">
                    <h4>Subtotal</h4>
                  </div>

                  <div className="col-lg-2">
                    <h4>QTY</h4>
                    <p>3</p>
                  </div>

                  <div className="col-lg-2">
                    <h4>Amount</h4>
                    <p>₹2000</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    </>
      ):(
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

export default AbandonedCartReport;
