import React, { useState } from "react";
import "../tubes/tubes.css";
import axios from "axios";
import { toast } from "react-toastify";
import "../../../modal.css";

export const AddDetails = ({ id, setAddOpen, sort }) => {
  const [note, setNote] = useState("");
  const [price, setPrice] = useState(0);
  const [loading, setLoading] = useState(false);

  const handleAdd = async (e) => {
    try {
      e.preventDefault();
      if (price === 0) {
        toast.error("برجاء ادخال السعر");
      } else {
        setLoading(true);
        await axios.post(`http://localhost:3500/api/processDetailes`, {
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
    <div className="modalll">
      <span className="close" onClick={() => setAddOpen(false)}>
        X
      </span>
      <h1>{`أضافه عنصر جديد`}</h1>
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
            placeholder={"مثل:شحم حبل الخ.. "}
            type="text"
            onChange={(e) => setNote(e.target.value)}
          />
        </div>
        <div className="formItem">
          <label htmlFor="price">المدفوع: </label>
          <input
            name="price"
            placeholder="ادخل المدفوع بالجنيه"
            type="number"
            onChange={(e) => setPrice(e.target.value)}
          />
        </div>
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
