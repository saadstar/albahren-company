import React, { useEffect, useState } from "react";
import { Bar, BarChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

export const BarChartBox = ({ data, price, analyicsData }) => {
  const [mydata, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const fetchData = () => {
      setLoading(false);
      setData(data[0]);
      setLoading(true);
    };
    fetchData();
  });
  console.log(mydata)
  const visitdata =
    loading === true
      ? [
          {
            name: "المواسير",
            السعر: mydata.tubeNum,
            pv: 2400,
            amt: 2400,
          },
          {
            name: "الحديد",
            السعر: mydata.feNum,
            pv: 2400,
            amt: 2400,
          },
          {
            name: "الاسمنت",
            السعر: mydata.cementNum,
            pv: 2400,
            amt: 2400,
          },
          {
            name: "الرمل",
            السعر: mydata.sandNum,
            pv: 2400,
            amt: 2400,
          },
          {
            name: "المصناعيه",
            السعر: mydata.workerNum,
            pv: 2400,
            amt: 2400,
          },
          {
            name: "الغرف",
            السعر: mydata.roomNum,
            pv: 1398,
            amt: 2210,
          },
          {
            name: "المحابس",
            السعر: mydata.lockNum,
            pv: 3800,
            amt: 2500,
          },
          {
            name: "السن",
            السعر: mydata.senNum,
            pv: 2400,
            amt: 2400,
          },
          analyicsData.type === "sarf" && {
            name: "المنزليه",
            السعر: mydata.houseNum,
            pv: 9800,
            amt: 2290,
          },
          analyicsData.type === "sarf" && {
            name: "المطابق",
            السعر: mydata.floorNum,
            pv: 2400,
            amt: 2400,
          },
          analyicsData.type === "sarf" && {
            name: "الاخشاب",
            السعر: mydata.woodNum,
            pv: 3908,
            amt: 2000,
          },
          analyicsData.type === "sarf" && {
            name: "التجفيف",
            السعر: mydata.blindNum,
            pv: 4800,
            amt: 2181,
          },
          analyicsData.type === "water" && {
            name: "وصلات المياه",
            السعر: mydata.waterNum,
            pv: 4300,
            amt: 2100,
          },
        ]
      : [
          {
            name: "المواسير",
            السعر: 122,
            pv: 2400,
            amt: 2400,
          },
          {
            name: "المطابق",
            السعر: 10,
            pv: 2400,
            amt: 2400,
          },
          {
            name: "الغرف",
            السعر: 1000,
            pv: 1398,
            amt: 2210,
          },
          {
            name: "المنزليه",
            السعر: 1000,
            pv: 9800,
            amt: 2290,
          },
          {
            name: "الاخشاب",
            السعر: 1000,
            pv: 3908,
            amt: 2000,
          },
          {
            name: "التكفيف",
            السعر: 1000,
            pv: 4800,
            amt: 2181,
          },
          {
            name: "المحابس",
            السعر: 1000,
            pv: 3800,
            amt: 2500,
          },
          {
            name: "وصلات المياه",
            السعر: 1000,
            pv: 4300,
            amt: 2100,
          },
        ];
  return (
    <div className="box">
      {loading === false ? (
        <div className="loader"></div>
      ) : (
        <div className="barChartBox">
          {price === "one" ? (
            <h1>تحليل المصروفات بالسعر وقت الشراء : </h1>
          ) : (
            <h1>تحليل المصروفات بالسعر الحالي : </h1>
          )}
          <div className="chartt">
            <ResponsiveContainer width="99%" height={250}>
              <BarChart
                width={150}
                height={60}
                data={visitdata}
                margin={{
                  top: 5,
                  right: 0,
                  left: 0,
                  bottom: 5,
                }}
              >
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip
                  contentStyle={{ background: "#2a3447", borderRadius: "5px" }}
                  cursor={{ fill: "none" }}
                  position={{ x: 50, y: 70 }}
                />
                <Bar
                  type="monotone"
                  dataKey={"السعر"}
                  stroke="#8884d8"
                  fill={price === "one" ? "#FF8042" : "rgb(60, 219, 60)"}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      )}
    </div>
  );
};
