import React, { useState } from "react";
import "../../../modal.css";
import axios from "axios";
import { toast } from "react-toastify";

export const AddRoom = ({ id, setAddOpen, type }) => {
  const [note, setNote] = useState("");
  const [quantity, setQuantity] = useState(0);
  const [precentage, setPrecentage] = useState(0);
  const [price, setPrice] = useState(0);
  const [other, setOther] = useState("");
  const [rPrice, setRPrice] = useState(0);
  const [mPrice, setMPrice] = useState(0);
  const [aPrice, setAPrice] = useState(0);
  const [khPrice, setKhPrice] = useState(0);
  const [loading, setLoading] = useState(false);
  
  const handleAdd = async (e) => {
    try {
      e.preventDefault();
      if (note === "") {
        toast.error("برجاء ادخال اسم البيان");
      } else {
        setLoading(true);
        await axios.post(`https://api.albahren.com/api/processDetailes`, {
          processId: id,
          type,
          note,
          quantity,
          price,
          precentage,
          rPrice,
          mPrice,
          aPrice,
          khPrice,
          other,
          value:Math.round(quantity)  + Math.round(price) + Math.round(precentage) + Math.round(rPrice) + Math.round(mPrice) + Math.round(aPrice) + Math.round(khPrice),
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
      <h1>{`أضافه غرفه جديد`}</h1>
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
          <label htmlFor="quantity">سعر الحديد الكلي</label>
          <input
            name="quantity"
            placeholder="ادخل اجمالي سعر الحديد"
            type="number"
            onChange={(e) => setQuantity(e.target.value)}
          />
        </div>
        <div className="formItem">
          <label htmlFor="cement">سعر الاسمنت الكلي</label>
          <input
            name="cement"
            placeholder="ادخل اجمالي سعر الاسمنت"
            type="number"
            onChange={(e) => setPrecentage(e.target.value)}
          />
        </div>
        <div className="formItem">
          <label htmlFor="sen">سعر السن الكلي</label>
          <input
            name="sen"
            placeholder="ادخل اجمالي سعر السن"
            type="number"
            onChange={(e) => setPrice(e.target.value)}
          />
        </div>
        <div className="formItem">
          <label htmlFor="rPrice">سعر الرمل الكلي</label>
          <input
            name="rPrice"
            placeholder="ادخل اجمالي سعر الرمل"
            type="number"
            onChange={(e) => setRPrice(e.target.value)}
          />
        </div>
        <div className="formItem">
          <label htmlFor="mPrice">اجمالي مصروفات المصناعيه</label>
          <input
            name="mPrice"
            placeholder="ادخل اجمالي سعر المصناعيه"
            type="number"
            onChange={(e) => setMPrice(e.target.value)}
          />
        </div>
        <div className="formItem">
          <label htmlFor="aPrice">اجمالي العزل</label>
          <input
            name="aPrice"
            placeholder="ادخل اجمالي سعر العزل"
            type="number"
            onChange={(e) => setAPrice(e.target.value)}
          />
        </div>
        <div className="formItem">
          <label htmlFor="khPrice">اجمالي سعر الاغطيه</label>
          <input
            name="khPrice"
            placeholder="ادخل اجمالي سعر الغطاء"
            type="number"
            onChange={(e) => setKhPrice(e.target.value)}
          />
        </div>
        <div className="formItem">
          <label htmlFor="other">نثريات</label>
          <input
            name="other"
            placeholder="ما هي النثريات"
            type="text"
            onChange={(e) => setOther(e.target.value)}
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
