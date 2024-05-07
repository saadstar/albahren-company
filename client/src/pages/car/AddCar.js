import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

export const AddCar = ({ setAddOpen }) => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [km, setKm] = useState(0);
  const [oil, setOil] = useState(0);
  const [loading, setLoading] = useState(false);

  const addCarHandler = async (e) => {
    try {
      e.preventDefault();
      if (name === "برجاء اضافه اسم السائق") {
        toast.error("");
      } else if (price === 0) {
        toast.error("برجاء اضافه السعر");
      } else if (km === 0) {
        toast.error("ادخل عدد الكيلوميترات");
      } else {
        setLoading(true);
        const res = await axios.post(`https://api.albahren.com/api/car`, {
          name,
          price,
          km,
          oil,
        });
        res.status === 200 && toast.success("تم اضافه التحرك بنجاح");
        setLoading(false);
        setAddOpen(false);
      }
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div className="addWrapper">
      <form onSubmit={(e) => e.preventDefault}>
        <div className="inputContainer">
          <label htmlFor="name">اسم سائق : </label>
          <input
            name="name"
            placeholder="بيانات سائق  بالتفصيل"
            type="text"
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div className="inputContainer">
          <label htmlFor="price">سعر البنزين:</label>
          <input
            name="price"
            placeholder="ادخل سعر التفويله"
            type="number"
            required
            onChange={(e) => setPrice(e.target.value)}
          />
        </div>
        <div className="inputContainer">
          <label htmlFor="km">عدد الكيلوميترات:</label>
          <input
            name="km"
            placeholder="ادخل عدد الكيلوميترات"
            type="number"
            required
            onChange={(e) => setKm(e.target.value)}
          />
        </div>
        <div className="inputContainer">
          <label htmlFor="oil">سعر تغير الزيت :</label>
          <input
            placeholder="(اختياري)"
            name="oil"
            type="number"
            onChange={(e) => setOil(e.target.value)}
          />
        </div>
        <div className="inputButtons">
          <button className="doneBtn" onClick={addCarHandler}>
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
