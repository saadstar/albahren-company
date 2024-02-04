import React, { useState } from "react";
import "../modal.css";
import axios from "axios";
import { toast } from "react-toastify";
import "../modal.css";

export const AddCar = ({ setOpenModal }) => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [km, setKm] = useState(0);
  const [oil, setOil] = useState(0);
  const [openOil, setOpenOil] = useState(false);

  const addCarHandler = async (e) => {
    try {
      e.preventDefault();
      const res = await axios.post(`https://api.eleaman.com/api/car`, {
        name,
        price,
        km,
        oil,
      });
      res.status === 200 && toast.success("تم اضافه التحرك بنجاح");
      setOpenModal(false);
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div className="modalll">
      <span className="close" onClick={() => setOpenModal(false)}>
        X
      </span>
      <h1>{`أضافه تحرك سياره جديد`}</h1>
      <form onSubmit={(e) => e.preventDefault}>
        <div className="formItem">
          <label htmlFor="name">اسم سائق : </label>
          <input
            name="name"
            placeholder="بيانات سائق  بالتفصيل"
            type="text"
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div className="formItem">
          <label htmlFor="price">سعر البنزين:</label>
          <input
            name="price"
            placeholder="ادخل سعر التفويله"
            type="number"
            required
            onChange={(e) => setPrice(e.target.value)}
          />
        </div>
        <div className="formItem">
          <label htmlFor="km">عدد الكيلوميترات:</label>
          <input
            name="km"
            placeholder="ادخل عدد الكيلوميترات"
            type="number"
            required
            onChange={(e) => setKm(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <div class="form-check form-switch">
            <input
              class="form-check-input"
              type="checkbox"
              role="switch"
              id="flexSwitchCheckDefault"
              onClick={(e) => setOpenOil(!openOil)}
            />
            <label class="form-check-label" for="flexSwitchCheckDefault">
              أضافه تغير زيت
            </label>
          </div>
          {openOil && (
            <div className="formItem">
              <label htmlFor="oil">سعر تغير الزيت :</label>
              <input
                name="oil"
                type="number"
                onChange={(e) => setOil(e.target.value)}
              />
            </div>
          )}
        </div>
        <button className="addButton" onClick={addCarHandler}>
          أضافه
        </button>
      </form>
    </div>
  );
};
