import axios from "axios";
import React, { useState } from "react";
import { toast } from "react-toastify";

export const AddFunder = ({ setAddOpen, id }) => {
  const [inputs, setInputs] = useState({});
  const [loading, setLoading] = useState(false);

  const handleInputs = (e) => {
    setInputs((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };
  const addFunderDetails = async (e) => {
    try {
      e.preventDefault();
      if (inputs == {}) {
        toast.error("برجاء ادخال العناصر كامله");
      } else {
        setLoading(true);
        const res = await axios.post(
          "https://api.albahren.com/api/funderDetails",
          {
            ...inputs,
            value: inputs.quantity * inputs.price,
            funderCompanyId: id,
          }
        );
        res.status === 200 && toast.success("تمت اضافه بنجاح");
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
          <label htmlFor="name" class="form-label">
            اسم البيان
          </label>
          <input
            required
            type="text"
            class="form-control"
            name="name"
            onChange={handleInputs}
            focus={true}
          />
        </div>
        <div className="inputContainer">
          <label htmlFor="quantity" class="form-label">
            الكميه
          </label>
          <input
            type="number"
            class="form-control"
            name="quantity"
            required
            onChange={handleInputs}
          />
        </div>
      </div>
      <div className="inputsContainer">
        <div className="inputContainer">
          <label htmlFor="recived" class="form-label">
            المستلم
          </label>
          <input
            type="text"
            class="form-control"
            name="recived"
            onChange={handleInputs}
            required
          />
        </div>
        <div className="inputContainer">
          <label htmlFor="site" class="form-label">
            الموقع
          </label>
          <input
            type="text"
            class="form-control"
            name="site"
            required
            onChange={handleInputs}
          />
        </div>
      </div>
      <div className="inputsContainer">
        <div className="inputContainer">
          <label htmlFor="storeType" class="form-label">
            المخزن
          </label>
          <input
            type="text"
            class="form-control"
            required
            name="storeType"
            onChange={handleInputs}
          />
        </div>
        <div className="inputContainer">
          <label htmlFor="value" class="form-label">
            سعر الوحده:
          </label>
          <input
            type="number"
            required
            class="form-control"
            name="price"
            onChange={handleInputs}
          />
        </div>
      </div>
      <div className="inputButtons">
        <button className="doneBtn" onClick={addFunderDetails}>
          {loading === true ? "برجاء الانتظار" : "إضافه"}
        </button>
        <button className="cancelBtn" onClick={() => setAddOpen(false)}>
          إالغاء
        </button>
      </div>
    </div>
  );
};
