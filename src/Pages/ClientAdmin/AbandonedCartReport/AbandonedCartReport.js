import { GetTranslationData } from "../../../Components/GetTranslationData/GetTranslationData ";
import InputField from "../../../Components/InputField/InputField";

const AbandonedCartReport = () => {
  const data = [{
    customerDetail1: {
      orderid: 'order 1',
      name: "lajajj Rawat",
      email: "jaswantjojo21@gmail.com ",
      mobile: "9876543210  ",
      cartvalue: "₹5000",
      orderstatus: "Partial Complete",
      date: '12-09-2023',
      orderamount: '₹5000',
      paymentid: 'PAY_4566',
      points: 'Pts 1200',
      paidamount: '₹3800'

    },

    productDetail: [
      {
        sno: "1",
        brandName: "Amazon",
        faceValue: " ₹2000  ",
        qty: "3",
        sku: "#45555    ",
        disAmt: "₹250",
        subtotal: "",
        amount: " ₹2000  ",
        quantity: "3",
        suborderid: 'LOP455',
        referenceid: 'Ref-125',
        suborderstatus: 'Completed',
        suborderstatusclassname: 'btn btn-success btn-xxs',
        quantity: '4',
        amounttotal: '₹6000',
      }
    ]

  },]

  // const failedorders = GetTranslationData("UIAdmin", "failedorders");
  const failedordersid = GetTranslationData("UIAdmin", "failedordersid");
  const failedordersname = GetTranslationData("UIAdmin", "failedordersname");
  const failedordersemail = GetTranslationData("UIAdmin", "failedordersemail");
  const failedordersmobile = GetTranslationData("UIAdmin", "failedordersmobile");
  const failedorderscartvalue = GetTranslationData("UIAdmin", "failedorderscartvalue");
  const failedordersorderstatus = GetTranslationData("UIAdmin", "failedordersorderstatus");
  // const failedordersdate = GetTranslationData("UIAdmin", "failedordersdate");
  // const failedordersorderamount = GetTranslationData("UIAdmin", "failedordersorderamount");
  // const failedorderspaymentid = GetTranslationData("UIAdmin", "failedorderspaymentid"); 
  // const failedorderspoints = GetTranslationData("UIAdmin", "failedorderspoints");
  // const failedorderspaidamount = GetTranslationData("UIAdmin", "failedorderspaidamount");
  const failedorderssno = GetTranslationData("UIAdmin", "failedorderssno");
  const failedordersbrandname = GetTranslationData("UIAdmin", "failedordersbrandname");
  const failedordersfacevalue = GetTranslationData("UIAdmin", "failedordersfacevalue");
  const failedordersqty = GetTranslationData("UIAdmin", "failedordersqty");
  const failedorderssku = GetTranslationData("UIAdmin", "failedorderssku");
  const failedordersdisamount = GetTranslationData("UIAdmin", "failedordersdisamount");
  // const failedorderssuborderid = GetTranslationData("UIAdmin", "failedorderssuborderid");
  // const failedordersreferenceid = GetTranslationData("UIAdmin", "failedordersreferenceid");
  // const failedorderssuborderstatus = GetTranslationData("UIAdmin", "failedorderssuborderstatus");
  const failedordersamount = GetTranslationData("UIAdmin", "failedordersamount");

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-xl-12 col-xxl-12">
          <div className="card">
            <div className="container-fluid pt-1">
              <div className="d-flex justify-content-between align-items-center flex-wrap">
                <div className="card-header">
                  <h4 className="card-title">Abandoned Cart Report</h4>
                </div>

                <div className="customer-search mb-sm-0 mb-3">
                  <div className="input-group search-area">
                    <InputField
                      type="text"
                      className="form-control only-high"
                      placeholder="Mobile/Email/Name"
                    />
                    <span className="input-group-text">
                      <a >
                        <i className="flaticon-381-search-2"></i>
                      </a>
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
                    <i className="fa fa-file-excel me-2"></i>Export
                  </a>
                </div>
              </div>

              {data.map((data,index)=>(
              <div className="card-body p-0">
                <div>
                  <div className="d-flex justify-content-between weak">
                    <div className="1st">
                      <h6>{failedordersname}</h6>
                      <p>{data.customerDetail1.name}</p>
                    </div>

                    <div className="1st">
                      <h6>{failedordersemail}</h6>
                      <p>{data.customerDetail1.email}</p>
                    </div>

                    <div className="1st">
                      <h6>{failedordersmobile}</h6>
                      <p>{data.customerDetail1.mobile}</p>
                    </div>

                    <div className="1st">
                      <h6>{failedorderscartvalue}</h6>
                      <p>{data.customerDetail1.cartvalue}</p>
                    </div>

                    <div className="1st">
                      <h6>{failedordersorderstatus}</h6>
                      <span className="btn btn-danger btn-xxs">{data.customerDetail1.orderstatus}</span>
                    </div>

                    <div className="1st">
                      <h6>Action</h6>
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
                      <h5>{failedorderssno}</h5>
                      <p>{data.productDetail[0].sno}</p>
                    </div>

                    <div className="col-lg-3">
                      <h5>{failedordersbrandname}</h5>
                      <p>{data.productDetail[0].brandName}</p>
                    </div>

                    <div className="col-lg-3">
                      <h5>{failedordersfacevalue}</h5>
                      <p>{data.productDetail[0].faceValue}</p>
                    </div>

                    <div className="col-lg-1">
                      <h5>{failedordersqty}</h5>
                      <p>{data.productDetail[0].qty}</p>
                    </div>

                    <div className="col-lg-2">
                      <h5>{failedorderssku}</h5>
                      <p>{data.productDetail[0].sku}</p>
                    </div>

                    <div className="col-lg-2">
                      <h5>{failedordersdisamount}</h5>
                      <p>{data.productDetail[0].disAmt}</p>
                    </div>
                  </div>


                  <div className="row weak justify-content-end pb-0">
                    <div className="col-lg-2">
                      <h4>Subtotal</h4>
                    </div>

                    <div className="col-lg-2">
                      <h4>{failedordersqty}</h4>
                      <p>{data.productDetail[0].qty}</p>
                    </div>

                    <div className="col-lg-2">
                      <h4>{failedordersamount}</h4>
                      <p>{data.productDetail[0].amounttotal}</p>
                    </div>
                  </div>


                </div>
              </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AbandonedCartReport;
