import React, { useState, useEffect } from "react";
import axios from "axios";
import "../modal.css";
import { toast } from "react-toastify";
import { Box } from "@mui/material";
import Header from "../../components/Header";
import { Link, useNavigate } from "react-router-dom";
import ControlPointIcon from "@mui/icons-material/ControlPoint";

export const AddStore = () => {
  const [previews, setPreviews] = useState();
  const [file, setFile] = useState(undefined);
  const [name, setName] = useState("");
  const [quantity, setQuantity] = useState(0);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate("");

  const uploadNewStoreItem = async (e) => {
    try {
      e.preventDefault();
      if (name === "") {
        toast.error("رجاء ادخل اسم العنصر");
      } else if (quantity === 0) {
        toast.error("برجاء ادخال الكميه");
      } else if (file === undefined) {
        toast.error("برجاء ادخال البون");
      } else {
        const formData = new FormData();
        formData.append("file", file);
        formData.append("name", name);
        formData.append("exist", 1);
        formData.append("quantity", quantity);
        toast.warn("... برجاء الانتظار ");
        setLoading(true);
        const res = await axios.post(
          "https://api.albahren.com/api/store",
          formData
        );
        res.status === 200 && toast.success("تم اضافه العنصر بنجاح.");
        navigate("/store");
        setLoading(false);
      }
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(
    (e) => {
      const reader = new FileReader();

      reader.onload = () => {
        setPreviews(reader.result);
      };

      if (file) {
        reader.readAsDataURL(file); // Read the image file as a data URL
      }
    },
    [file]
  );
  return (
    <Box className="main-marg">
      <Box className="headerBox">
        <Header
          title={"إضافه عنصر للمخازن"}
          subtitle="تجكم كامل بالمخزن من خلالنا"
        />
      </Box>
      <div className="addWrapper">
        <div className="imgContainer">
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
        </div>
        <div className="inputsContainer">
          <div className="inputContainer">
            <label>اسم العنصر : </label>
            <input
              placeholder="ادخل اسم العنصر"
              type="text"
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="inputContainer">
            <label>الكميه: </label>
            <input
              placeholder="ادخل الكميه"
              type="number"
              onChange={(e) => setQuantity(e.target.value)}
            />
          </div>
        </div>
        <div className="inputButtons">
          <Link to="/store">
            <button className="cancelBtn">إالغاء</button>
          </Link>
          <button className="doneBtn" onClick={uploadNewStoreItem}>
            إضافه
          </button>
        </div>
      </div>
    </Box>
  );
};
