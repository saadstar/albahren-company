import React, { useState } from "react";
import "../../../modal.css";
import axios from "axios";
import { toast } from "react-toastify";

export const AddSand = ({ id, setAddOpen, type, ar }) => {
  const [note, setNote] = useState("");
  const [precentage, setPercentage] = useState(1);
  const [quantity, setQuantity] = useState(0);
  const [price, setPrice] = useState(0);
  const [loading, setLoading] = useState(false);

  const handleAdd = async (e) => {
    try {
      e.preventDefault();
      if (quantity === 0) {
        toast.error("برجاء ادخال الكميه");
      } else if (price === 0) {
        toast.error("برجاء ادخال السعر");
      } else {
        setLoading(true);
        await axios.post(`https://api.albahren.com/api/processDetailes`, {
          processId: id,
          type,
          note,
          precentage,
          quantity,
          price,
          value: price * quantity,
        });
        setLoading(false);
        setNote("");
        setPrice(0);
        setAddOpen(false);
        toast.success("تمت اضافه عنصر بنجاح. ");
      }
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
            placeholder={"مثل: مطبق من 0 الي 1 "}
            type="text"
            onChange={(e) => setNote(e.target.value)}
          />
        </div>
        <div className="inputContainer">
          <label htmlFor="precentage">
            {type === "sand" ? "طول المواسير :" : "عدد الغرف :"}
          </label>
          <input
            name="precentage"
            placeholder={`ادخل ${
              type === "sand" ? " طول المواسير بالمتر" : "عدد الغرف"
            }`}
            type="number"
            onChange={(e) => setPercentage(e.target.value)}
          />
        </div>
        <div className="inputContainer">
          <label htmlFor="quantity">{`كميه ${ar} ${
            type === "cement" ? "بالطن" : "بالمتر المكعب"
          } :`}</label>
          <input
            name="quantity"
            placeholder={`ادخل كميه ${ar} ${
              type === "cement" ? "بالطن" : "بالمتر المكعب"
            }`}
            type="number"
            onChange={(e) => setQuantity(e.target.value)}
          />
        </div>
        <div className="inputContainer">
          <label htmlFor="price">{`سعر ${ar}:`}</label>
          <input
            name="price"
            placeholder={`أدخل سعر ${
              type === "cement" ? `طن ${ar} الواحد ` : `متر ${ar} الواحد `
            }`}
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
