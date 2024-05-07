import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

export const AddSallery = ({ setAddOpen }) => {
  const [name, setName] = useState("");
  const [role, setRole] = useState("");
  const [salleryNum, setSalleryNum] = useState(0);
  const [added, setAdded] = useState(0);
  const [note, setNote] = useState("");
  const [site, setSite] = useState("");
  const [loading, setLoading] = useState(false);

  const addSalleryHandler = async (e) => {
    try {
      e.preventDefault();
      if (name === "") {
        toast.error("برجاء ادخال اسم الموظف");
      } else if (role === "") {
        toast.error("برجاء ادخال وظيفه الموظف");
      } else if (salleryNum === 0) {
        toast.error("برجاء ادخال مرتب الموظف");
      } else if (site === "") {
        toast.error("برجاء ادخال اسم الموقع");
      } else {
        setLoading(true);
        const res = await axios.post(`https://api.albahren.com/api/sallery`, {
          name,
          role,
          salleryNum,
          added,
          note,
          site,
        });
        res.status === 200 && toast.success("تم اضافه المرتب بنجاح");
        setLoading(false);
        setAddOpen(false);
      }
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div className="addWrapper">
      <div className="inputsContainer">
        <div className="inputContainer">
          <label htmlFor="name">اسم الموظف:</label>
          <input
            name="name"
            placeholder="اسم الموظف بالكامل"
            type="text"
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div className="inputContainer">
          <label htmlFor="role">الوظيفه: </label>
          <input
            name="role"
            placeholder=""
            type="text"
            required
            onChange={(e) => setRole(e.target.value)}
          />
        </div>
      </div>
      <div className="inputsContainer">
        <div className="inputContainer">
          <label htmlFor="salleryNum">الراتب</label>
          <input
            name="salleryNum"
            type="number"
            required
            onChange={(e) => setSalleryNum(e.target.value)}
          />
        </div>
        <div className="inputContainer">
          <label htmlFor="added">الحوافز : </label>
          <input
            name="added"
            type="number"
            onChange={(e) => setAdded(e.target.value)}
          />
        </div>
      </div>
      <div className="inputsContainer">
        <div className="inputContainer">
          <label htmlFor="note">ملاحظات : </label>
          <input
            name="note"
            type="text"
            onChange={(e) => setNote(e.target.value)}
          />
        </div>
        <div className="inputContainer">
          <label htmlFor="site">الموقع : </label>
          <input
            name="site"
            type="text"
            onChange={(e) => setSite(e.target.value)}
          />
        </div>
      </div>
      <div className="inputButtons">
        <button className="doneBtn" onClick={addSalleryHandler}>
          {loading === true ? "برجاء الانتظار" : "إضافه"}
        </button>
        <button className="cancelBtn" onClick={() => setAddOpen(false)}>
          إالغاء
        </button>
      </div>
    </div>
  );
};
