import React from "react";
import "./user.css";
import axios from "axios";
import { toast } from "react-toastify";

export const DeleteUser = (props) => {
  const handleSubmit = async () => {
    try {
      await axios.delete(
        `https://api.albahren.com/api/auth/${props.deleteUserId}`
      );
      toast.success("تم حذف العنصر بنجاح");
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div className="add">
      <div className="modall">
        <span className="close" onClick={() => props.setDeleteOpen(false)}>
          X
        </span>
        <h1>{`حذف المستخدم`}</h1>
        <div className="">
          <p className="item">هل متأكد من مسح المستخدم التالي ؟</p>
          <div className="deleteButtons">
            <button className="deleteButton" onClick={handleSubmit}>
              حذف
            </button>
            <button
              className="cancelButton"
              onClick={() => props.setDeleteOpen(false)}
            >
              الغاء
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
