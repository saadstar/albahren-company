import React from "react";
import { toast } from "react-toastify";
import axios from "axios";
import "../../../modal.css";

export const DeleteInsurance = ({ setDeleteOpen, deleteUserId }) => {
  const handleSubmit = async () => {
    try {
      await axios.delete(
        `http://localhost:3500/api/processDetailes/${deleteUserId}`
      );
      setDeleteOpen(false);
      toast.success("تم حذف العنصر بنجاح");
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
