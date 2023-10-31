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

  const [haveedit, sethaveedit] = useState(false);
  const [haveview, sethaveview] = useState(false);
  const [haveadd, sethaveadd] = useState(false);
  const [havedelete, sethavedelete] = useState(false);

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
      sessionStorage.getItem("userrole") != null
        ? sessionStorage.getItem("userrole").toString()
        : "";
        
    axios
      .get(
        "http://localhost:3035/roleaccess?role=" + userrole + "&menu=employee"
      )
      .then((res) => {
        if (!res.ok) {
          return false;
        }
        return res.json();
      })
      .then((res) => {
        if (res.length > 0) {
          sethaveview(true);
          let userobj = res[0];
          sethaveedit(userobj.haveedit);
          sethavedelete(userobj.havedelete);
          sethaveadd(userobj.haveadd);
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

                      <button
                        onClick={() => {
                          LoadEdit(d.id);
                        }}
                        className="btn btn-success m-2 "
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => {
                          Removefunction(d.id);
                        }}
                        className="btn btn-danger m-2"
                      >
                        Remove
                      </button>
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
