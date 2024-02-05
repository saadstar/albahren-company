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
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div className="modalll">
      <span className="close" onClick={() => setAddOpen(false)}>
        X
      </span>
      <h1>{`أضافه تأمين جديد`}</h1>
      <form onSubmit={(e) => e.preventDefault}>
        <div className="formItem">
          <label htmlFor="notes">اسم البيان: </label>
          {note === "" && (
            <span style={{ color: "red", fontSize: "10px", fontWeight: "300" }}>
              برجاء ادخل البيان
            </span>
          )}
          <input
            name="notes"
            type="text"
            onChange={(e) => setNote(e.target.value)}
          />
        </div>
        {type !== "returnInsurance" && (
          <div className="formItem">
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
        <div className="formItem">
          <label htmlFor="price">المبلغ:</label>
          <input
            name="price"
            placeholder="ادخل المبلغ بالجنيه"
            type="number"
            onChange={(e) => setPrice(e.target.value)}
          />
        </div>
        {type === "finalInsurance" && (
          <div className="formItem">
            <label htmlFor="other">نوع التأمين :</label>
            <input
              name="other"
              type="text"
              onChange={(e) => setOther(e.target.value)}
            />
          </div>
        )}
        {loading === true ? (
          <div class="lds-ellipsis">
            <div></div>
            <div></div>
            <div></div>
            <div></div>
          </div>
        ) : (
          <button
            className="addButton"
            disabled={note === "" ? true : false}
            onClick={handleAdd}
          >
            أضافه
          </button>
        )}
      </form>
    </div>
  );
};
