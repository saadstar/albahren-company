import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

export const MoveToOutStore = ({ setOutOpen, editData }) => {
  const [driver, setDriver] = useState("");
  const [loading, setLoading] = useState(false);

  const btnHandler = async (e) => {
    try {
      if (driver === "") {
        toast.error("برجاء ادخال اسم السائق!");
      } else {
        e.preventDefault();
        setLoading(true);
        const res = await axios.put(
          `https://api.albahren.com/api/store/${editData.id}`,
          {
            ...editData,
            exist: 3,
            driver,
          }
        );
        res.status === 200 && toast.success("تم صرف العنصر بنجاح");
        setOutOpen(false);
        setLoading(false);
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="add">
      <div className="deleteModal">
        <span className="close" onClick={() => setOutOpen(false)}>
          X
        </span>
        <h2 className="headerBox">{`صرف نهائي`}</h2>
        <form>
          <div className="inputContainer">
            <label htmlFor="driver">السائق المستلم : </label>
            <input
              name="driver"
              placeholder="ادخل اسم السائق المستلم "
              type="text"
              onChange={(e) => setDriver(e.target.value)}
              required
            />
          </div>
          {loading === true ? (
            <h2 className="headerBox">Please Wait...</h2>
          ) : (
            <button
              className=" deleteAdminCancel addButton"
              onClick={btnHandler}
            >
              صرف نهائي{" "}
            </button>
          )}
        </form>
      </div>
    </div>
  );
};
