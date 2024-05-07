import React, { useEffect, useState } from "react";
import "../ProcessHome/processHome.css";
import { Link } from "react-router-dom";
import axios from "axios";
import { LoadingPage } from "../../Loading/LoadingPage";
import { Box } from "@mui/material";
import Header from "../../components/Header";

export const Analyics = () => {
  const [analyicsData, setAnalyicsData] = useState([]);

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
    <div className="processHomeContainer">
      <Box className="headerBox">
        <Header title={"التقارير"} subtitle={`استكشف كل التقارير من هنا`} />
      </Box>
      {analyicsData.length === 0 ? (
        <div>
          <LoadingPage />
        </div>
      ) : (
        <div className="processHome">
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
        </div>
      )}
    </div>
  );
};
