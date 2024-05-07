import React, { useState } from "react";
import "../../../usersFeatures/user.css";
import axios from "axios";
import { toast } from "react-toastify";

export const AddDetails = ({ id, setAddOpen, sort }) => {
  const [note, setNote] = useState("");
  const [price, setPrice] = useState(0);
  const [loading, setLoading] = useState(false);

  const handleAdd = async (e) => {
    try {
      e.preventDefault();
      if (note === "") {
        toast.error("برجاء ادخال اسم البيان");
      } else if (price === 0) {
        toast.error("برجاء ادخال السعر");
      } else {
        setLoading(true);
        await axios.post(`https://api.albahren.com/api/processDetailes`, {
          processId: id,
          type: sort,
          note,
          price,
          value: price,
        });
        setNote("");
        setPrice(0);
        toast.success("تمت اضافه عنصر بنجاح. ");
        setAddOpen(false);
      }
      setLoading(false);
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div className="addWrapper">
      <form onSubmit={(e) => e.preventDefault}>
        <div className="inputContainer">
          <label htmlFor="notes">اسم البيان: </label>
          <input
            name="notes"
            placeholder={"مثل:شحم حبل الخ.. "}
            type="text"
            onChange={(e) => setNote(e.target.value)}
          />
        </div>
        <div className="inputContainer">
          <label htmlFor="price">المدفوع: </label>
          <input
            name="price"
            placeholder="ادخل المدفوع بالجنيه"
            type="number"
            onChange={(e) => setPrice(e.target.value)}
          />
        </div>
        <div className="inputButtons">
          <button className="doneBtn" onClick={handleAdd}>
            {loading === true ? "برجاء الانتظار" : "إضافه"}
          </button>
          <button className="cancelBtn" onClick={() => setAddOpen(false)}>
            إالغاء
          </button>
        </div>
      </form>
    </div>
  );
};
