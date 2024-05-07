import React, { useState } from "react";
import Box from "@mui/material/Box";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Header from "../components/Header";

export default function Signup() {
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const clickHandler = async (e) => {
    e.preventDefault();
    try {
      if (username === "") {
        toast.error("برجاء ادخال اسم المستخدم");
      } else if (firstName === "") {
        toast.error("برجاء ادخال الاسم الاول");
      } else if (lastName === "") {
        toast.error("برجاء ادخال الاسم الاخير");
      } else if (password === "") {
        toast.error("برجاء ادخال كلمه المرور");
      } else {
        setLoading(true);
        const res = await axios.post(
          "https://api.albahren.com/api/auth/register",
          {
            username,
            password,
            firstName,
            lastName,
          }
        );
        res.status === 200 && navigate("/users");
        toast.success(" تم انشاء حسابك. ");
        setLoading(false);
      }
    } catch (err) {
      console.log("هناك خطأ ما");
    }
  };
  return (
    <Box className="main-marg">
      <Box className="headerBox">
        <Header title={"إضافه مستخدم جديد"} />
      </Box>
      <div className="addWrapper">
        {/* <div className="imgContainer">
          <label htmlFor="file">
            {file === undefined ? (
              <p>
                <ControlPointIcon />
                إضافه صوره البون
              </p>
            ) : (
              <img src={previews} alt={file.name} className="imageFile" />
            )}
          </label>
          <input
            type="file"
            id="file"
            className="imgUpload"
            onChange={(e) => setFile(e.target.files[0])}
          />
        </div> */}
        <div className="inputsContainer">
          <div className="inputContainer">
            <label> اسم المستخدم : </label>
            <input type="text" onChange={(e) => setUserName(e.target.value)} />
          </div>
          <div className="inputContainer">
            <label>الاسم الاول: </label>
            <input onChange={(e) => setFirstName(e.target.value)} />
          </div>
        </div>
        <div className="inputsContainer">
          <div className="inputContainer">
            <label>كلمه المرور : </label>
            <input
              type="password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="inputContainer">
            <label>الاسم الاخير: </label>
            <input onChange={(e) => setLastName(e.target.value)} />
          </div>
        </div>
        <div className="inputButtons">
          <button className="doneBtn" onClick={clickHandler}>
            {loading === true ? "برجاء الانتظار" : "إضافه"}
          </button>
          <button className="cancelBtn" onClick={() => navigate("/users")}>
            إالغاء
          </button>
        </div>
      </div>
    </Box>
  );
}
