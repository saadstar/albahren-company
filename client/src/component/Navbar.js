import { IconButton, useTheme } from "@mui/material";
import { useContext, useState } from "react";
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import LogoutIcon from "@mui/icons-material/Logout";
import "./navBar.css";
import { AuthContext } from "../auth/authContext/authContext";
import { useNavigate } from "react-router-dom";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";

export const Navbar = () => {
  const theme = useTheme();
  const { dispatch } = useContext(AuthContext);
  const navigate = useNavigate("");
  const [isScrolled, setIsScrolled] = useState(false);
  const { user } = useContext(AuthContext);

  window.onscroll = () => {
    setIsScrolled(window.pageYOffset === 0 ? false : true);
    return () => (window.onscroll = null);
  };
  const logouHandler = async (e) => {
    e.preventDefault();
    try {
      dispatch({ type: "LOGOUT" });
      localStorage.removeItem("user");
      navigate("/");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className={isScrolled ? "topBar scrolled" : "topBar"}>
      <div className="topBarWrapper">
        <div className="left">
          <img src={"./images/noimg.png"} alt="username" />
          <div>
            <h6 style={{ marginTop: "0px" }}>{user.username}</h6>
          </div>
          <ArrowForwardIosIcon className="icon" />
        </div>
        <div className="right">
          <IconButton clasName="darkBtn">
            {theme.palette.mode === "dark" ? (
              <DarkModeOutlinedIcon />
            ) : (
              <LightModeOutlinedIcon />
            )}
          </IconButton>
          <div className="langWrapper">
            <p>العربيه</p>
            <KeyboardArrowDownIcon className="icon" />
          </div>
          <IconButton onClick={logouHandler}>
            <LogoutIcon className="logout" />
          </IconButton>
        </div>
      </div>
    </div>
  );
};
