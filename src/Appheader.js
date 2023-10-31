/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";

const Appheader = () => {
  const navigate = useNavigate();
  const [displayUsername, setdisplayUsername] = useState();

  useEffect(() => {
    let id = sessionStorage.getItem("id");
    if (id === "" || id === null) {
      navigate("/login");
    } else {
      setdisplayUsername(id);
    }
  
  }, []);

  const location = useLocation();

  if (location.pathname === "/" || location.pathname === "/employee/create") {
    return (
      <div className="header">
        <div className="left-section">
          <Link className="btn btn-dark" to={"/"}>
            Home
          </Link>
        </div>

        <div className="right-section">
          <span className="mx-2 text-white">
            Welcome <b>{displayUsername}</b>
          </span>
          <Link className="btn btn-primary" to={"/login"}>
            Logout
          </Link>
        </div>
      </div>
    );
  } else {
    return null; 
  }
};

export default Appheader;
