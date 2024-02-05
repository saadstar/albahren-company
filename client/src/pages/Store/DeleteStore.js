import React from "react";
import { toast } from "react-toastify";
import axios from "axios";
import "../modal.css";

export const DeleteStore = ({ setDeleteOpen, deleteUserId }) => {
  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      await axios.delete(`https://api.albahren.com/api/store/${deleteUserId}`);
      toast.error("تم حذف العنصر ");
      setDeleteOpen(false);
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div className="deleteModal">
      <span className="close" onClick={() => setDeleteOpen(false)}>
        X
      </span>
      <h1>{`حذف العنصر`}</h1>
      <div className="">
        <p className="item">هل متأكد من مسح العنصر التالي ؟</p>
        <div className="deleteButtons">
          <button className="deleteButton" onClick={handleSubmit}>
            حذف
          </button>
          <button className="cancelButton" onClick={() => setDeleteOpen(false)}>
            الغاء
          </button>
        </div>
      </div>
    </div>
  );
};
