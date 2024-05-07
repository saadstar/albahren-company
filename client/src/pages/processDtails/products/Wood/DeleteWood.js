import React from "react";
import { toast } from "react-toastify";
import axios from "axios";
import "../../../modal.css";

export const DeleteWood = ({ setDeleteOpen, deleteUserId }) => {
  const handleSubmit = async () => {
    try {
      await axios.delete(
        `https://api.albahren.com/api/processDetailes/${deleteUserId}`
      );
      toast.success("تم حذف العنصر بنجاح");
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
          <h2>هل متأكد من مسح العنصر التالي ؟</h2>
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
