import React, { useEffect, useState } from "react";
import "./processHome.css";
import axios from "axios";
import { Link } from "react-router-dom";
import { LoadingPage } from "../../Loading/LoadingPage";
import { Box } from "@mui/material";
import Header from "../../components/Header";

export const ProcessHome = () => {
  const [processData, setProcessData] = useState([]);

  const fetchProcess = async () => {
    try {
      const res = await axios.get("https://api.albahren.com/api/process");
      setProcessData(res.data);
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    fetchProcess();
  });
  return (
    <div className="processHomeContainer">
      <Box className="headerBox">
        <Header title={"كل العمليات"} subtitle={`استكشف كل العمليات هنا`} />
      </Box>
      {processData.length === 0 ? (
        <div>
          <LoadingPage />
        </div>
      ) : (
        <div className="processHome">
          {processData.map((item) => (
            <Link to={`/process/${item._id}`} key={item._id}>
              <div className="card">
                <img src="./images/apartment.jpg" alt="img" />
                <h2>{item.title}</h2>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};
