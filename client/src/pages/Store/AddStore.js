import React, { useState } from "react";
import axios from "axios";
import "../modal.css";
import { toast } from "react-toastify";

export const AddStore = ({ setAddOpen }) => {
  const [file, setFile] = useState(undefined);
  const [name, setName] = useState("");
  const [quantity, setQuantity] = useState(0);
  const [loading, setLoading] = useState(false);

  const uploadNewStoreItem = async (e) => {
    try {
      e.preventDefault();
      if (name === "") {
        toast.error("رجاء ادخل العنصر");
      } else if (quantity === 0) {
        toast.error("برجاء ادخال الكميه");
      } else if (file === undefined) {
        toast.error("برجاء ادخال الصوره");
      } else {
        const formData = new FormData();
        formData.append("file", file);
        formData.append("name", name);
        formData.append("exist", 1);
        formData.append("quantity", quantity);
        toast.warn("جاري رفع الصوره برجاء الانتظار...");
        setLoading(true);
        const res = await axios.post(
          "http://localhost:3500/api/store",
          formData
        );
        setAddOpen(false);
        res.status === 200 && toast.success("تم اضافه العنصر بنجاح.");
        setLoading(false);
      }
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div className="modalll">
      <span className="close" onClick={() => setAddOpen(false)}>
        X
      </span>
      <h1>{`أضافه عنصر جديد`}</h1>
      {loading === true ? (
        <div className="loading">
          <span className="loader"></span>
        </div>
      ) : (
        <form onSubmit={(e) => e.preventDefault}>
          <div className="formItem">
            <label htmlFor="name">اسم العنصر: </label>
            {name === "" && (
              <span
                style={{
                  color: "red",
                  fontSize: "10px",
                  fontWeight: "300",
                }}
              >
                برجاء ادخل العنصر
              </span>
            )}
            <input
              name="name"
              placeholder="بيانات العنصر بالتفصيل"
              type="text"
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div className="formItem">
            <label htmlFor="quantity">الكميه:</label>
            <input
              name="quantity"
              placeholder="ادخل الكميه"
              type="number"
              required
              onChange={(e) => setQuantity(e.target.value)}
            />
          </div>
          <div className="formItem" style={{ cursor: "pointer" }}>
            <label htmlFor="img">صورة البون : </label>
            <input type="file" onChange={(e) => setFile(e.target.files[0])} />
          </div>
          <button className="addButton" onClick={uploadNewStoreItem}>
            أضافه
          </button>
        </form>
      )}
    </div>
  );
};
