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
            placeholder={"مثل: مواسير 9 بوصه"}
            type="text"
            onChange={(e) => setNote(e.target.value)}
          />
        </div>
        <div className="formItem">
          <label htmlFor="quantity">الكميه:</label>
          <input
            name="quantity"
            placeholder="ادخل الكميه بالمتر"
            type="number"
            onChange={(e) => setQuantity(e.target.value)}
          />
        </div>
        {type === "worker" && (
          <div className="formItem">
            <label htmlFor="other">اسم الصنايعي :</label>
            <input
              name="other"
              placeholder="ادخل  اسم الصنايعي"
              type="twxt"
              onChange={(e) => setOther(e.target.value)}
            />
          </div>
        )}
        <div className="formItem">
          <label htmlFor="price">السعر:</label>
          <input
            name="price"
            placeholder="ادخل السعر المتر الواحد"
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
