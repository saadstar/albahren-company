import React, { useState } from "react";
import "../../../modal.css";
import axios from "axios";
import { toast } from "react-toastify";

export const AddTubes = ({ id, setAddOpen, type }) => {
  const [note, setNote] = useState("");
  const [quantity, setQuantity] = useState(0);
  const [price, setPrice] = useState(0);
  const [other, setOther] = useState("");
  const [loading, setLoading] = useState(false);

  const handleAdd = async (e) => {
    try {
      e.preventDefault();
      if (note === "") {
        toast.error("برجاء ادخال اسم البيان");
      } else if (quantity === 0) {
        toast.error("برجاء ادخال الكميه");
      } else if (price === 0) {
        toast.error("برجاء ادخال السعر");
      } else {
        setLoading(true);
        await axios.post(`https://api.albahren.com/api/processDetailes`, {
          processId: id,
          type,
          note,
          quantity,
          price,
          other,
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
          <input
            name="notes"
            placeholder={"مثل: مواسير 9 بوصه"}
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
        {type === "worker" && (
          <div className="inputContainer">
            <label htmlFor="other">اسم الصنايعي :</label>
            <input
              name="other"
              placeholder="ادخل  اسم الصنايعي"
              type="twxt"
              onChange={(e) => setOther(e.target.value)}
            />
          </div>
        )}
        <div className="inputContainer">
          <label htmlFor="price">السعر:</label>
          <input
            name="price"
            placeholder="ادخل السعر المتر الواحد"
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
