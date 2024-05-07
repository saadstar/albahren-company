import React, { useState, useEffect } from "react";
import "./funder.css";
import axios from "axios";
import { Link } from "react-router-dom";
import { Box } from "@mui/material";
import Header from "../../components/Header";

export const Funders = ({ ar }) => {
  const [funderCompanyData, setFunderCompanyData] = useState([]);

  const fetchCompany = async () => {
    try {
      const res = await axios.get("https://api.albahren.com/api/funderCompany");
      setFunderCompanyData(res.data);
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    fetchCompany();
  });
  return (
    <div className="processHomeContainer">
      <Box className="headerBox">
        <Header title={"كل الممولين"} subtitle={`استكشف كل الممولين هنا`} />
      </Box>
      {funderCompanyData.length === 0 ? (
        <div>please add some funder companies.......</div>
      ) : (
        <div className="processHome">
          {funderCompanyData.map((item) => (
            <Link to={`/funders/${item._id}`} key={item._id}>
              <div className="card">
                <img src="./images/funders.png" alt="img" />
                <h2>{item.companyName}</h2>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};
