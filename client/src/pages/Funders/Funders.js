import React, { useState, useEffect } from "react";
import "./funder.css";
import axios from "axios";
import { FunderDetails } from "./FunderDetails";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";

export const Funders = ({ ar }) => {
  const [addCompany, setAddCompany] = useState(false);
  const [funderCompanyData, setFunderCompanyData] = useState([]);
  const [companyName, setCompanyName] = useState("");

  const postCompanyName = async (e) => {
    try {
      e.preventDefault();
      const res = await axios.post("http://localhost:3500/api/funderCompany", {
        companyName,
      });
      res.status === 200 && toast.success("تم اضافه الممول بنجاح");
      setAddCompany(false);
    } catch (err) {
      console.log(err);
    }
  };
  const fetchCompany = async () => {
    try {
      const res = await axios.get("http://localhost:3500/api/funderCompany");
      setFunderCompanyData(res.data);
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    fetchCompany();
    // postCompanyName();
  });
  return (
    <div className="funder">
      <div className="container">
        <div className="menurContainer">
          <div className="menur">
            {funderCompanyData.reverse().map((item) => {
              return (
                <Link
                  to={`/funders/${item._id}`}
                  style={{ textDecoration: "none" }}
                >
                  <div className="item listItem" key={item._id}>
                    <div className="itemTitle">{item.companyName}</div>
                  </div>
                </Link>
              );
            })}
            <div className="item listItem">
              <button
                type="button"
                class="btn btn-outline-success"
                onClick={() => setAddCompany(true)}
              >
                اضف ممول
              </button>
            </div>
          </div>
        </div>
        {ar === "برجاء اختيار شركه التمويل. " ? (
          <h1>برجاء اختيار شركه التمويل. </h1>
        ) : (
          <FunderDetails />
        )}
      </div>
      {addCompany && (
        <div className="myModal">
          <span className="close" onClick={() => setAddCompany(false)}>
            X
          </span>
          <h1>{`أضافه عنصر جديد`}</h1>
          <form onSubmit={(e) => e.preventDefault}>
            <div className="formItem d-flex direction-column">
              <label htmlFor="name">اسم الشركه: </label>
              <input
                name="name"
                type="text"
                onChange={(e) => setCompanyName(e.target.value)}
                required
              />
            </div>
            <button className="addButton mt-4" onClick={postCompanyName}>
              أضافه
            </button>
          </form>
        </div>
      )}
    </div>
  );
};
