import React, { useState, useContext } from "react";
import { AuthContext } from "./authContext/authContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import "./login.css";
import VisibilityIcon from "@mui/icons-material/Visibility";
import HideSourceIcon from "@mui/icons-material/HideSource";

export default function Login() {
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [passwordType, setPasswordType] = useState(true);
  const { dispatch } = useContext(AuthContext);
  const navigate = useNavigate();
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch({ type: "LOGIN_START" });
    try {
      const res = await axios.post("https://api.albahren.com/api/auth/login", {
        username,
        password,
      });
      dispatch({ type: "LOGIN_SUCCESS", payload: res.data });
      toast.success("مرحباً");
      navigate("/");
    } catch (err) {
      setError("اسم المستخدم او كلمه المرور خطأ");
    }
  };

  return (
    <div className="login">
      <form className="loginForm" onSubmit={handleSubmit}>
        <h1 className="loginTitle">Login</h1>
        <div className="loginInputs">
          <div className="loginBox">
            <input
              type="text"
              placeholder="Username"
              required
              value={username}
              onChange={(e) => setUserName(e.target.value)}
              className="login__input"
            />
          </div>
          <div class="loginBox">
            <input
              type={passwordType === true ? "password" : "text"}
              placeholder="Password"
              required
              class="login__input"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            {passwordType ? (
              <HideSourceIcon
                style={{ cursor: "pointer" }}
                onClick={() => setPasswordType(!passwordType)}
              />
            ) : (
              <VisibilityIcon
                style={{ cursor: "pointer" }}
                onClick={() => setPasswordType(!passwordType)}
              />
            )}
          </div>
        </div>
        <div class="login__check">
          <div class="login__check-box">
            <input
              type="checkbox"
              class="login__check-input"
              defaultChecked={true}
              id="user-check"
            />
            <label htmlFor="user-check" class="login__check-label">
              Remember me
            </label>
          </div>
          <a href="/" class="login__forgot">
            Ask for new Password?
          </a>
        </div>
        <button type="submit" class="login__button">
          Login
        </button>

        {error && <p className="erorrHandle">{error}</p>}
        <div class="login__register">privac Policy!</div>
      </form>
    </div>
  );
}
