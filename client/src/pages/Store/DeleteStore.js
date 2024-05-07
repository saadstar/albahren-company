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
    <div className="add">
      <div className="deleteModal">
        <span className="close" onClick={() => setDeleteOpen(false)}>
          X
        </span>
        <h1>{`حذف العنصر`}</h1>
        <div className="deleteFlexer">
          <h2>هل تريد حذف العنصر التالي ؟</h2>
          <div className="deleteAdminDeleteBtns">
            <button className="deleteAdminDelete" onClick={handleSubmit}>
              حذف
            </button>
            <button
              className="deleteAdminCancel"
              onClick={() => setDeleteOpen(false)}
            >
              الغاء
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
