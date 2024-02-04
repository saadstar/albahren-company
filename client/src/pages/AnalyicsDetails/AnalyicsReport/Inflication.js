import React from 'react';

export const Inflication = ({ loading, data1, data2, analyicsData }) => {
  return (
    <div className="inflicationBox">
      {loading === true ? (
        <div className="loader"></div>
      ) : (
        <div className="inflication">
          <div className="inflicationMean">
            <p>التضخم هو فرق الاسعار ما بين السعر الثانوي والسعر الاولي.</p>
            <p>السعر هو سعر البند لكل وحده او متر مكعب.</p>
          </div>
          <div className="inflicationFlex">
            <h3>التضخم الكلي:</h3>
            <p>{data2[0]?.value - data1[0]?.value} جنيها</p>
          </div>
          <div className="inflicationFlex">
            <h3>تضخم المواسير :</h3>
            <p>{data2[0]?.tubeNum - data1[0]?.tubeNum} جنيها</p>
          </div>
          <div className="inflicationFlex">
            <h3>تضخم الحديد :</h3>
            <p>{data2[0]?.feNum - data1[0]?.feNum} جنيها</p>
          </div>
          <div className="inflicationFlex">
            <h3>تضخم الاسمنت :</h3>
            <p>{data2[0]?.cementNum - data1[0]?.cementNum} جنيها</p>
          </div>
          <div className="inflicationFlex">
            <h3>تضخم الرمل :</h3>
            <p>{data2[0]?.sandNum - data1[0]?.sandNum} جنيها</p>
          </div>
          <div className="inflicationFlex">
            <h3>تضخم السن :</h3>
            <p>{data2[0]?.senNum - data1[0]?.senNum} جنيها</p>
          </div>
          <div className="inflicationFlex">
            <h3>تضخم المصناعيه :</h3>
            <p>{data2[0]?.workerNum - data1[0]?.workerNum} جنيها</p>
          </div>
          {analyicsData.type === "sarf" && (
            <div className="inflicationFlex">
              <h3>تضخم المطابق :</h3>
              <p>{data2[0]?.floorNum - data1[0]?.floorNum} جنيها</p>
            </div>
          )}
          <div className="inflicationFlex">
            <h3>تضخم الغرف :</h3>
            <p>{data2[0]?.roomNum - data1[0]?.roomNum} جنيها</p>
          </div>
          {analyicsData.type === "sarf" && (
            <div className="inflicationFlex">
              <h3>تضخم الوصلات المنزليه :</h3>
              <p>{data2[0]?.houseNum - data1[0]?.houseNum} جنيها</p>
            </div>
          )}
          {analyicsData.type === "sarf" && (
            <div className="inflicationFlex">
              <h3>تضخم الاخشاب :</h3>
              <p>{data2[0]?.woodNum - data1[0]?.woodNum} جنيها</p>
            </div>
          )}
          {analyicsData.type === "sarf" && (
            <div className="inflicationFlex">
              <h3>تضخم التجفيف :</h3>
              <p>{data2[0]?.blindNum - data1[0]?.blindNum} جنيها</p>
            </div>
          )}
          <div className="inflicationFlex">
            <h3>تضخم المحابس :</h3>
            <p>{data2[0]?.lockNum - data1[0]?.lockNum} جنيها</p>
          </div>
          {analyicsData.type === "water" && (
            <div className="inflicationFlex">
              <h3>تضخم وصلات المياه :</h3>
              <p>{data2[0]?.waterNum - data1[0]?.waterNum} جنيها</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
