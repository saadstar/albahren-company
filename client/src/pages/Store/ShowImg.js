import React from "react";
import "../modal.css";

export const ShowImg = ({ setShowOpen, showData }) => {
  return (
    <div className="add">
      <div className="deleteModal" style={{ height: "550px", width: "550px" }}>
        <span className="close" onClick={() => setShowOpen(false)}>
          X
        </span>
        <h2 className="headerBox">{`صورة البون : `}</h2>
        <div className="showImgImg" style={{ display: "block" }}>
          {showData.filename !== undefined ? (
            <img
              src={`https://api.albahren.com/${showData.filename}`}
              alt=""
              className="showImgImg"
            />
          ) : (
            <img src="./images/noimg.png" alt="" className="showImgImg" />
          )}
        </div>
      </div>
    </div>
  );
};
