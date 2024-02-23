import React,{useState} from 'react';
import OfferMasterForm from './OfferMasterForm';
import ReactPaginate from "react-paginate";
import img from "../../Assets/img/pizz1.jpg";
import { GetTranslationData } from '../../Components/GetTranslationData/GetTranslationData ';

const OfferMasterList = () =>{
    const [page, setPage] = useState(1);
    const [rowsPerPage] = useState(5);
    const startIndex = (page - 1) * rowsPerPage;
    const endIndex = startIndex + rowsPerPage;

    const handlePageChange = (selected) => {
        setPage(selected.selected + 1);
    };
     
    return(
        <>
            <OfferMasterForm/>
            <div class="container-fluid  pt-0">
                <div class="row">
                   <div class="col-lg-12">
                        <div class="card">
                             <div class="container-fluid">
                               <div class="d-flex justify-content-between align-items-center mb-4 flex-wrap">
                                   <div class="card-header">
                                       <h4 class="card-title">{GetTranslationData("UIClient", "offer_list")}</h4>
                                    </div>
                                </div>                            
                                <div class="card-body">
                                   <div class="table-responsive">
                                        <table class="table header-border table-responsive-sm">
                                           <thead>
                                                <tr>
                                                   <th>{GetTranslationData("UIClient", "image")}</th>
                                                   <th>{GetTranslationData("UIClient", "title")}</th>
                                                   <th>{GetTranslationData("UIClient", "sub-title")}</th>
                                                   <th>{GetTranslationData("UIClient", "link_label")}</th>
                                                   <th>{GetTranslationData("UIClient", "display-order")}</th>
                                                   <th>{GetTranslationData("UIClient", "status")}</th>
                                                   <th>{GetTranslationData("UIClient", "action")}</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                            <tr>
                                                <td><img src={img} style={{ width: '50px' }}/></td>
                                                <td><strong>Get the most out of it</strong>
                                                </td>
                                                <td>we provide the best offer and vouchers</td>
                                                <td>https://demo1.way2webhost.com/LC-user-admin/bannermaster.html
                                                </td>
                                                <td>2</td>
                                              
                                                <td><span class="badge badge-success">{GetTranslationData("UIClient", "active_option")}</span>
                                                </td>
                                                <td><div class="d-flex">
                                                        <a href="#" class="btn btn-primary shadow btn-xs sharp me-1"><i class="fas fa-pencil-alt"></i></a>
                                                        <a href="#" class="btn btn-danger shadow btn-xs sharp"><i class="fa fa-trash"></i></a>
                                                    </div></td>
                                            </tr>
                                             <tr>
                                                <td><img src={img} style={{ width: '50px' }}/></td>
                                                <td><strong>Get the most out of it</strong>
                                                </td>
                                                <td>we provide the best offer and vouchers</td>
                                                <td>https://demo1.way2webhost.com/LC-user-admin/bannermaster.html
                                                </td>
                                                <td>2</td>                                              
                                                <td><span class="badge badge-success">{GetTranslationData("UIClient", "active_option")}</span>
                                                </td>
                                                <td><div class="d-flex">
                                                        <a href="#" class="btn btn-primary shadow btn-xs sharp me-1"><i class="fas fa-pencil-alt"></i></a>
                                                        <a href="#" class="btn btn-danger shadow btn-xs sharp"><i class="fa fa-trash"></i></a>
                                                    </div>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                    <div className="pagination-container">
                                        <ReactPaginate
                                           previousLabel={"<"}
                                           nextLabel={" >"}
                                           breakLabel={"..."}
                                           pageCount=""
                                           marginPagesDisplayed={2}
                                           onPageChange={handlePageChange}
                                           containerClassName={"pagination"}
                                           activeClassName={page === 1 && "active"}
                                           initialPage={page - 1}
                                           previousClassName={page === 1 ? "disabled" : ""}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>        
                </div>
            </div>
        </div>
        </>
    );
}

export default OfferMasterList;