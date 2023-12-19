import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import Loader from "../../Componenets/Loader/Loader";
import './AbandonedCart.scss'

const AbandonedCartReport = () => {
  const [isLoading, setIsLoading] = useState("true");
  const dispatch = useDispatch();

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
    <div class="content-body">
      <div class="container-fluid">
        <div class="row">
          <div class="col-xl-12 col-xxl-12">
            <div class="card">
              <div class="container-fluid">
                <div class="d-flex justify-content-between align-items-center flex-wrap">
                  <div class="card-header">
                    <h4 className='order-details' class="card-title order-details">Abandoned Cart Report</h4>
                  </div>
                  <div class="customer-search mb-sm-0 mb-3">
                    <div class="input-group search-area">
                      <input type="text" class="form-control only-high" placeholder="Mobile/Email/Name" />
                      <span class="input-group-text"><a href="javascript:void(0)"><i class="flaticon-381-search-2"></i></a></span>
                    </div>
                  </div>
                  <div class="example">
                    <input type="text" class="form-control input-daterange-timepicker" name="daterange" value="01/01/2015 1:30 PM - 01/01/2015 2:00 PM" />
                  </div>
                  <div class="d-flex align-items-center flex-wrap">
                    <a href="javascript:void(0);" class="btn btn-primary btn-sm btn-rounded me-3 mb-2"><i class="fa fa-file-excel me-2"></i>Export</a>
                  </div>
                </div>
                {customerDetail.map((data) => (
                  <div class="card-body p-0">
                    <div class="d-flex justify-content-between weak">
                      <div class="1st">
                        <h6>Name</h6>
                        <p className='head-value head-color'>{data.name}</p>
                      </div>
                      <div class="1st">
                        <h6>Email</h6>
                        <p className='head-value head-color'>{data.email}</p>
                      </div>
                      <div class="1st">
                        <h6>Mobile</h6>
                        <p className='head-value head-color'>{data.mobile}</p>
                      </div>
                      <div class="1st">
                        <h6>Total Cart Value</h6>
                        <p className='head-value head-color'>{data.cartValue}</p>
                      </div>
                      <div class="1st">
                        <h6>Status</h6>
                        <span class="btn btn-danger btn-xxs">{data.status}</span>
                      </div>
                      <div class="1st">
                        <h6>Action</h6>
                        <button type="button" class="btn btn-rounded btn-secondary btn-xxs"><i class="fa fa-info"></i> &nbsp;{data.action} </button>                                </div>
                    </div>
                  </div>
                ))}
                {productDetail.map((data) => (
                  <div class="card-body theorder">
                    <div class="row">
                      <div class="col-lg-1">
                        <h5 className='txt txxt'>S.NO</h5>
                        <p className='head-value head-color'>{data.sno}</p>
                      </div>
                      <div class="col-lg-3">
                        <h5 className='txt txxt'>Brand Name</h5>
                        <p className='head-value head-color'>{data.brandName}</p>
                      </div>
                      <div class="col-lg-3">
                        <h5 className='txt txxt'>Face Value</h5>
                        <p className='head-value head-color'>{data.faceValue}</p>
                      </div>
                      <div class="col-lg-1">
                        <h5 className='txt txxt'>QTY</h5>
                        <p className='head-value head-color'>{data.qty}</p>
                      </div>
                      <div class="col-lg-2">
                        <h5 className='txt txxt'>SKU</h5>
                        <p className='head-value head-color'>{data.sku}</p>
                      </div>
                      <div class="col-lg-2">
                        <h5 className='txt txxt'>Discounted Amt.</h5>
                        <p className='head-value head-color'>{data.disAmt}</p>
                      </div>
                    </div>
                    <div class="row">
                      <div class="col-lg-1">
                        <h5 className='txt txxt'>S.NO</h5>
                        <p className='head-value head-color'>{data.sno}</p>
                      </div>
                      <div class="col-lg-3">
                        <h5 className='txt txxt'>Brand Name</h5>
                        <p className='head-value head-color'>{data.brandName}</p>
                      </div>
                      <div class="col-lg-3">
                        <h5 className='txt txxt'>Face Value</h5>
                        <p className='head-value head-color'>{data.faceValue}</p>
                      </div>
                      <div class="col-lg-1">
                        <h5 className='txt txxt'>QTY</h5>
                        <p className='head-value head-color'>{data.qty}</p>
                      </div>
                      <div class="col-lg-2">
                        <h5 className='txt txxt'>SKU</h5>
                        <p className='head-value head-color'>{data.sku}</p>
                      </div>
                      <div class="col-lg-2">
                        <h5 className='txt txxt'>Discounted Amt.</h5>
                        <p className='head-value head-color'>{data.disAmt}</p>
                      </div>
                    </div>
                    <div class="row weak justify-content-end pb-0">
                      <div class="col-lg-2">
                        <h4 className='order-details'>Subtotal</h4>
                      </div>
                      <div class="col-lg-2">
                        <h4 className='order-details'>QTY</h4>
                        <p className='head-value head-color'>{data.quantity}</p>

                      </div>

                      <div class="col-lg-2">
                        <h4 className='order-details'>Amount</h4>
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
    </div>
  );
};

export default AbandonedCartReport;
