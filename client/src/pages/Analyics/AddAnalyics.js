import React, { useState } from "react";
import "../modal.css";
import axios from "axios";
import { toast } from "react-toastify";
import { Box } from "@mui/material";
import Header from "../../components/Header";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { useNavigate } from "react-router-dom";

export const AddAnalyics = () => {
  const [title, setTitle] = useState("");
  const [type, setType] = useState("");
  const navigate = useNavigate();

  const addNewAnalyics = async (e) => {
    try {
      if (title === "") {
        toast.error("برجاء اضافه اسم عمليه ");
      } else if (type === "") {
        toast.error("برجاء اضافه نوع العمليه ");
      } else {
        e.preventDefault();
        const res = await axios.post("https://api.albahren.com/api/analyics", {
          title,
          type,
        });
        res.status === 200 && toast.success("تم اضافه العمليه بنجاح");
        navigate("/analyics");
        res.status === 500 && toast.error("حدث خطأ ما");
      }
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <Box className="main-marg">
      <Box className="headerBox">
        <Header title={"إضافه تقرير"} subtitle="" />
      </Box>
      <div className="addWrapper">
        <div className="inputContainer">
          <label htmlFor="title">العمليه</label>
          <input
            name="title"
            placeholder="ادخل اسم العمليه"
            type="text"
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div className="inputContainer">
          <label>نوع العمليه</label>
          <div className="dropdown">
            <button
              className="dropdownFlexBtn"
              type="button"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              {type === "" ? (
                <>
                  <p>نوع العمليه</p>
                  <KeyboardArrowDownIcon className="icon" />
                </>
              ) : type === "sarf" ? (
                "شبكات صرف صحي"
              ) : (
                "شبكات مياه"
              )}
            </button>
            <ul class="dropdown-menu">
              <li onClick={(e) => setType("sarf")}>شبكات صرف صحي</li>
              <li onClick={(e) => setType("water")}>شبكات مياه</li>
            </ul>
          </div>
        </div>
        <div className="inputButtons">
          <button className="doneBtn" onClick={addNewAnalyics}>
            أضافه
          </button>
        </div>
      </div>
    </Box>
  );
};
