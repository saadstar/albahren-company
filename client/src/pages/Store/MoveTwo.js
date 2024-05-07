import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import "../usersFeatures/user.css";

export const MoveTwo = ({ setEditOpen, editData }) => {
  const [nameOne, setNameOne] = useState("لا يوجد");
  const [nameTwo, setNameTwo] = useState("لا يوجد");
  const [quantityOut, setQuantityOut] = useState(editData.quantity);
  const [loading, setLoading] = useState(false);
  const [openQuantity, setOpenQuantity] = useState(false);

  const editHandler = async (e) => {
    try {
      e.preventDefault();
      setLoading(true);
      const res = await axios.put(
        `https://api.albahren.com/api/store/${editData.id}`,
        {
          ...editData,
          nameOne,
          nameTwo,
          quantityOut,
          exist: 2,
        }
      );
      res.status === 200 &&
        toast.success("تمت أضافه العنصر الي المخزن الفرعي . ");
      setEditOpen(false);
      setLoading(false);
    } catch (err) {
      console.log(err);
    }
  };
  const butnHandler = async (e) => {
    try {
      e.preventDefault();
      setLoading(true);
      await axios.put(`https://api.albahren.com/api/store/${editData.id}`, {
        ...editData,
        nameOne,
        nameTwo,
        quantityOut,
        exist: 2,
      });
      await axios.post(`https://api.albahren.com/api/store`, {
        ...editData,
        exist: 1,
        quantity: editData.quantity - quantityOut,
      });
      toast.success("تمت أضافه العنصر الي المخزن الفرعي . ");
      setEditOpen(false);
      setLoading(false);
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div className="add">
      <div className="deleteModal">
        <span className="close" onClick={() => setEditOpen(false)}>
          X
        </span>
        <h2 className="headerBox">{`صرف العنصر`}</h2>
        <form onSubmit={(e) => e.preventDefault}>
          <div className="inputContainer" style={{ width: "30vw !important" }}>
            <label htmlFor="nameOne">المهندس المستلم : </label>
            <input
              name="nameOne"
              placeholder="ادخل اسم المهندس"
              type="text"
              onChange={(e) => setNameOne(e.target.value)}
              required
            />
          </div>
          <div className="inputContainer" style={{ width: "30vw !important" }}>
            <label htmlFor="nameTwo">المقاول المستلم : </label>
            <input
              name="nameTwo"
              placeholder="ادخل اسم المقاول المستلم "
              type="text"
              onChange={(e) => setNameTwo(e.target.value)}
              required
            />
          </div>
          <div className="mb-3" style={{ marginBottom: "10px" }}>
            <div class="form-check form-switch">
              <input
                class="form-check-input"
                type="checkbox"
                role="switch"
                id="flexSwitchCheckDefault"
                onClick={(e) => setOpenQuantity(!openQuantity)}
              />
              <label class="form-check-label" for="flexSwitchCheckDefault">
                صرف كميه محدده
              </label>
            </div>
            {openQuantity && (
              <div className="inputContainer">
                <label htmlFor="quantityOut">الكميه المصروفه : </label>
                <input
                  name="quantityOut"
                  type="number"
                  onChange={(e) => setQuantityOut(e.target.value)}
                />
              </div>
            )}
          </div>
          {loading === true ? (
            <h2 className="headerBox">Please Wait...</h2>
          ) : (
            <button
              className=" deleteAdminCancel addButton"
              onClick={
                quantityOut === editData.quantity ? editHandler : butnHandler
              }
            >
              تحويل للفرعي
            </button>
          )}
        </form>
      </div>
    </div>
  );
};
