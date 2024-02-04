import React from 'react'
import {  Bar, BarChart, ResponsiveContainer, Tooltip } from 'recharts';
import "./chartBox.css"
export const BarChartBox = (props) => {
   
  return (
    <div className="barChartBox">
      <h1>{props.title}</h1>
      <div className="chartt">
        <ResponsiveContainer width="99%" height={150}>
          <BarChart
            width={150}
            height={60}
            data={props.data}
            margin={{
              top: 5,
              right: 0,
              left: 0,
              bottom: 5,
            }}
          >
            <Tooltip
              contentStyle={{ background: "#2a3447", borderRadius: "5px" }}
              labelStyle={{ display: "none" }}
              cursor={{ fill: "none" }}
              position={{ x: 50, y: 70 }}
            />
            <Bar
              type="monotone"
              dataKey={props.dataKey}
              stroke="#8884d8"
              fill={props.color}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
