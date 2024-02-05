import React, { useEffect, useState } from "react";
import "./analyics.css";
import { Link } from "react-router-dom";
import axios from "axios";
import { AddAnalyics } from "./AddAnalyics";

export const Analyics = () => {
  const [analyicsData, setAnalyicsData] = useState([]);
  const [openAddAnalyics, setOpenAddAnalyics] = useState(false);

  const fetchAnalyicsData = async () => {
    try {
      const res = await axios.get("https://api.albahren.com/api/analyics");
      setAnalyicsData(res.data);
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    fetchAnalyicsData();
  });

  return (
    <div className="analyics">
      {analyicsData.length === 0 ? (
        <div className="card">
          <h2>لا يوجد عمليات برجاء الأضافه</h2>
          <button
            className="card"
            type="button"
            class="btn btn-primary"
            onClick={() => setOpenAddAnalyics(!openAddAnalyics)}
          >
            أضافه تحليل جديد
          </button>
        </div>
      ) : (
        <div className="cardy-flex">
          {analyicsData.map((item) => (
            <Link to={`/analyics/${item._id}`} key={item._id}>
              <div className="card">
                {item.type === "sarf" ? (
                  <img src="./images/sarf.jpg" alt="img" />
                ) : (
                  <img src="./images/water.jpg" alt="img" />
                )}
                <h2>{item.title}</h2>
              </div>
            </Link>
          ))}
          {/* <!-- Button trigger modal --> */}
          <button
            className="card"
            class="btn btn-primary"
            onClick={() => setOpenAddAnalyics(!openAddAnalyics)}
          >
            أضافه تحليل جديد
          </button>
        </div>
      )}
      {openAddAnalyics && (
        <AddAnalyics setOpenAddAnalyics={setOpenAddAnalyics} />
      )}
    </div>
  );
};
