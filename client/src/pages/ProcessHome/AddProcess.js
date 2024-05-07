import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { Box } from "@mui/material";
import Header from "../../components/Header";

export const AddProcess = () => {
  const navigate = useNavigate("");
  const [title, setTitle] = useState("");

  const addProcess = async (e) => {
    try {
      if (title !== "") {
        const res = await axios.post("https://api.albahren.com/api/process", {
          title,
        });
        if (res?.status === 200) {
          navigate("/");
          toast.success(`تمت اضافه ${res.data.title} بنجاح  `);
        } else {
          toast.error(`!برجاء التحقق من الانترنت`);
        }
      } else {
        toast.error("برجاء اضافه اسم العمليه");
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Box className="main-marg">
      <Box className="headerBox">
        <Header title={"إضافه عمليه"} subtitle="" />
      </Box>
      <div className="addWrapper">
        <div class="inputContainer">
          <label htmlFor="process">أدخل اسم العمليه:</label>
          <input
            name="process"
            onChange={(e) => setTitle(e.target.value)}
            placeholder="استخدم اللغه العربيه"
          />
        </div>
        <div className="inputButtons">
          <button className="doneBtn" onClick={addProcess}>
            إضافه
          </button>
          <button className="cancelBtn" onClick={() => navigate("/process")}>
            اغلاق
          </button>
        </div>
      </div>
    </Box>
  );
};
