import React,{useState,useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import OfferMasterForm from './OfferMasterForm';
import ReactPaginate from "react-paginate";
import img from "../../Assets/img/pizz1.jpg";
import { GetTranslationData } from '../../Components/GetTranslationData/GetTranslationData ';
import NoRecord from '../../Components/NoRecord/NoRecord';
import Button from '../../Components/Button/Button';
import { onGetOfferMaster } from '../../Store/Slices/offerMasterSlice';

const OfferMasterList = () =>{
    const [page, setPage] = useState(1);
    
    const [rowsPerPage] = useState(5);
    const dispatch=useDispatch();
    const startIndex = (page - 1) * rowsPerPage;
    const endIndex = startIndex + rowsPerPage;
    const getOfferMasterData = useSelector((state) => state.offerMasterReducer);
    console.log("getOfferMasterData", getOfferMasterData);
    const handlePageChange = (selected) => {
        setPage(selected.selected + 1);
    };
    let filteredOfferMasterList;
console.log(filteredOfferMasterList,"filteredOfferMasterList");
    useEffect(()=>{
         filteredOfferMasterList = Array.isArray(getOfferMasterData?.getData)
        ? getOfferMasterData?.getData.filter((item) =>
            Object.values(item).some((value) => value && typeof value === "string"))
        : [];
        debugger
    }, [getOfferMasterData?.getData])

    
    

    useEffect(()=>{
        dispatch(onGetOfferMaster());
    },[])
   
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
                                    {console.log('filteredOfferMasterList', filteredOfferMasterList)}
                                {filteredOfferMasterList && filteredOfferMasterList?.length > 0 ? ( 
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
                                            {filteredOfferMasterList.slice(startIndex, endIndex).map((data) => (
                                              <tr key={data.id}>
                                                <td><img src={data.img} style={{ width: '50px' }}/></td>
                                                <td>{data.title}</td>
                                                <td>{data.subtitle}</td>
                                                <td>{data.link}</td>
                                                <td>{data.displayOrder}</td>
                                                <td>{data.status}</td>
                                                <td><Button className="btn btn-primary shadow btn-xs sharp me-1"
                                                /></td>
                                              </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                    {filteredOfferMasterList.length > 5 && (
                                    <div className="pagination-container">
                                        <ReactPaginate
                                           previousLabel={"<"}
                                           nextLabel={" >"}
                                           breakLabel={"..."}
                                           pageCount={Math.ceil(
                                            filteredOfferMasterList.length / rowsPerPage)}
                                           marginPagesDisplayed={2}
                                           onPageChange={handlePageChange}
                                           containerClassName={"pagination"}
                                           activeClassName={page === 1 && "active"}
                                           initialPage={page - 1}
                                           previousClassName={page === 1 ? "disabled" : ""}
                                        />
                                    </div>
                                    )}
                                </div>
                                ):(
                                    <NoRecord/>
                                )}
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