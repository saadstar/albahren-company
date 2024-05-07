import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import "../../../modal.css";

export const AddWood = ({ id, setAddOpen }) => {
  const [note, setNote] = useState("");
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
          type: "wood",
          note,
          quantity,
          price,
          value: price * quantity,
        });
        setLoading(false);
        setAddOpen(false);
        setNote("");
        setPrice(0);
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
          {note === "" && (
            <span style={{ color: "red", fontSize: "10px", fontWeight: "300" }}>
              برجاء ادخل البيان
            </span>
          )}
          <input
            name="notes"
            placeholder={"مثل:خشب "}
            type="text"
            onChange={(e) => setNote(e.target.value)}
          />
        </div>
        <div className="inputContainer">
          <label htmlFor="quantity">الكميه:</label>
          <input
            name="quantity"
            placeholder="ادخل الكميه بالمتر"
            type="number"
            onChange={(e) => setQuantity(e.target.value)}
          />
        </div>
        <div className="inputContainer">
          <label htmlFor="price">السعر:</label>
          <input
            name="price"
            placeholder="ادخل سعر المتر"
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
