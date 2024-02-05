import React, { useState } from "react";
import "../modal.css";
import axios from "axios";
import { toast } from "react-toastify";

export const AddAnalyics = ({ setOpenAddAnalyics }) => {
  const [title, setTitle] = useState("");
  const [type, setType] = useState("");

  const addNewAnalyics = async (e) => {
    try {
      e.preventDefault();
      const res = await axios.post("https://api.albahren.com/api/analyics", {
        title,
        type,
      });
      res.status === 200 && toast.success("تم اضافه العمليه بنجاح");
      res.status === 500 && toast.error("حدث خطأ ما");
    } catch (err) {
      console.log(err);
    }
    setOpenAddAnalyics(false);
  };
  return (
    <div className="myModall">
      <span className="close" onClick={() => setOpenAddAnalyics(false)}>
        X
      </span>
      <h1 className="ms-2">{"أضافه عمليه جديده"}</h1>
      <form onSubmit={(e) => e.preventDefault}>
        <div className="formItem">
          <label htmlFor="title">العمليه</label>
          <input
            name="title"
            placeholder="ادخل اسم العمليه"
            type="text"
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div className="formItem">
          <div class="nav-item dropdown">
            <label
              class="nav-link dropdown-toggle"
              role="button"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              {type === ""
                ? " نوع العمليه"
                : type === "sarf"
                ? "شبكات صرف صحي"
                : "شبكات مياه"}
            </label>
            <div class="dropdown-menu cursor-pointer">
              <p class="dropdown-item" onClick={(e) => setType("sarf")}>
                شبكات صرف صحي
              </p>
              <p class="dropdown-item" onClick={(e) => setType("water")}>
                شبكات مياه
              </p>
            </div>
          </div>
        </div>
        <button className="addButton" onClick={addNewAnalyics}>
          أضافه
        </button>
      </form>
    </div>
  );
};
