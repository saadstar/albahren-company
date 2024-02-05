import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

export const ProcessModal = ({ setOpenModal }) => {
  const [title, setTitle] = useState("");
  const addProcess = async (e) => {
    try {
      if (title !== "") {
        const res = await axios.post("https://api.albahren.com/api/process", {
          title,
        });
        if (res?.status === 200) {
          setOpenModal(false);
          toast.success(`تمت اضافه ${res.data.title} بنجاح  `);
        } else {
          toast.error(`!برجاء التحقق من الانترنت`);
        }
      } else {
        toast.error("برجاء اضافه اسم العمليه");
      }
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div className="modalll">
      <h1 class="">أضافه عمليه</h1>
      <div class="formItem">
        <label htmlFor="process">أدخل اسم العمليه:</label>
        <input
          name="process"
          onChange={(e) => setTitle(e.target.value)}
          placeholder="استخدم اللغه العربيه"
        />
      </div>
      <button type="button" className="submit" onClick={addProcess}>
        اضف العمليه
      </button>
      <button
        type="button"
        className="modalClose"
        onClick={() => setOpenModal(false)}
      >
        اغلاق
      </button>
    </div>
  );
};
