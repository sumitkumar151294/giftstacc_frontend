import React from "react";
import { GetTranslationData } from "../../Components/GetTranslationData/GetTranslationData ";
const AbandonedCartReport = () => {
  const export_label = GetTranslationData("UIAdmin", "export_label");
  const abandoned_Cart_Report = GetTranslationData("UIAdmin", "abandoned_Cart_Report");
  const placeholder_Mobile_Email_Name = GetTranslationData("UIAdmin", "placeholder_Mobile_Email_Name");
  const name = GetTranslationData("UIAdmin", "name");
  const email_label = GetTranslationData("UIAdmin", "email_label");
  const mobile_label = GetTranslationData("UIAdmin", "mobile_label");
  const total_Cart_Value = GetTranslationData("UIAdmin", "failedorderscartvalue");
  const Status_label = GetTranslationData("UIAdmin", "Status_label");
  const action_label = GetTranslationData("UIAdmin", "action_label");
  const s_NO_label = GetTranslationData("UIAdmin", "failedorderssno");
  const brand_Name = GetTranslationData("UIAdmin", "failedordersbrandname");
  const face_Value = GetTranslationData("UIAdmin", "failedordersfacevalue");
  const qty = GetTranslationData("UIAdmin", "failedordersqty");
  const sku = GetTranslationData("UIAdmin", "failedorderssku");
  const discounted_Amt = GetTranslationData("UIAdmin", "failedordersdisamount");
  const subtotal = GetTranslationData("UIAdmin", "subtotal");
  const amount = GetTranslationData("UIAdmin", "failedordersamount");
  const customerDetail = [
    {
      name: "Rinkal@codeztechnolabs.com",
      email: "jaswantjojo21@gmail.com ",
      mobile: "9876543210  ",
      cartValue: "₹5000",
      status: "Pending",
      action: "Notify",
    },
  ];
  const productDetail = [
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
    },
    {
      sno: "2",
      brandName: "Amazon",
      faceValue: " ₹5000  ",
      qty: "1",
      sku: "#45556    ",
      disAmt: "₹500",
      subtotal: "",
      amount: " ₹3000  ",
      quantity: "4",
    },
    {
      sno: "3",
      brandName: "Flipcart",
      faceValue: " ₹3000  ",
      qty: "3",
      sku: "#45557   ",
      disAmt: "₹200",
      subtotal: "",
      amount: " ₹4000  ",
      quantity: "5",
    },
    {
      sno: "4",
      brandName: "Zara",
      faceValue: " ₹3200  ",
      qty: "1",
      sku: "#45558    ",
      disAmt: "₹450",
      subtotal: "",
      amount: " ₹5000  ",
      quantity: "6",
    },
    {
      sno: "5",
      brandName: "H&M",
      faceValue: " ₹2700  ",
      qty: "2",
      sku: "#45559    ",
      disAmt: "₹650",
      subtotal: "",
      amount: " ₹6000  ",
      quantity: "7",
    },
  ];
  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-xl-12 col-xxl-12">
          <div className="card">
            <div className="container-fluid">
              <div className="d-flex justify-content-between align-items-center flex-wrap">
                <div className="card-header">
                  <h4 className="card-title order-details">{abandoned_Cart_Report}</h4>
                </div>
                <div className="customer-search mb-sm-0 mb-3">
                  <div className="input-group search-area">
                    <input type="text" className="form-control only-high" placeholder={placeholder_Mobile_Email_Name} />
                    <span className="input-group-text"><a><i className="flaticon-381-search-2"></i></a></span>
                  </div>
                </div>
                <div className="example">
                  <input type="text" className="form-control input-daterange-timepicker" name="daterange" defaultValue="01/01/2015 1:30 PM - 01/01/2015 2:00 PM" />
                </div>
                <div className="d-flex align-items-center flex-wrap">
                  <a className="btn btn-primary btn-sm btn-rounded me-3 mb-2"><i className="fa fa-file-excel me-2"></i>{export_label}</a>
                </div>
              </div>
              {customerDetail.map((data, index) => (
                <div key={index} className="scroll p-0">
                  <div className="d-flex justify-content-between weak scroll">
                    <div className="pl-pr">
                      <h6>{name}</h6>
                      <p className='head-value head-color'>{data.name}</p>
                    </div>
                    <div className="pl-pr">
                      <h6>{email_label}</h6>
                      <p className='head-value head-color'>{data.email}</p>
                    </div>
                    <div className="pl-pr">
                      <h6>{mobile_label}</h6>
                      <p className='head-value head-color'>{data.mobile}</p>
                    </div>
                    <div className="pl-pr">
                      <h6>{total_Cart_Value}</h6>
                      <p className='head-value head-color'>{data.cartValue}</p>
                    </div>
                    <div className="pl-pr">
                      <h6>{Status_label}</h6>
                      <span className="btn btn-danger btn-xxs">{data.status}</span>
                    </div>
                    <div className="pl-pr">
                      <h6>{action_label}</h6>
                      <button type="button" className="btn btn-rounded btn-secondary btn-xxs nowrap"><i className="fa fa-info"></i> &nbsp;{data.action} </button>                                </div>
                  </div>
                </div>
              ))}
              {productDetail.map((data, index) => (
                <div key={index} className="card-body theorder">
                  <div className="row">
                    <div className="col-lg-1">
                      <h5 className='txt txxt'>{s_NO_label}</h5>
                      <p className='head-value head-color'>{data.sno}</p>
                    </div>
                    <div className="col-lg-3">
                      <h5 className='txt txxt'>{brand_Name}</h5>
                      <p className='head-value head-color'>{data.brandName}</p>
                    </div>
                    <div className="col-lg-3">
                      <h5 className='txt txxt'>{face_Value}</h5>
                      <p className='head-value head-color'>{data.faceValue}</p>
                    </div>
                    <div className="col-lg-1">
                      <h5 className='txt txxt'>{qty}</h5>
                      <p className='head-value head-color'>{data.qty}</p>
                    </div>
                    <div className="col-lg-2">
                      <h5 className='txt txxt'>{sku}</h5>
                      <p className='head-value head-color'>{data.sku}</p>
                    </div>
                    <div className="col-lg-2">
                      <h5 className='txt txxt'>{discounted_Amt}</h5>
                      <p className='head-value head-color'>{data.disAmt}</p>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-lg-1">
                      <h5 className='txt txxt'>{s_NO_label}</h5>
                      <p className='head-value head-color'>{data.sno}</p>
                    </div>
                    <div className="col-lg-3">
                      <h5 className='txt txxt'>{brand_Name}</h5>
                      <p className='head-value head-color'>{data.brandName}</p>
                    </div>
                    <div className="col-lg-3">
                      <h5 className='txt txxt'>{face_Value}</h5>
                      <p className='head-value head-color'>{data.faceValue}</p>
                    </div>
                    <div className="col-lg-1">
                      <h5 className='txt txxt'>{qty}</h5>
                      <p className='head-value head-color'>{data.qty}</p>
                    </div>
                    <div className="col-lg-2">
                      <h5 className='txt txxt'>{sku}</h5>
                      <p className='head-value head-color'>{data.sku}</p>
                    </div>
                    <div className="col-lg-2">
                      <h5 className='txt txxt'>{discounted_Amt}</h5>
                      <p className='head-value head-color'>{data.disAmt}</p>
                    </div>
                  </div>
                  <div className="row weak justify-content-end pb-0">
                    <div className="col-lg-2">
                      <h4 className='order-details'>{subtotal}</h4>
                    </div>
                    <div className="col-lg-2">
                      <h4 className='order-details'>{qty}</h4>
                      <p className='head-value head-color'>{data.quantity}</p>
                    </div>
                    <div className="col-lg-2">
                      <h4 className='order-details'>{amount}</h4>
                      <p className='head-value head-color'>{data.amount}</p>
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
