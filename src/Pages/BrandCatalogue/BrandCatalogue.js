import React from 'react'
import { Link } from 'react-router-dom';
import img from '../../Assets/img/pizz1.jpg'
const BrandCatalogue = () => {
    const brandData = [
        {
            image: '../../Assets/img/pizz1.jpg',
            sku: '51246',
            name: 'Amazon Pay1',
            minprice: '₹ 100',
            maxprice: '₹ 600',
            price: 'Range1',
            action: '/LC-admin/productdetail'
        },
        {
            image: '../../Assets/img/pizz1.jpg',
            sku: '51247',
            name: 'Amazon Pay2',
            minprice: '₹ 200',
            maxprice: '₹ 700',
            price: 'Range2',
            action: '/LC-admin/productdetail'
        },
        {
            image: '../../Assets/img/pizz1.jpg',
            sku: '51248',
            name: 'Amazon Pay3',
            minprice: '₹ 300',
            maxprice: '₹ 800',
            price: 'Range3',
            action: '/LC-admin/productdetail'
        },
        {
            image: '../../Assets/img/pizz1.jpg',
            sku: '51249',
            name: 'Amazon Pay4',
            minprice: '₹ 400',
            maxprice: '₹ 900',
            price: 'Range4',
            action: '/LC-admin/productdetail'
        }
    ]
    return (
        <>
            <div class="content-body">
                <div class="container-fluid">
                    <div class="row">
                        <div class="col-xl-12 col-xxl-12">
                            <div class="card">
                                <div class="container-fluid">
                                    <div class="d-flex justify-content-between align-items-center mb-4 flex-wrap">
                                        <div class="card-header">
                                            <h4 class="card-title">Brand Catalogue</h4>
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
                                            <label for="name-f">Supplier</label>
                                            <select class="form-select" aria-label="Default select example">
                                                <option selected>Select</option>
                                                <option value="First Client">All</option>

                                                <option value="First Client">Quicksilver</option>
                                                <option value="Second Client">Supplier 2</option>
                                                <option value="Third Client">Supplier 3</option>
                                            </select>
                                        </div>
                                        <div class="col-sm-3 form-group mb-2">
                                            <label for="name-f">Client</label>
                                            <select class="form-select" aria-label="Default select example">
                                                <option selected>Select</option>
                                                <option value="First Client">All</option>
                                                <option value="First Client">Client 1</option>
                                                <option value="Second Client">Client 2</option>
                                                <option value="Third Client">Client 3</option>
                                            </select>
                                        </div>
                                    </div>
                                </div>
                                <div class="card-body">
                                    <div class="table-responsive">
                                        <table class="table header-border table-responsive-sm">
                                            <thead>
                                                <tr>
                                                    <th>Image</th>
                                                    <th>SKU</th>
                                                    <th>Name</th>
                                                    <th>Min Price</th>
                                                    <th>Max Price</th>
                                                    <th>Price</th>
                                                    <th>Action</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {brandData.map((data) => (
                                                    <tr>
                                                        <td><img src={img}

                                                            style={{ width: '50px' }}
                                                        /><br />
                                                        </td>
                                                        <td>{data.sku}<a href="javascript:void();"></a>
                                                        </td>
                                                        <td>{data.name}</td>
                                                        <td>{data.minprice}
                                                        </td>
                                                        <td>{data.maxprice}</td>
                                                        <td>{data.price}</td>
                                                        <td> <Link to={data.action} href="productdetail.html" class="btn btn-primary btn-sm bttn float-right"><i class="fa fa-info"></i>&nbsp;Brand Detail</Link>
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
            </div>
        </>
    )
}

export default BrandCatalogue