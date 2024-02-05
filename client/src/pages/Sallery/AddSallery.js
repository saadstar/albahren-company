import React, { useState } from "react";
import "../car/car.css";
import axios from "axios";
import { toast } from "react-toastify";

export const AddSallery = ({ setOpenModal }) => {
  const [name, setName] = useState("");
  const [role, setRole] = useState("");
  const [salleryNum, setSalleryNum] = useState(0);
  const [added, setAdded] = useState(0);
  const [note, setNote] = useState("");
  const [site, setSite] = useState("");

  const addSalleryHandler = async (e) => {
    try {
      e.preventDefault();
      const res = await axios.post(`https://api.albahren.com/api/sallery`, {
        name,
        role,
        salleryNum,
        added,
        note,
        site,
      });
      res.status === 200 && toast.success("تم اضافه المرتب بنجاح");
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
      <h1>{"أضافه مرتب جديد"}</h1>
      <form onSubmit={(e) => e.preventDefault}>
        <div className="formItem">
          <label htmlFor="name">اسم الموظف:</label>
          <input
            name="name"
            placeholder="اسم الموظف بالكامل"
            type="text"
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div className="formItem">
          <label htmlFor="role">الوظيفه: </label>
          <input
            name="role"
            placeholder=""
            type="text"
            required
            onChange={(e) => setRole(e.target.value)}
          />
        </div>
        <div className="formItem">
          <label htmlFor="salleryNum">الراتب</label>
          <input
            name="salleryNum"
            type="number"
            required
            onChange={(e) => setSalleryNum(e.target.value)}
          />
        </div>
        <div className="formItem">
          <label htmlFor="added">الحوافز : </label>
          <input
            name="added"
            type="number"
            onChange={(e) => setAdded(e.target.value)}
          />
        </div>
        <div className="formItem">
          <label htmlFor="note">ملاحظات : </label>
          <input
            name="note"
            type="text"
            onChange={(e) => setNote(e.target.value)}
          />
        </div>
        <div className="formItem">
          <label htmlFor="site">الموقع : </label>
          <input
            name="site"
            type="text"
            onChange={(e) => setSite(e.target.value)}
          />
        </div>
        <button className="addButton" onClick={addSalleryHandler}>
          أضافه
        </button>
      </form>
    </div>
  );
};
