import React, {  useEffect, useState } from 'react'

export const FinalReport = ({ data1, data2, loading }) => {
    const [maxData,setMaxData]=useState({});
    const [maxData1,setMaxData1]=useState({});
    const [minData,setMinData]=useState({});
    
    const dataOne = {
      مواسير: data1[0].tubeNum,
      مياه: data1[0].waterNum,
      توريد: data1[0].exportNum,
      المطابق: data1[0].floorNum,
      الغرف: data1[0].roomNum,
      المنزليه: data1[0].houseNum,
      الاخشاب: data1[0].woodNum,
      التكفيف: data1[0].blindNum,
      المحابس: data1[0].lockNum,
    };
    const dataTwo = {
      مواسير: data2[0].tubeNum,
      مياه: data2[0].waterNum,
      توريد: data2[0].exportNum,
      المطابق: data2[0].floorNum,
      الغرف: data2[0].roomNum,
      المنزليه: data2[0].houseNum,
      الاخشاب: data2[0].woodNum,
      التكفيف: data2[0].blindNum,
      المحابس: data2[0].lockNum,
  };
 
    const minTwo = Object.values(dataTwo).sort((prev, next) => prev - next)[0];
    const maxTwo = Object.values(dataTwo).sort((prev, next) => next - prev)[0];  
    const minOne = Object.values(dataOne).sort((prev, next) => prev - next)[0];
    const maxOne = Object.values(dataOne).sort((prev, next) => next - prev)[0];  
  const midle = maxTwo - minTwo;
    const data2Arr = [
        {
            مواسير: data2[0].tubeNum
        },
        {مياه: data2[0].waterNum},
        {توريد: data2[0].exportNum},
        {المطابق: data2[0].floorNum},
        {الغرف: data2[0].roomNum},
        {المنزليه: data2[0].houseNum},
        {الاخشاب: data2[0].woodNum},
        {التكفيف: data2[0].blindNum},
        {المحابس: data2[0].lockNum},      
    ];
    const data1Arr = [
        {
            مواسير: data2[0].tubeNum
        },
        {مياه: data1[0].waterNum},
        {توريد: data1[0].exportNum},
        {المطابق: data1[0].floorNum},
        {الغرف: data1[0].roomNum},
        {المنزليه: data1[0].houseNum},
        {الاخشاب: data1[0].woodNum},
        {التكفيف: data1[0].blindNum},
        {المحابس: data1[0].lockNum},      
    ];
     
  useEffect(() => {
    const mapping2 = () => {
      data2Arr.map((item) => {
        if (Object.values(item) == maxTwo) {
          setMaxData(item);
        }
        if (Object.values(item) == minTwo) {
          setMinData(item);
        } 
      });
    }
    
    mapping2();
  }, ['']);
  useEffect(() => {
    const mapping = () => {
      data1Arr.map((item) => {
        //  if (Object.keys(item) === Object.keys(maxData)) {
        //    setMaxData1(Object.keys(item));
        //  }
        const wow = Object.keys(item) === Object.keys(item);
        console.log(wow);
      });

    };
    mapping();
  })
    return (
      <>
        {loading === true ? (
          <div className="loader"></div>
        ) : (
          <div className="finalReport">
            <p className="bg-red">
              نلاحظ ارتفاع في سعر بند {Object.keys(maxData)} حيث ان السعر الأولي
              له لحظه بدء العمليه كان 123 وهو الان بسعر {maxTwo}.{" "}
            </p>
            <p className="bg-yellow">
              كما نجد استقرار ملحوظ في سعر بند الاخشاب حيث ان سعره الأولي هو
              2332 وسعره الان هو 34342 وبلغت نسبه التضخم فيه 23%{" "}
            </p>
            <p className="bg-green">
              نلاحظ انخفاض في سعر بند {Object.keys(minData)} حيث ان السعر الأولي
              له لحظه بدء العمليه كان 123 وهو الان بسعر {minTwo}.{" "}
            </p>
          </div>
        )}
      </>
    );
}
