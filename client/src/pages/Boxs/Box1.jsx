import React, { useState, useEffect } from "react";
import "./boxOne.css";
import axios from "axios";

export const Box1 = () => {
  const [rowData, setRowData] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get("http://localhost:3500/api/save");
        setRowData(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, [rowData._id]);

  return (
    <div className="top-box">
      <h1>الأكثر صرفاَ</h1>
      <div className="list">
        {rowData
          .sort((x, y) => {
            return y.out - x.out;
          })
          .slice(0, 5)
          .map((deal) => (
            <div key={deal._id} className="listItem">
              <div className="user">
                <img src={deal.img} alt="dsaf" className="boxImg" />
                <div className="userTexts">
                  <span className="username">{deal.name}</span>
                </div>
              </div>
              <span>${deal.out}</span>
            </div>
          ))}
      </div>
    </div>
  );
};
