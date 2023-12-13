import { useEffect, useState } from "react";
import "./ClientList.scss";
import { Link } from "react-router-dom";
import Loader from "../../../Componenets/Loader/Loader";
import NoRecord from "../../../Componenets/NoRecord/NoRecord";
import ClientMasterForm from "../ClientMasterForm/ClientMasterForm";
import { useDispatch, useSelector } from "react-redux";
import { onClientMasterSubmit } from "../../../Store/Slices/clientMasterSlice";
import { CSVLink } from "react-csv";
import { GetTranslationData } from "../../../Componenets/GetTranslationData/GetTranslationData ";
const ClientList = () => {
  const dispatch = useDispatch();
  const [data, setData] = useState();
  const [showLoder, setShowLoader] = useState(false);
  const clientList = useSelector((state) => state.clientMasterReducer.data);
  const [searchQuery, setSearchQuery] = useState("");
  const contactName =GetTranslationData("UIAdmin", "contact_Name_label");
  const searchLabel = GetTranslationData("UIAdmin", "search_here_label");
  const brands = GetTranslationData("UIAdmin", "brands_label");
  const contactNumber=GetTranslationData(
    "UIAdmin",
    "contact_Number_label"
  )
  const email=GetTranslationData(
    "UIAdmin",
    "contact_Email_label"
  )
const clientID=GetTranslationData(
  "UIAdmin",
  "client ID_label"
)
const login=GetTranslationData("UIAdmin", "login_label")
const action=GetTranslationData("UIAdmin", "action_label")
const status=GetTranslationData("UIAdmin", "Status_label")
  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };
  useEffect(() => {
    dispatch(onClientMasterSubmit());
  }, []);
  const handleEdit = (data) => {
    const prefilled = data;
    setData(prefilled);
  };
  const headers = [
    { label: "name", key: "name" },
    { label: "number", key: "number" },
    { label: "email", key: "email" },
    { label: "id", key: "id" },
    { label: "status", key: "status" },
  ];
  const filteredClientList = Array.isArray(clientList)
    ? clientList.filter((vendor) =>
        Object.values(vendor).some(
          (value) =>
            value &&
            typeof value === "string" &&
            value.toLowerCase().includes(searchQuery.toLowerCase())
        )
      )
    : [];
  useEffect(() => {
    setShowLoader(false);
  }, []);
  return (
    <>
      <ClientMasterForm data={data} />
      <div class="container-fluid pt-0">
        <div class="row">
          <div class="col-lg-12">
            <div class="card">
              <div class="container-fluid mt-2 mb-2">
                <div class="d-flex justify-content-between align-items-center mb-4 flex-wrap">
                  <div class="card-header">
                    <h4 class="card-title">
                      {GetTranslationData("UIAdmin", "client List_label")}
                    </h4>
                  </div>
                  <div class="customer-search mb-sm-0 mb-3">
                    <div class="input-group search-area">
                      <input
                        type="text"
                        class="form-control only-high"
                        placeholder={searchLabel}
                        value={searchQuery}
                        onChange={handleSearch}
                      />
                      <span class="input-group-text">
                        <a href="javascript:void(0)">
                          <i class="flaticon-381-search-2"></i>
                        </a>
                      </span>
                    </div>
                  </div>

                  <div class="d-flex align-items-center flex-wrap">
                    {clientList && clientList.length > 0 && (
                      <CSVLink data={clientList} headers={headers}>
                        <button className="btn btn-primary btn-sm btn-rounded me-3 mb-2">
                          <i className="fa fa-file-excel me-2"></i>
                          export
                        </button>
                      </CSVLink>
                    )}
                  </div>
                </div>
              </div>
              <div class="card-body">
                {showLoder ? (
                  <div style={{ height: "400px" }}>
                    <Loader classType={"absoluteLoader"} />
                  </div>
                ) : (
                  <>
                    {Array.isArray(filteredClientList) &&
                    filteredClientList.length > 0 ? (
                      <div class="table-responsive">
                        <table class="table header-border table-responsive-sm">
                          <thead>
                            <tr>
                              <th>
                                {contactName}
                              </th>
                              <th>
                                {contactNumber}
                              </th>
                              <th>
                                {email}
                              </th>
                              <th>
                                {clientID}
                              </th>
                              <th>
                                {status}
                              </th>
                              <th>
                                {action}
                              </th>
                              <th>
                                {login}
                              </th>
                            </tr>
                          </thead>
                          <tbody>
                            {filteredClientList.map((data) => (
                              <tr key={data.id}>
                                <td>
                                  {data.name}
                                  <a href="javascript:void();"></a>
                                </td>
                                <td>{data.number}</td>
                                <td>
                                  <span class="text-muted">{data.email}</span>
                                </td>
                                <td>{data.id}</td>
                                <td>
                                  <span class="badge badge-success">
                                    {data.status}
                                  </span>
                                </td>
                                <td>
                                  <div class="d-flex">
                                    <a
                                      class="btn btn-primary shadow btn-xs sharp me-1"
                                      onClick={() => handleEdit(data)}
                                    >
                                      <i class="fas fa-pencil-alt"></i>
                                    </a>
                                    <a class="btn btn-danger shadow btn-xs sharp">
                                      <i class="fa fa-trash"></i>
                                    </a>
                                  </div>
                                </td>
                                <td>
                                  <Link to="/LC-admin/login">
                                    <a className="btn btn-secondary btn-sm float-right">
                                      <i className="fa fa-user"></i>&nbsp; {login}
                                    </a>
                                  </Link>
                                </td>
                                <td>
                                  <Link
                                    to="/LC-admin/clientbrandlist"
                                    class="btn btn-primary btn-sm float-right"
                                  >
                                    <i class="fa fa-eye"></i>&nbsp;{brands}
                                  </Link>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    ) : (
                      <NoRecord />
                    )}
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ClientList;
