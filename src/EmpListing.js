import axios from "axios";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const EmpListing = () => {
  const navigate = useNavigate();

  const LoadDetail = (id) => {
    navigate("/employee/details/" + id);
  };
  const LoadEdit = (empid) => {
    navigate("/employee/edit/" + empid);
  };

  function Removefunction(id) {
    const conf = window.confirm("Are you sure you want to remove ?");
    if (conf) {
      axios
        .delete("http://localhost:3031/user/" + id)
        .then((res) => {
          toast.error("employee deleted successfully");
          window.location.reload();
        })
        .catch((err) => console.log(err));
    }
  }

  const [columns, setColumns] = useState([]);
  const [records, setRecords] = useState([]);

  const [permissions, setPermissions] = useState({
    view: false,
    add: false,
    edit: false,
    delete: false,
  });

  useEffect(() => {
   
    axios
      .get("http://localhost:3031/user")
      .then((res) => {
        setColumns(Object.keys(res.data[0]));
        setRecords(res.data);
        GetUserAccess();
        
      })
      .catch((err) => console.log(err));
  }, []);

  const GetUserAccess = () => {
    const userrole =
      sessionStorage.getItem("userrole") ;
        
        axios
        .get("http://localhost:3035/roleaccess?role=" + userrole + "&menu=employee")
        .then((res) => {
          if (res.data && res.data.length > 0) {
            const access = res.data[0];
            setPermissions({
              view: true,
              add: access.haveadd,
              edit: access.haveedit,
              delete: access.havedelete,
            });
          }
        });
    };
  return (
    <div className="container">
      <div className="card">
        <div className="card-title">
          <h2>Employee Listing</h2>
        </div>

        <div className="card-body">
          <div className="divbtn">
            <Link to={"employee/create"} className="btn btn-outline-success">
              Add New
            </Link>
          </div>
          <div className="table-responsive">
            <table className="table table-bordered ">
              <thead className=" bg-dark text-white">
                <tr>
                  {columns.map((c, i) => (
                    <th className=" bg-dark text-white" key={i}>
                      {c}
                    </th>
                  ))}
                </tr>
              </thead>

              <tbody>
                {records.map((d, i) => (
                  <tr key={i}>
                    <th>{d.id}</th>
                    <td>{d.email}</td>
                    <td>{d.password}</td>
                    <td>{d.fullname}</td>
                    <td>{d.phone}</td>
                    <td>{d.country}</td>
                    <td>{d.gender}</td>
                    <td>{d.address}</td>
                    <td>{d.role}</td>
                    <td>
                      {d.Action}

                      {permissions.edit && (
                        <button
                          onClick={() => {
                            LoadEdit(d.id);
                          }}
                          className="btn btn-success m-2"
                        >
                          Edit
                        </button>
                      )}

                      {permissions.delete && (
                        <button
                          onClick={() => {
                            Removefunction(d.id);
                          }}
                          className="btn btn-danger m-2"
                        >
                          Remove
                        </button>
                      )}

                      <button
                        onClick={() => {
                          LoadDetail(d.id);
                        }}
                        className="btn btn-info m-2"
                      >
                        Details
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmpListing;
