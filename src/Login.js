import axios from "axios";
import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import './App.css';

const Login = () => {
  const [id, setid] = useState("");
  const [password, setpassword] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    sessionStorage.clear();
  }, []);

  const ProceedLogin = (e) => {
    e.preventDefault();
    if (validate()) {
      axios
        .get("http://localhost:3031/user/" + id)
        .then((res) => {
          return res.data;
        })
        .then((resp) => {
          if (Object.keys(resp).length === 0) {
            toast.error("Invalid username or password");
          } else {
            if (resp.password === password) {
              toast.success("Login successful");
              sessionStorage.setItem("id", id);
              sessionStorage.setItem("userrole", resp.role);
              navigate("/");
            } else {
              toast.error("Invalid username or password");
            }
          }
        })
        .catch((err) => {
          toast.error("Login failed");
        });
    }
  };
  const validate = () => {
    let result = true;
    if (id === "" || id === null) {
      result = false;
      toast.warning("please enter username");
    }
    if (password === "" || password === null) {
      result = false;
      toast.warning("please enter password");
    }
    return result;
  };
  return (
    
    <div className="card-container">
        <div className="offset-lg-3 col-lg-6">
          <form className="container " onSubmit={ProceedLogin}>
            <div className="card ">
            <div className="card-blur glass">
              <div className="card-header ">
                <h2 style={{color:"blueviolet"}}>User Login</h2>
              </div>

              <div className="card-body ">
                <div className="form-group ">
                  <label className="input-label ">
                    Username <span className="errmsg">*</span>
                  </label>
                  <input 
                    className="form-control  glass"
                    value={id}
                    onChange={(e) => setid(e.target.value)}
                  />
                </div>
              </div>

              <div className="card-body">
                <div className="form-group">
                  <label className="input-label ">
                    Password <span className="errmsg">*</span>
                  </label>
                  <input
                    className="form-control glass"
                    type="password"
                    value={password}
                    onChange={(e) => setpassword(e.target.value)}
                  />
                </div>
              </div>

              <div className="card-footer">
                <button className="btn text-bg-dark my-2" type="submit" >
                  Login
                </button>
                <div>
                  <Link to="/register" className="btn text-white  " style={{backgroundColor:"blueviolet"}}>
                    Register
                  </Link>
                </div>
                <div>
                  <span className="text-black-50">New user ?</span>
                </div>
              </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    
  );
};

export default Login;
