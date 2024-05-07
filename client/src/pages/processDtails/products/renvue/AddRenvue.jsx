import axios from 'axios';
import React, { useState } from 'react'
import { toast } from 'react-toastify';

export const AddRenvue = ({ id, setAddOpen }) => {
    const [processIncome, setProcessIncome] = useState(0);
    const [loading, setLoading] = useState(false);

     const addIncomeProcess = async (e) => {
    try {
        e.preventDefault();
        setLoading(true);
      const res = await axios.put(`https://api.albahren.com/api/process/${id}`, {
        processIncome,
      });
        res.status === 200 && toast.success("تم اضافه الوارد بنجاح");
        setAddOpen(false);
        setLoading(false);
    } catch (err) {
      console.log(err);
    }
    };
    
  return (
<div className="addWrapper">
      <form onSubmit={(e) => e.preventDefault}>
        <div className="inputContainer">
         <label htmlFor="IncomeProcess">المبلغ الوارد</label>
          <input
                          placeholder="ادخل المبلغ الوارد"
                          type="number"
                          id="IncomeProcess"
                          onChange={(e) => setProcessIncome(e.target.value)}
                        />
        </div>       
          <div className="inputButtons">
            <button className="doneBtn" onClick={addIncomeProcess}>
              {loading === true ?"برجاء الانتظار":"إضافه"}
            </button>
            <button className="cancelBtn" onClick={() => setAddOpen(false)}>
              إالغاء
            </button>
          </div>
      </form>
    </div>
  )
}
