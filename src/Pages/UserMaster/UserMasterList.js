import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { onGetUser } from "../../Store/Slices/userMasterSlice";
import UserMasterForm from "./UserMasterForm";
import { GetTranslationData } from "../../Components/GetTranslationData/GetTranslationData ";
import NoRecord from "../../Components/NoRecord/NoRecord";
import Loader from "../../Components/Loader/Loader";
import ReactPaginate from "react-paginate";
import Button from "../../Components/Button/Button";

const UserMasterList = () => {
  const [page, setPage] = useState(1); // Current page
  const [rowsPerPage] = useState(5);

  const dispatch = useDispatch();
  const [prefilledValues, setPrefilledValues] = useState();
  useEffect(() => {
    dispatch(onGetUser());
  }, []);
  const UserList = GetTranslationData("UIAdmin", "User_list_label");
  const roleName = GetTranslationData("UIAdmin", "role_name_label");
  const email = GetTranslationData("UIAdmin", "email_label");
  const mobile = GetTranslationData("UIAdmin", "mobile_label");
  const username = GetTranslationData("UIAdmin", "usernamee_label");
  const clients = GetTranslationData("UIAdmin", "clients_name_label");
  const action = GetTranslationData("UIAdmin", "action_label");
  const not_Found = GetTranslationData("UIAdmin", "not_Found");
  const userList = useSelector((state) => state.userMasterReducer);
  const client = useSelector((state) => state.clientMasterReducer.data);
  const loading = useSelector((state) => state.userMasterReducer.isLoading);
  const roleList = useSelector(
    (state) => state.userRoleReducer?.userRoleData?.data
  );
  const handleEdit = (data) => {
    const prefilled = data;
    setPrefilledValues(prefilled);
  };
  const startIndex = (page - 1) * rowsPerPage;
  const endIndex = startIndex + rowsPerPage;
  const handlePageChange = (selected) => {
    setPage(selected.selected + 1);
  };
  // here get role name by match with id
  const getNameById = (id) => {
    const result = roleList?.find((item) => item.id === id);
    return result ? result.name : not_Found;
  };

  // here get client name by matching with id
  function getClientByIndex(data, client) {
    const result = [];
    if (Array.isArray(data)) {
      client.forEach((index) => {
        const numericIndex = parseInt(index, 10);
        const item = data.find((entry) => entry && entry.id === numericIndex);

        if (item) {
          result.push(item.name);
        }
      });
    }
    return result;
  }

  return (
    <>
      <UserMasterForm
        prefilledValues={prefilledValues}
        setPrefilledValues={setPrefilledValues}
      />
      <div className="container-fluid pt-0">
        <div className="row">
          <div className="col-lg-12">
            <div className="card">
              <div className="card-header">
                <h4 className="card-title">{UserList}</h4>
              </div>
              {loading ? (
                <div style={{ height: "400px" }}>
                  <Loader classNameType={"absoluteLoader"} />
                </div>
              ) : Array.isArray(userList?.getData) &&
                userList?.getData?.length > 0 ? (
                <div className="card-body">
                  <div className="table-responsive">
                    <table className="table header-border table-responsive-sm">
                      <thead>
                        <tr>
                          <th>{roleName}</th>
                          <th>{email}</th>
                          <th>{mobile}</th>
                          <th>{username}</th>
                          <th>{clients}</th>
                          <th>{action}</th>
                        </tr>
                      </thead>
                      <tbody>
                        {userList?.getData
                          ?.slice(startIndex, endIndex)
                          .map((item, index) => (
                            <tr key={index}>
                              <td>{getNameById(item.adminRoleId)}</td>
                              <td>{item.email}</td>
                              <td>{item.mobile}</td>
                              <td>{`${item.firstName}${item.lastName}`}</td>
                              <td>
                                {Array.isArray(item.accessClientIds) &&
                                  item.accessClientIds.length > 0 && (
                                    <div className="d-flex">
                                      {item.accessClientIds.map(
                                        (clientId, index) => (
                                          <span
                                            key={index}
                                            className="badge badge-secondary mr-10"
                                          >
                                            {getClientByIndex(client, [
                                              clientId,
                                            ])}
                                          </span>
                                        )
                                      )}
                                    </div>
                                  )}
                              </td>
                              <td>
                                <Button
                                  className="btn btn-primary shadow btn-xs sharp me-1"
                                  onClick={() => handleEdit(item)}
                                  icon={"fas fa-pencil-alt"}
                                />
                              </td>
                            </tr>
                          ))}
                      </tbody>
                    </table>
                    <div className="pagination-container">
                      <ReactPaginate
                        previousLabel={"<"}
                        nextLabel={" >"}
                        breakLabel={"..."}
                        pageCount={Math.ceil(
                          userList?.getData?.data?.length / rowsPerPage
                        )}
                        marginPagesDisplayed={2}
                        onPageChange={handlePageChange}
                        containerClassName={"pagination"}
                        activeClassName={"active"}
                        initialPage={page - 1} // Use initialPage instead of forcePage
                      />
                    </div>
                  </div>
                </div>
              ) : (
                <NoRecord />
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default UserMasterList;
