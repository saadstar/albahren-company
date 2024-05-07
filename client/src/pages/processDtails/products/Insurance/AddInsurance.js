import React, { useState } from "react";
import "../../../modal.css";
import axios from "axios";
import { toast } from "react-toastify";

export const AddInsurance = ({ id, setAddOpen, type }) => {
  const [note, setNote] = useState("");
  const [quantity, setQuantity] = useState(0);
  const [price, setPrice] = useState(0);
  const [other, setOther] = useState("");
  const [loading, setLoading] = useState(false);

  const handleAdd = async (e) => {
    try {
      e.preventDefault();
      if (note === "") {
        toast.error("برجاء ادخل البيان");
      } else if (price === 0) {
        toast.error("برجاء ادخل مبلغ التأمين");
      } else {
        setLoading(true);
        await axios.post(`https://api.albahren.com/api/processDetailes`, {
          processId: id,
          type,
          note,
          quantity,
          price,
          other,
        });
        setLoading(false);
        setAddOpen(false);
        setNote("");
        setPrice(0);
        toast.success("تمت اضافه التأمين بنجاح. ");
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
            type="text"
            onChange={(e) => setNote(e.target.value)}
          />
        </div>
        {type !== "returnInsurance" && (
          <div className="inputContainer">
            <label htmlFor="quantity">
              {type === "workerInsurance" ? "الدفعه :" : "رقم خطاب الضمان :"}
            </label>
            <input
              name="quantity"
              type="number"
              onChange={(e) => setQuantity(e.target.value)}
            />
          </div>
        )}
        <div className="inputContainer">
          <label htmlFor="price">المبلغ:</label>
          <input
            name="price"
            placeholder="ادخل المبلغ بالجنيه"
            type="number"
            onChange={(e) => setPrice(e.target.value)}
          />
        </div>
        {type === "finalInsurance" && (
          <div className="inputContainer">
            <label htmlFor="other">نوع التأمين :</label>
            <input
              name="other"
              type="text"
              onChange={(e) => setOther(e.target.value)}
            />
          </div>
        )}
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
