import React, { useEffect, useState } from 'react'
import InputField from '../../../Components/InputField/InputField';
import Button from '../../../Components/Button/Button';
import { useDispatch, useSelector } from 'react-redux';
import { onGetAllocateBrand, onPostAllocateBrand } from '../../../Store/Slices/ClientAdmin/allocateBrandSlice';
import { ToastContainer } from 'react-toastify';
import ReactPaginate from 'react-paginate';
import { GetTranslationData } from '../../../Components/GetTranslationData/GetTranslationData ';

const AllocateBrand = () => {
    const dispatch = useDispatch();
    const getAllocateBrands = useSelector((state) => state.allocateBrandReducer);
    console.log(getAllocateBrands?.getAllocateBrandData)
    const searchLabel = GetTranslationData("UIAdmin", "search_here_label");
    const [page, setPage] = useState(1);
    const [searchQuery, setSearchQuery] = useState("");
    const [isLoading, setIsLoading] = useState(true);
    const [rowsPerPage] = useState(5);
    const startIndex = (page - 1) * rowsPerPage;
    const endIndex = startIndex + rowsPerPage;
    const handlePageChange = (selected) => {
        setPage(selected.selected + 1);
    };

    const handleSubmit = () => {
        dispatch(onPostAllocateBrand({
            name: "asd"
        }))
    }
    useEffect(() => {
        debugger
        dispatch(onGetAllocateBrand())
    }, [])
    const handleSearch = (e) => {
        setSearchQuery(e.target.value);
        setPage(1);
    };
    useEffect(() => {
        if (getAllocateBrands) {
            const totalItems = getAllocateBrands?.getAllocateBrandData.length;
            const totalPages = Math.ceil(totalItems / rowsPerPage);
            if (page > totalPages && page > 1) {
                setPage(page - 1);
            }
            setIsLoading(false);
        } else {
            setIsLoading(false);
        }
    }, [getAllocateBrands?.getAllocateBrandData]);
    const filteredBrandCatalogueList = Array.isArray(getAllocateBrands)
        ? getAllocateBrands?.getAllocateBrandData.filter((vendor) =>
            Object.values(vendor).some(
                (value) =>
                    value &&
                    typeof value === "string" &&
                    value.toLowerCase().includes(searchQuery.toLowerCase())
            )
        )
        : [];
    return (
        <>
            <div className="container-fluid">

                <div className="row">
                    <div className="col-xl-12 col-xxl-12">
                        <div className="card">
                            <div className="container-fluid pt-1">
                                <div className="d-flex justify-content-between align-items-center mb-4 flex-wrap">
                                    <div className="card-header">
                                        <h4 className="card-title">Allocate Brands</h4>
                                    </div>
                                    <div className="customer-search mb-sm-0 mb-3">
                                        <div className="input-group search-area">
                                            <InputField
                                                type="text"
                                                className="form-control only-high"
                                                placeholder={searchLabel}
                                                value={searchQuery}
                                                onChange={handleSearch}
                                            />                                            <span className="input-group-text"><a href=""><i className="flaticon-381-search-2"></i></a></span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="card-body pt-0 card-body-user">
                                <div className="table-responsive">
                                    <table className="table header-border table-responsive-sm">
                                        <thead>
                                            <tr>
                                                <th>Brands Name</th>
                                                <th>Display Order</th>
                                                <th>Action</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {filteredBrandCatalogueList
                                                .slice(startIndex, endIndex)
                                                .map((data, index) => (
                                                    <>                                  <tr key={index}>

                                                        <td>{data?.sectionName}</td>
                                                        <td>
                                                            <div className="input-group mb-2 w-11">
                                                                <InputField type="number" className="form-control" placeholder="1" pattern="/^-?\d+\.?\d*$/" onKeyPress={(event) => { if (event.target.value.length === 2) return false; }} />
                                                            </div>
                                                        </td>
                                                        <td>
                                                            <div className="can-toggle">
                                                                <InputField id="a" type="checkbox" />
                                                                <label htmlFor="a">
                                                                    <div className="can-toggle__switch" data-checked="On" data-unchecked="Off"></div>
                                                                </label>
                                                            </div>
                                                        </td>
                                                    </tr><tr>
                                                            <td>Flipkart</td>
                                                            <td>
                                                                <div className="input-group mb-2 w-11">
                                                                    <InputField type="number" className="form-control" placeholder="1" pattern="/^-?\d+\.?\d*$/" onKeyPress={(event) => { if (event.target.value.length === 2) return false; }} />
                                                                </div>
                                                            </td>
                                                            <td>
                                                                <div className="can-toggle">
                                                                    <InputField id="a" type="checkbox" />
                                                                    <label htmlFor="a">
                                                                        <div className="can-toggle__switch" data-checked="On" data-unchecked="Off"></div>
                                                                    </label>
                                                                </div>
                                                            </td>
                                                        </tr></>
                                                ))}

                                        </tbody>
                                    </table>
                                    <div className="pagination-container">
                                        <ReactPaginate
                                            previousLabel={"<"}
                                            nextLabel={" >"}
                                            breakLabel={"..."}
                                            pageCount={Math.ceil(getAllocateBrands?.getAllocateBrandData.length / rowsPerPage)}
                                            marginPagesDisplayed={2}
                                            onPageChange={handlePageChange}
                                            containerClassName={"pagination"}
                                            activeClassName={"active"}
                                            initialPage={page - 1} // Use initialPage instead of forcePage
                                            previousClassName={page === 1 ? "disabled" : ""}
                                        />
                                        <ToastContainer />
                                    </div>

                                </div>
                                <Button
                                    text="Submit"
                                    icon={"fa fa-arrow-right"}
                                    className="btn btn-primary float-right pad-aa"
                                    onClick={() => handleSubmit()}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default AllocateBrand