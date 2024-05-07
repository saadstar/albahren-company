import React, { useState} from 'react';
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { Box } from "@mui/material";
import Header from "../../components/Header";

export const AddFunderCompany = () => {
    const [companyName, setCompanyName] = useState("");
    const navigate = useNavigate("");

  const postCompanyName = async (e) => {
    try {
      e.preventDefault();
      if (companyName === "") {
        toast.error("برجاء ادخال اسم الشركه ")
      } else {
        const res = await axios.post(
          "https://api.albahren.com/api/funderCompany",
          {
            companyName,
          }
        );
        res.status === 200 && toast.success("تم اضافه الممول بنجاح");
        navigate("/funders");
      }
    } catch (err) {
      console.log(err);
    }
  };
  return (
     <Box className="main-marg">
      <Box className="headerBox">
        <Header title={"إضافه شركه تمويل"} subtitle="" />
      </Box>
      <div className="addWrapper">
        <div class="inputContainer">
          <label htmlFor="funder"> اسم الممول:</label>
          <input
            name="funder"
            onChange={(e) => setCompanyName(e.target.value)}
            placeholder="اسم الشركه المموله"
          />
        </div>
        <div className="inputButtons">
          <button className="doneBtn" onClick={postCompanyName}>
            إضافه
          </button>
          <button className="cancelBtn" onClick={() => navigate("/funders")}>
            اغلاق
          </button>
        </div>
      </div>
    </Box>
  )
}
