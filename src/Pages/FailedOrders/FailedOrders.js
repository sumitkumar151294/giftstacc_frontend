import React from 'react'
import './FailedOrders.scss'
import { GetTranslationData } from '../../Componenets/GetTranslationData/GetTranslationData ';

const FailedOrders = () => {
    const customerDetail1 = [
        {
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
    ];

    const customerDetail = [
        {
            orderid: 'order2 ',
            name: "hvhvh Rawat",
            email: "jaswantjojo21@gmail.com ",
            mobile: "9876543210  ",
            cartvalue: "₹5000",
            orderstatus: "Pending",
            date: '12-09-2023',
            orderamount: '₹5000',
            paymentid: 'PAY_4566',
            points: 'Pts 1200',
            paidamount: '₹3800'

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
            suborderid: 'LOP455',
            referenceid: 'Ref-125',
            suborderstatus: 'Completed',
            suborderstatusclassname: 'btn btn-success btn-xxs',
            quantity: '4',
            amounttotal: '₹6000',

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
            suborderid: 'LOP466',
            referenceid: '',
            suborderstatus: 'Pending',
            suborderstatusclassname: 'btn btn-danger btn-xxs',
            quantity: '6',
            amounttotal: '₹10000',
            reprocess: 'Re-Process',
            classname: 'btn btn-primary btn-sm float-right bttn'
        },

    ];
    const productDetail1 = [
        {
            sno: "3",
            brandName: "flipkart",
            faceValue: " ₹200000  ",
            qty: "309",
            sku: "#4555533    ",
            disAmt: "₹255660",
            subtotal: "",
            amount: " ₹112000  ",
            quantity: "323",
            suborderid: 'LOP4553443',
            referenceid: 'Ref-125232',
            suborderstatus: 'Pending',
            suborderstatusclassname: 'btn btn-danger btn-xxs',
            quantity: '4244',
            amounttotal: '₹2312000',

        },
        {
            sno: "4",
            brandName: "zoo",
            faceValue: " ₹521000  ",
            qty: "122",
            sku: "#45556e32    ",
            disAmt: "₹500313",
            subtotal: "",
            amount: " ₹3311000  ",
            quantity: "431",
            suborderid: 'LOP466331',
            referenceid: '',
            suborderstatus: 'Pending',
            suborderstatusclassname: 'btn btn-danger btn-xxs',
            quantity: '6',
            amounttotal: '₹10000',

        },

    ];

    const failedorders = GetTranslationData("UIAdmin", "failedorders");
    const failedordersid = GetTranslationData("UIAdmin", "failedordersid");
    const failedordersname = GetTranslationData("UIAdmin", "failedordersname");
    const failedordersemail = GetTranslationData("UIAdmin", "failedordersemail");
    const failedordersmobile = GetTranslationData("UIAdmin", "failedordersmobile");
    const failedorderscartvalue = GetTranslationData("UIAdmin", "failedorderscartvalue");
    const failedordersorderstatus = GetTranslationData("UIAdmin", "failedordersorderstatus");
    const failedordersdate = GetTranslationData("UIAdmin", "failedordersdate");
    const failedordersorderamount = GetTranslationData("UIAdmin", "failedordersorderamount");
    const failedorderspaymentid = GetTranslationData("UIAdmin", "failedorderspaymentid");
    const failedorderspoints = GetTranslationData("UIAdmin", "failedorderspoints");
    const failedorderspaidamount = GetTranslationData("UIAdmin", "failedorders");
    const failedorderssno = GetTranslationData("UIAdmin", "failedorders");
    const failedordersbrandname = GetTranslationData("UIAdmin", "failedorders");
    const failedordersfacevalue = GetTranslationData("UIAdmin", "failedorders");
    const failedordersqty = GetTranslationData("UIAdmin", "failedorders");
    const failedorderssku = GetTranslationData("UIAdmin", "failedorders");
    const failedordersdisamount = GetTranslationData("UIAdmin", "failedorders");
    const failedorderssuborderid = GetTranslationData("UIAdmin", "failedorders");
    const failedordersreferenceid = GetTranslationData("UIAdmin", "failedorders");
    const failedorderssuborderstatus = GetTranslationData("UIAdmin", "failedorders");
    const failedordersamount = GetTranslationData("UIAdmin", "failedorders");

    return (
        <>
            <div className="content-body">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-xl-12 col-xxl-12">
                            <div className="card">
                                <div className="container-fluid">
                                    <div className="d-flex justify-content-between align-items-center flex-wrap">
                                        <div className="card-header">
                                            <h4 className="card-title order-details">{failedorders}</h4>
                                        </div>
                                        <div className="customer-search mb-sm-0 mb-3">
                                            <div className="input-group search-area">
                                                <input type="text" className="form-control only-high" placeholder="Mobile/Email/Name" />
                                                <span className="input-group-text"><a href="javascript:void(0)"><i className="flaticon-381-search-2"></i></a></span>
                                            </div>
                                        </div>
                                        <div className="example">
                                            <input type="text" className="form-control input-daterange-timepicker" name="daterange" value="01/01/2015 1:30 PM - 01/01/2015 2:00 PM" />
                                        </div>
                                        <div className="d-flex align-items-center flex-wrap">
                                            <a href="javascript:void(0);" className="btn btn-primary btn-sm btn-rounded me-3 mb-2"><i className="fa fa-file-excel me-2"></i>Export</a>
                                        </div>
                                    </div>
                                    <div className="card-body p-0 main">
                                        {customerDetail1.map((data) => (
                                            <div>
                                                <div className="d-flex justify-content-between weak1">
                                                    <div className="1st">
                                                        <h6>{failedordersid}</h6>
                                                        <p className='head-value head-color' >{data.orderid}</p>
                                                    </div>
                                                    <div className="1st">
                                                        <h6>{failedordersname}</h6>
                                                        <p className='head-value head-color' >{data.name}</p>
                                                    </div>
                                                    <div className="1st">
                                                        <h6>{failedordersemail}</h6>
                                                        <p className='head-value head-color' >{data.email}</p>
                                                    </div>
                                                    <div className="1st">
                                                        <h6>{failedordersmobile}</h6>
                                                        <p className='head-value head-color'>{data.mobile}</p>
                                                    </div>
                                                    <div className="1st">
                                                        <h6>{failedorderscartvalue}</h6>
                                                        <p className='head-value head-color'>{data.cartvalue}</p>
                                                    </div>
                                                    <div className="1st">
                                                        <h6>{failedordersorderstatus}</h6>
                                                        <span className="btn btn-danger btn-xxs">{data.orderstatus}</span>
                                                    </div>
                                                    <div className="1st">
                                                    </div>
                                                </div>
                                                <div className="d-flex justify-content-between weak1">
                                                    <div className="1st">
                                                        <h6>{failedordersdate}</h6>
                                                        <p className='head-value head-color'>{data.date}</p>
                                                    </div>
                                                    <div className="1st">
                                                        <h6>{failedordersorderamount}</h6>
                                                        <p className='head-value head-color'>{data.orderamount}</p>
                                                    </div>
                                                    <div className="1st">
                                                        <h6>{failedorderspaymentid}</h6>
                                                        <p className='head-value head-color'>{data.paymentid}</p>
                                                    </div>
                                                    <div className="1st">
                                                        <h6>{failedorderspoints}</h6>
                                                        <p className='head-value head-color'>{data.points}</p>
                                                    </div>
                                                    <div className="1st">
                                                        <h6>{failedorderspaidamount}</h6>
                                                        <p className='head-value head-color'>{data.paidamount}</p>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                        <div className="card-body theorder">
                                            {productDetail.map((data) => (
                                                <div>
                                                    <div className="row">
                                                        <div className="col-lg-1">
                                                            <h5 className='txt txxt'>{failedorderssno}</h5>
                                                            <p className='head-value head-color' >{data.sno}</p>
                                                        </div>
                                                        <div className="col-lg-3">
                                                            <h5 className='txt txxt'>{failedordersbrandname}</h5>
                                                            <p className='head-value head-color' >{data.brandName}</p>
                                                        </div>
                                                        <div className="col-lg-3">
                                                            <h5 className='txt txxt'>{failedordersfacevalue}</h5>
                                                            <p className='head-value head-color' >{data.faceValue}</p>
                                                        </div>
                                                        <div className="col-lg-1">
                                                            <h5 className='txt txxt'>{failedordersqty}</h5>
                                                            <p className='head-value head-color' >{data.qty}</p>
                                                        </div>
                                                        <div className="col-lg-2">
                                                            <h5 className='txt txxt'>{failedorderssku}</h5>
                                                            <p className='head-value head-color' >{data.sku}</p>
                                                        </div>
                                                        <div className="col-lg-2">
                                                            <h5 className='txt txxt'>{failedordersdisamount}</h5>
                                                            <p className='head-value head-color' >{data.disAmt}</p>
                                                        </div>
                                                    </div>
                                                    <div className="row">
                                                        <div className="col-lg-1">
                                                            <h5 className='txt txxt'>{failedorderssno}</h5>
                                                            <p className='head-value head-color' >{data.sno}</p>
                                                        </div>
                                                        <div className="col-lg-3">
                                                            <h5 className='txt txxt'>{failedordersbrandname}</h5>
                                                            <p className='head-value head-color' >{data.brandName}</p>
                                                        </div>
                                                        <div className="col-lg-3">
                                                            <h5 className='txt txxt'>{failedordersfacevalue}</h5>
                                                            <p className='head-value head-color' >{data.faceValue}</p>
                                                        </div>
                                                        <div className="col-lg-1">
                                                            <h5 className='txt txxt'>{failedordersqty}</h5>
                                                            <p className='head-value head-color' >{data.qty}</p>
                                                        </div>
                                                        <div className="col-lg-2">
                                                            <h5 className='txt txxt'>{failedorderssku}</h5>
                                                            <p className='head-value head-color' >{data.sku}</p>
                                                        </div>
                                                        <div className="col-lg-2">
                                                            <h5 className='txt txxt'>{failedordersdisamount}</h5>
                                                            <p className='head-value head-color' >{data.disAmt}</p>
                                                        </div>
                                                    </div>
                                                    <div className="row weak justify-content-end pb-0 mbm-10">
                                                        <div className="col-lg-2">
                                                            <h4 className="card-title order-details">{failedorderssuborderid}</h4>
                                                            <p className='head-value head-color' >{data.suborderid}</p>
                                                        </div>
                                                        <div className="col-lg-2">
                                                            <h4 className="card-title order-details">{failedordersreferenceid}</h4>
                                                            <p className='head-value head-color' >{data.referenceid}</p>
                                                        </div>
                                                        <div className="col-lg-2">
                                                            <h4 className="card-title order-details">{failedorderssuborderstatus}</h4>
                                                            <span className={data.suborderstatusclassname}>{data.suborderstatus}</span>
                                                        </div>
                                                        <div className="col-lg-2">
                                                            <h4 className="card-title order-details">{failedordersqty}</h4>
                                                            <p className='head-value head-color' >{data.quantity}</p>
                                                        </div>
                                                        <div className="col-lg-2">
                                                            <h4 className="card-title order-details">{failedordersamount}</h4>
                                                            <p className='head-value head-color' >{data.amounttotal}</p>
                                                        </div>
                                                        <div className="col-lg-2">
                                                            <a href="#" className={data.classname}>{data.reprocess}</a>
                                                        </div>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                    {customerDetail.map((data) => (
                                        <div className="card-body p-0 main">
                                            <div className="d-flex justify-content-between weak">
                                                <div className="1st">
                                                    <h6>{failedordersid}</h6>
                                                    <p className='head-value head-color' >{data.orderid}</p>
                                                </div>
                                                <div className="1st">
                                                    <h6>{failedordersname}</h6>
                                                    <p className='head-value head-color' >{data.name}</p>
                                                </div>
                                                <div className="1st">
                                                    <h6>{failedordersemail}</h6>
                                                    <p className='head-value head-color' >{data.email}</p>
                                                </div>
                                                <div className="1st">
                                                    <h6>{failedordersmobile}</h6>
                                                    <p className='head-value head-color' >{data.mobile}</p>
                                                </div>
                                                <div className="1st">
                                                    <h6>{failedorderscartvalue}</h6>
                                                    <p className='head-value head-color' >{data.cartvalue}</p>
                                                </div>
                                                <div className="1st">
                                                    <h6>{failedordersorderstatus}</h6>
                                                    <span className="btn btn-danger btn-xxs">{data.orderstatus}</span>
                                                </div>
                                                <div className="1st">
                                                    <a href="#" className="btn btn-primary btn-sm float-right bttn ">Re - Process</a>
                                                </div>
                                            </div>
                                            <div className="d-flex justify-content-between weak1">
                                                <div className="1st">
                                                    <h6>{failedordersdate}</h6>
                                                    <p className='head-value head-color' >{data.date}</p>
                                                </div>
                                                <div className="1st">
                                                    <h6>{failedordersamount}</h6>
                                                    <p className='head-value head-color' >{data.orderamount}</p>
                                                </div>
                                                <div className="1st">
                                                    <h6>{failedorderspaymentid}</h6>
                                                    <p className='head-value head-color' >{data.paymentid}</p>
                                                </div>
                                                <div className="1st">
                                                    <h6>{failedorderspoints}</h6>
                                                    <p className='head-value head-color' >{data.points}</p>
                                                </div>
                                                <div className="1st">
                                                    <h6>{failedorderspaidamount}</h6>
                                                    <p className='head-value head-color'>{data.paidamount}</p>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                    <div className="card-body theorder">
                                        {productDetail1.map((data) => (
                                            <div>
                                                <div className="row">
                                                    <div className="col-lg-1">
                                                        <h5 className='txt txxt'>{failedorderssno}</h5>
                                                        <p className='head-value head-color' >{data.sno}</p>
                                                    </div>
                                                    <div className="col-lg-3">
                                                        <h5 className='txt txxt'>{failedordersbrandname}</h5>
                                                        <p className='head-value head-color' >{data.brandName}</p>
                                                    </div>
                                                    <div className="col-lg-3">
                                                        <h5 className='txt txxt'>{failedordersfacevalue}</h5>
                                                        <p className='head-value head-color' >{data.faceValue}</p>
                                                    </div>
                                                    <div className="col-lg-1">
                                                        <h5 className='txt txxt'>{failedordersqty}</h5>
                                                        <p className='head-value head-color' >{data.qty}</p>
                                                    </div>
                                                    <div className="col-lg-2">
                                                        <h5 className='txt txxt'>{failedorderssku}</h5>
                                                        <p className='head-value head-color' >{data.sku}</p>
                                                    </div>
                                                    <div className="col-lg-2">
                                                        <h5 className='txt txxt'>{failedordersdisamount}</h5>
                                                        <p className='head-value head-color' >{data.disAmt}</p>
                                                    </div>
                                                </div>
                                                <div className="row">
                                                    <div className="col-lg-1">
                                                        <h5 className='txt txxt'>{failedorderssno}</h5>
                                                        <p className='head-value head-color' >{data.sno}</p>
                                                    </div>
                                                    <div className="col-lg-3">
                                                        <h5 className='txt txxt'>{failedordersbrandname}</h5>
                                                        <p className='head-value head-color' >{data.brandName}</p>
                                                    </div>
                                                    <div className="col-lg-3">
                                                        <h5 className='txt txxt'>{failedordersfacevalue}</h5>
                                                        <p className='head-value head-color' >{data.faceValue}</p>
                                                    </div>
                                                    <div className="col-lg-1">
                                                        <h5 className='txt txxt'>{failedordersqty}</h5>
                                                        <p className='head-value head-color' >{data.qty}</p>
                                                    </div>
                                                    <div className="col-lg-2">
                                                        <h5 className='txt txxt'>{failedorderssku}</h5>
                                                        <p className='head-value head-color' >{data.sku}</p>
                                                    </div>
                                                    <div className="col-lg-2">
                                                        <h5 className='txt txxt'>{failedordersdisamount}</h5>
                                                        <p className='head-value head-color' >{data.disAmt}</p>
                                                    </div>
                                                </div>
                                                <div className="row weak justify-content-end pb-0 mbm-10">
                                                    <div className="col-lg-2">
                                                        <h4 className="card-title order-details">{failedorderssuborderid}</h4>
                                                        <p className='head-value head-color' >{data.suborderid}</p>
                                                    </div>
                                                    <div className="col-lg-2">
                                                        <h4 className="card-title order-details">{failedordersreferenceid}</h4>
                                                        <p className='head-value head-color' >{data.referenceid}</p>
                                                    </div>
                                                    <div className="col-lg-2">
                                                        <h4 className="card-title order-details">{failedorderssuborderstatus}</h4>
                                                        <span className={data.suborderstatusclassname}>{data.suborderstatus}</span>
                                                    </div>
                                                    <div className="col-lg-2">
                                                        <h4 className="card-title order-details">{failedordersqty}</h4>
                                                        <p className='head-value head-color' >{data.qty}</p>
                                                    </div>
                                                    <div className="col-lg-2">
                                                        <h4 className="card-title order-details">{failedordersamount}</h4>
                                                        <p className='head-value head-color' >{data.amount}</p>
                                                    </div>
                                                    <div className="col-lg-2">
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
            </div>
        </>
    )
}

export default FailedOrders