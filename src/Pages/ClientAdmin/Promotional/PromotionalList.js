import React, { useEffect, useState } from 'react';
import PromotionalForm from './PromotionalForm';
import { GetTranslationData } from '../../../Components/GetTranslationData/GetTranslationData ';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { onUpdatePromotional } from '../../../Store/Slices/ClientAdmin/promotionalSlice';
import NoRecord from '../../../Components/NoRecord/NoRecord';
import Loader from '../../../Components/Loader/Loader';
import ReactPaginate from 'react-paginate';
import InputField from '../../../Components/InputField/InputField';
import Button from '../../../Components/Button/Button';
import { CSVLink } from 'react-csv';

const PromotionalList = () => {
    const allocateBrands = GetTranslationData("UIClient", "allocateBrands");
    const disabled_Text = GetTranslationData("UIAdmin", "disabled_Text");
    const searchLabel = GetTranslationData("UIAdmin", "search_here_label");
    const link_text = GetTranslationData("UIClient", "link_text");
    const link_label = GetTranslationData("UIClient", "link_label");
    const actionLabel = GetTranslationData("UIClient", "actionLabel");
    const active = GetTranslationData("UIAdmin", "active");
    const nonActive = GetTranslationData("UIAdmin", "nonActive");
    const client_label = GetTranslationData("UIAdmin", "client_label");
    const title_Text = GetTranslationData("UIAdmin", "title_Text");
    const Status_label = GetTranslationData("UIAdmin", "Status_label");
    const startDate = GetTranslationData("UIAdmin", "startDate");
    const endDate = GetTranslationData("UIAdmin", "endDate");
    const export_btn_Text = GetTranslationData("UIAdmin", "export_btn_Text");
    const promotional_List = GetTranslationData("UIAdmin", "promotional_List");
    const promotionalList = useSelector((state) => state.promotionalReducer);
    const clientList = useSelector((state) => state.clientMasterReducer.clientData);
    const dispatch = useDispatch();
    const [page, setPage] = useState(0);
    const [searchQuery, setSearchQuery] = useState("");
    const [rowsPerPage] = useState(5);
    const [prefilledValues, setPrefilledValues] = useState();
    const [isDelete, setIsDelete] = useState(false);

    const handleEdit = (data) => {
        const prefilled = data;
        setPrefilledValues(prefilled);
    };
    const handleDelete = (data) => {
        const deletedData = {
            ...data,
            deleted: true,
        };
        setIsDelete(true);
        dispatch(onUpdatePromotional(deletedData));
    };


    const handlePageChange = (selected) => {
        setPage(selected.selected);
    };
    // here get client name by match with id
    const getNameById = (id) => {
        const result =
            Array.isArray(clientList) && clientList?.find((item) => item?.id === id);
        return result ? result?.name : "";
    };
    const filteredCategoryList = Array.isArray(promotionalList.getData) && promotionalList.getData
        ? promotionalList.getData.filter(
            (item) =>
                Object.values(item).some(
                    (value) =>
                        value &&
                        typeof value === "string" &&
                        value.toLowerCase().includes(searchQuery.toLowerCase())
                ) ||
                getNameById(item.clientId).toString().toLowerCase().includes(searchQuery)
        )
        : [];
    const displayedItems = filteredCategoryList.slice(page * rowsPerPage, (page + 1) * rowsPerPage);
    const handleSearch = (e) => {
        setSearchQuery(e.target.value);
        setPage(0);
    };
    useEffect(() => {
        if (filteredCategoryList.length > 0) {
            const totalPages = Math.ceil(filteredCategoryList.length / rowsPerPage);
            if (page >= totalPages && page > 0) {
                setPage(page - 1);
            }
        }
    }, [filteredCategoryList, rowsPerPage, page]);
    const headers = [
        { label: "Client", key: "client" },
        { label: "Title Text", key: "titleText" },
        { label: "Status", key: "status" },
        { label: "Link Text", key: "linkText" },
        { label: "Link", key: "link" },
        { label: "Start Date", key: "startDate" },
        { label: "End Date", key: "endDate" },
    ];
    // excel data to print
    const excelData =
        filteredCategoryList?.map((data) => ({
            client: getNameById(data.clientId),
            titleText: data.titleText,
            status: data.enabled ? active : nonActive,
            linkText: data.linkText,
            link: data.link,
            startDate: data.startDate,
            endDate: data.endDate,
        }));
    return (
        <>
            <PromotionalForm
                prefilledValues={prefilledValues}
                setPrefilledValues={setPrefilledValues}
                isDelete={isDelete}
                setIsDelete={setIsDelete}
            />
            <div className="container-fluid pt-0">
                <div className="row">
                    <div className="col-lg-12">
                        <div className="card">
                            <div className="container-fluid">
                                <div className="d-flex justify-content-between align-items-center mb-4 flex-wrap">
                                    <div className="card-header">
                                        <h4 className="card-title">{promotional_List}</h4>
                                    </div>
                                    <div className="customer-search mb-sm-0 mb-3">
                                        {promotionalList.getData && promotionalList.getData.length > 0 && (
                                            <div className="input-group search-area">
                                                <InputField
                                                    type="text"
                                                    className="form-control only-high"
                                                    placeholder={searchLabel}
                                                    value={searchQuery}
                                                    onChange={handleSearch}
                                                />
                                                <span className="input-group-text">
                                                    <i className="fa fa-search"></i>
                                                </span>
                                            </div>
                                        )}
                                    </div>
                                    <div className="d-flex align-items-center flex-wrap">
                                        {displayedItems &&
                                            displayedItems?.length > 0 && (
                                                <CSVLink
                                                    data={excelData}
                                                    headers={headers}
                                                    filename={"Promotional.csv"}
                                                >
                                                    {filteredCategoryList.length > 0 && (
                                                        <Button
                                                            className="btn btn-primary btn-sm btn-rounded me-3 mb-2"
                                                            text={export_btn_Text}
                                                            icons={"fa fa-file-excel me-2"}
                                                        />
                                                    )}
                                                </CSVLink>
                                            )}
                                    </div>
                                </div>
                            </div>
                            <div className="card-body">
                                {(isDelete ? isDelete : promotionalList?.getLoading) ? (
                                    <div style={{ height: "400px" }}>
                                        <Loader classType={"absoluteLoader"} />
                                    </div>
                                ) : Array.isArray(displayedItems) && displayedItems.length > 0 ? (
                                    <div className="table-responsive">
                                        <table className="table header-border table-responsive-sm">
                                            <thead>
                                                <tr>
                                                    <th>{client_label}</th>
                                                    <th>{title_Text}</th>
                                                    <th>{link_text}</th>
                                                    <th>{link_label}</th>
                                                    <th>{startDate}</th>
                                                    <th>{endDate}</th>
                                                    <th>{Status_label}</th>
                                                    <th>{actionLabel}</th>
                                                    <th></th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {displayedItems.map((item, index) => (
                                                    <tr key={index}>
                                                        <td>{getNameById(item.clientId)}</td>
                                                        <td>{item.titleText}</td>
                                                        <td>{item.linkText}</td>
                                                        <td>{item.link}</td>
                                                        <td>{item.startDate}</td>
                                                        <td>{item.endDate}</td>
                                                        <td><span className={`badge badge-${item.enabled === true ? 'success' : 'danger'}`}>{(item.enabled === true) ? active : nonActive}</span></td>
                                                        <td>
                                                            <div className="d-flex">
                                                                <Link className="btn btn-primary shadow btn-xs sharp me-1" onClick={() => handleEdit(item)}><i className="fas fa-pencil-alt"></i></Link>
                                                                <Link className="btn btn-danger shadow btn-xs sharp" onClick={() => handleDelete(item)}><i className="fa fa-trash"></i></Link>
                                                            </div>
                                                        </td>
                                                        <td>
                                                            <Link
                                                                to="/lc-admin/promotional-allocate-brand"
                                                                className="allocateBtn btn btn-primary btn-sm float-right font-size"
                                                                state={{ id: item.clientId ,promotionalId:item?.id }}
                                                            >
                                                                <i className="fa fa-plus mr-2"></i>
                                                                {allocateBrands}
                                                            </Link>
                                                        </td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                        {filteredCategoryList.length > rowsPerPage && (
                                            <div className="pagination-container">
                                                <ReactPaginate
                                                    previousLabel={"<"}
                                                    nextLabel={">"}
                                                    breakLabel={"..."}
                                                    pageCount={Math.ceil(filteredCategoryList.length / rowsPerPage)}
                                                    marginPagesDisplayed={2}
                                                    onPageChange={handlePageChange}
                                                    containerClassName={"pagination"}
                                                    activeClassName={"active"}
                                                    forcePage={page}
                                                    previousClassName={page === 0 ? disabled_Text : ""}
                                                />
                                            </div>
                                        )}
                                    </div>
                                ) : (
                                    <NoRecord />
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default PromotionalList;
