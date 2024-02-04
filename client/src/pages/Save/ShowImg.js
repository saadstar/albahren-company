import React from "react";
import "../modal.css";

export const ShowImg = ({ setShowImgOpen, showData }) => {
  return (
    <div className="showHugeImg p-4">
      <span className="close" onClick={() => setShowImgOpen(false)}>
        X
      </span>
      <h1>{`صورة الايصال : `}</h1>
      {showData.filename !== undefined ? (
        <img
          src={`http://localhost:3500/${showData.filename}`}
          alt=""
          className="saveShowImgLimit"
        />
      ) : (
        <h1 className="no-pic">لا توجد صوره </h1>
      )}
    </div>
  );
};
