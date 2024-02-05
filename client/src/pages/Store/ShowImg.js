import React from "react";
import "../modal.css";

export const ShowImg = ({ setShowOpen, showData }) => {
  console.log(showData.filename);
  return (
    <div className="showHugeImg p-4">
      <span className="close" onClick={() => setShowOpen(false)}>
        X
      </span>
      <h1>{`صورة البون : `}</h1>
      {showData.filename !== undefined ? (
        <img
          src={`https://api.albahren.com/${showData.filename}`}
          alt=""
          className="saveShowImgLimit"
        />
      ) : (
        <h1 className="no-pic">لا توجد صورة</h1>
      )}
    </div>
  );
};
