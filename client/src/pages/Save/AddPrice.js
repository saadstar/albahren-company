import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

export const AddPrice = ({ setAddOpen, type, setOutOpen, outOpen }) => {
  // const [file, setFile] = useState(undefined);
  const [recived, setRecived] = useState("");
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const [out, setOut] = useState(0);
  const [inn, setIn] = useState(0);
  const [proccessName, setProccessName] = useState("لا يوجد");

  const uploadNewPrice = async (e) => {
    try {
      e.preventDefault();
      const formData = new FormData();
      setLoading(true);
      // formData.append("file", file);
      formData.append("name", name);
      formData.append("out", out);
      formData.append("inn", inn);
      formData.append("recived", recived);
      formData.append("proccessName", proccessName);
      const res = await axios.post(
        "https://api.albahren.com/api/save",
        formData
      );
      toast.success("تم بنجاح.");
      res.status === 200 && type !== "out" && setAddOpen(false);
      setLoading(false);
      res.status === 200 && type === "out" && setOutOpen(false);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="addWrapper">
      {type === "out" ? (
        <form onSubmit={(e) => e.preventDefault}>
          <div className="inputContainer">
            <label htmlFor="name">اسم البيان :*</label>
            <input
              name="name"
              placeholder="ادخل تفاصيل صرف المبلغ"
              type="text"
              required
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="inputContainer">
            <label htmlFor="out"> المبلغ المصروف:* </label>
            <input
              name="out"
              placeholder="ادخل المبلغ المصروف"
              type="number"
              required
              onChange={(e) => setOut(e.target.value)}
            />
          </div>
          <div className="inputContainer">
            <label htmlFor="recived">اسم المستلم : </label>
            <input
              name="recived"
              placeholder="ادخل مستلم المبلغ"
              type="text"
              required
              onChange={(e) => setRecived(e.target.value)}
            />
          </div>
          <div className="inputContainer">
            <label htmlFor="proccessName">العمليه</label>
            <input
              name="proccessName"
              placeholder="ادخل اسم العمليه"
              type="text"
              onChange={(e) => setProccessName(e.target.value)}
            />
          </div>
          {/* <div className="inputContainer">
            <label htmlFor="img">صورة ايصال العهده الماليه : </label>
            <input type="file" onChange={(e) => setFile(e.target.files[0])} />
          </div> */}
          <div className="inputButtons">
            <button className="doneBtn" onClick={uploadNewPrice}>
              {loading === true ? "برجاء الانتظار" : "إضافه"}
            </button>
            <button className="cancelBtn" onClick={() => setOutOpen(false)}>
              إالغاء
            </button>
          </div>
        </form>
      ) : (
        <form onSubmit={(e) => e.preventDefault}>
          <div className="inputContainer">
            <label htmlFor="in"> المبلغ الوارد*: </label>
            <input
              placeholder="ادخل المبلغ الوارد"
              type="number"
              required
              onChange={(e) => setIn(e.target.value)}
            />
          </div>
          {/* <div className="inputContainer">
            <label htmlFor="img">صورة ايصال استلام المبلغ : </label>
            <input type="file" onChange={(e) => setFile(e.target.files[0])} />
          </div> */}
          <div className="inputButtons">
            <button className="doneBtn" onClick={uploadNewPrice}>
              {loading === true ? "برجاء الانتظار" : "إضافه"}
            </button>
            <button className="cancelBtn" onClick={() => setAddOpen(false)}>
              إالغاء
            </button>
          </div>
        </form>
      )}
    </div>
  );
};
