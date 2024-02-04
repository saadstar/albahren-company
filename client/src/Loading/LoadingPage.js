import React from 'react'
import "./loading.css";

export const LoadingPage = () => {
  return (
    <div className="loadingPage">
      <div class="lds-roller">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  );
}
