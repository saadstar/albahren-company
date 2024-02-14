import React, { useContext, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../auth/authContext/authContext";
import { toast } from "react-toastify";
import AutoGraphIcon from "@mui/icons-material/AutoGraph";
import SupervisorAccountIcon from "@mui/icons-material/SupervisorAccount";
import AddModeratorIcon from "@mui/icons-material/AddModerator";
import StoreIcon from "@mui/icons-material/Store";
import AirplayIcon from "@mui/icons-material/Airplay";
import PaidIcon from "@mui/icons-material/Paid";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import ArticleIcon from "@mui/icons-material/Article";

export const Navbar = () => {
  const { dispatch, user } = useContext(AuthContext);
  const [isClose, setIsClose] = useState(false);
  const navigate = useNavigate("");

  const logout = async () => {
    try {
      dispatch({ type: "LOGOUT" });
      localStorage.removeItem("user");
      navigate("/");
      toast.error("تم تسجيل الخروج!");
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div className="navBar">
      <div className={isClose === true ? "d-none" : "navBarCloser"}>
        <div className="navd-flex">
          <div className="Navclose close" onClick={() => setIsClose(true)}>
            X
          </div>
          <h2>شركه البحرين للمقاولات</h2>
          <div className="icons">
            <div className="user">
              <span>{user === null ? "User" : `${user.username}`}</span>
            </div>
            {user !== null && (
              <i class="fa-solid fa-right-from-bracket" onClick={logout}></i>
            )}
          </div>
        </div>
      </div>
      <nav class="navbar navbar-expand-lg">
        <div class="container-fluid">
          <button
            class="navbar-toggler text-white bg-white"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation text-white"
          >
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse" id="navbarSupportedContent">
            {user !== null && (
              <div class="navbar-nav  color-light mb-2 mb-lg-0 nAV">               
                  <Link
                    to="/process"
                    style={{ textDecoration: "none", color: "white" }}
                    className="nav-item  d-flex gap-2"
                  >
                    <h2>العمليات</h2>
                    <AirplayIcon className="m-auto" />
                  </Link>
                {user.isAdmin === 1 && (
                  <Link
                    to="/charts"
                    style={{ textDecoration: "none", color: "white" }}
                    className="nav-item d-flex gap-2"
                  >
                    <h2>التحليلات</h2>
                    <AutoGraphIcon className="m-auto" />
                  </Link>
                )}
                {user.isAdmin === 1 && (
                  <Link
                    to="/analyics"
                    style={{ textDecoration: "none", color: "white" }}
                    className="nav-item d-flex gap-2"
                  >
                    <h2>التقارير</h2>
                    <ArticleIcon className="m-auto" />
                  </Link>
                )}
                {user.isAdmin === 1 && (
                  <Link
                    to="/users"
                    style={{ textDecoration: "none", color: "white" }}
                    className="nav-item d-flex gap-2"
                  >
                    <h2>المستخدمين</h2>
                    <SupervisorAccountIcon className="m-auto" />
                  </Link>
                )}
                  <Link
                    to="/store"
                    style={{ textDecoration: "none", color: "white" }}
                    className="nav-item d-flex gap-2"
                  >
                    <h2>المخازن</h2>
                    <StoreIcon className="m-auto" />
                  </Link>
                  <Link
                    to="/save"
                    style={{ textDecoration: "none", color: "white" }}
                    className="nav-item d-flex gap-2"
                  >
                    <h2>الخزنه</h2>
                    <AddModeratorIcon className="m-auto" />
                  </Link>               
                  <Link
                    to="/funders"
                    style={{ textDecoration: "none", color: "white" }}
                    className="nav-item d-flex gap-2"
                  >
                    <h2>الموردين</h2>
                    <PaidIcon className="m-auto" />
                  </Link>
                <Link
                  to="/sallery"
                  style={{ textDecoration: "none", color: "white" }}
                  className="nav-item d-flex gap-1"
                >
                  <h2>المرتبات</h2>
                  <AttachMoneyIcon className="m-auto" />
                </Link>
              </div>
            )}
          </div>
        </div>
      </nav>
    </div>
  );
};
