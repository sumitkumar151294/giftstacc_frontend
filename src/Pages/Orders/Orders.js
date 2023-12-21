import React from "react";
import { GetTranslationData } from '../../Componenets/GetTranslationData/GetTranslationData ';
import './Orders.scss'

const Orders = () => {

    const data = [
        {
            supplier: 'abc',
            brand: 'amazon',
            vouchers: '2',
            amount: '₹1000',
            margin: '5%',
            marginvalue: '₹50'
        },
        {
            supplier: 'def',
            brand: 'flipcart',
            vouchers: '3',
            amount: '₹5000',
            margin: '10%',
            marginvalue: '₹100'
        },
        {
            supplier: 'ghi',
            brand: 'ajio',
            vouchers: '4',
            amount: '₹2000',
            margin: '15%',
            marginvalue: '₹150'
        },
        {
            supplier: 'jkl',
            brand: 'myntra',
            vouchers: '5',
            amount: '₹3000',
            margin: '20%',
            marginvalue: '₹200'
        },
    ]

    const orders = GetTranslationData("UIAdmin", "orders");
    const supplier = GetTranslationData("UIAdmin", "supplier");
    const client = GetTranslationData("UIAdmin", "client");
    const date = GetTranslationData("UIAdmin", "date");
    const ordersupplier = GetTranslationData("UIAdmin", "ordersupplier");
    const orderbrand = GetTranslationData("UIAdmin", "orderbrand");
    const ordervouchers = GetTranslationData("UIAdmin", "ordervouchers");
    const orderamount = GetTranslationData("UIAdmin", "orderamount");
    const ordermargin = GetTranslationData("UIAdmin", "ordermargin");
    const ordermarginvalue = GetTranslationData("UIAdmin", "ordermarginvalue");
    return (
        <div class='content-body'>
            <div class="container-fluid">
                <div class="row">
                    <div class="col-xl-12 col-xxl-12">
                        <div class="card">
                            <div class="container-fluid">
                                <div class="d-flex justify-content-between align-items-center mb-4 flex-wrap">
                                    <div class="card-header">
                                        <h4 class="card-title">{orders}</h4>
                                    </div>
                                    <div class="customer-search mb-sm-0 mb-3">
                                        <div class="input-group search-area">
                                            <input type="text" class="form-control only-high" placeholder="Search here......" />
                                            <span class="input-group-text"><a href="javascript:void(0)"><i class="flaticon-381-search-2"></i></a></span>
                                        </div>
                                    </div>
                                    <div class="d-flex align-items-center flex-wrap">
                                        <a href="javascript:void(0);" class="btn btn-primary btn-sm btn-rounded me-3 mb-2"><i class="fa fa-file-excel me-2"></i>Export</a>
                                    </div>
                                </div>
                            </div>
                            <div class="container-fluid">
                                <div class="d-flex justify-content-between align-items-center mb-4 flex-wrap">
                                    <div class="col-sm-3 form-group mb-2">
                                        <label for="name-f">{supplier}</label>
                                        <select class="form-select" aria-label="Default select example">
                                            <option selected>Select</option>
                                            <option value="First Client">All</option>
                                            <option value="First Client">Quicksilver</option>
                                            <option value="Second Client">Supplier 2</option>
                                            <option value="Third Client">Supplier 3</option>
                                        </select>
                                    </div>
                                    <div class="col-sm-3 form-group mb-2">
                                        <label for="name-f">{client}</label>
                                        <select class="form-select" aria-label="Default select example">
                                            <option selected>Select</option>
                                            <option value="First Client">All</option>
                                            <option value="First Client">Client 1</option>
                                            <option value="Second Client">Client 2</option>
                                            <option value="Third Client">Client 3</option>
                                        </select>
                                    </div>
                                    <div class="col-xl-3">
                                        <div class="example">
                                            <p class="mb-1">{date}</p>
                                            <input type="text" class="form-control input-daterange-timepicker" name="daterange" value="01/01/2015 1:30 PM - 01/01/2015 2:00 PM" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="card-body">
                                <div class="table-responsive">
                                    <table class="table header-border table-responsive-sm">
                                        <thead>
                                            <tr>
                                                <th>{ordersupplier}</th>
                                                <th>{orderbrand}</th>
                                                <th>{ordervouchers}</th>
                                                <th>{orderamount}</th>
                                                <th>{ordermargin}</th>
                                                <th>{ordermarginvalue}</th>
                                            </tr>
                                        </thead>
                                        {data.map((data) => (
                                            <tbody>
                                                <tr>
                                                    <td>{data.supplier}
                                                    </td>                                                <td>{data.brand}<a href="javascript:void();"></a>
                                                    </td>
                                                    <td>{data.vouchers}</td>
                                                    <td> {data.amount}
                                                    </td>
                                                    <td>{data.margin}</td>
                                                    <td>{data.marginvalue}
                                                    </td>
                                                </tr>
                                            </tbody>
                                        ))}
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Orders;
