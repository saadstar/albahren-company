import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

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
    <div className="addTubes">
      <div className="modalll">
        <span className="close" onClick={() => setEditOpen(false)}>
          X
        </span>
        <h1>{`صرف العنصر`}</h1>
        <form onSubmit={(e) => e.preventDefault}>
          <div className="formItem">
            <label htmlFor="nameOne">المهندس المستلم : </label>
            <input
              name="nameOne"
              placeholder="ادخل اسم المهندس"
              type="text"
              onChange={(e) => setNameOne(e.target.value)}
              required
            />
          </div>
          <div className="formItem">
            <label htmlFor="nameTwo">المقاول المستلم : </label>
            <input
              name="nameTwo"
              placeholder="ادخل اسم المقاول المستلم "
              type="text"
              onChange={(e) => setNameTwo(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
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
              <div className="formItem">
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
            <span className="loader"></span>
          ) : (
            <button
              className="addButton"
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
