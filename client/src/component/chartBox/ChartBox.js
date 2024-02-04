import { Link } from 'react-router-dom'
import React from "react";
import {
  LineChart,
  Line,
  ResponsiveContainer,
  Tooltip,
} from "recharts";
import "./chartBox.css";

export const ChartBox = (props) => {
 
    return (
      <div className="chartBox">
        <div className="boxInfo">
          <div className="title">
            <i class="fa-solid fa-chart-simple" style={{color:props.color}}></i>
            <span>{props.title}</span>
          </div>
          <h1>{props.number}</h1>
          <Link to={`${props.navi}`} style={{ color: props.color }}>
            View All
          </Link>
        </div>
        <div className="chartInfo">
          <div className="chart">
            <ResponsiveContainer width="99%" height="100%">
              <LineChart data={props.data}>
                <Tooltip
                   contentStyle={{ background: "transparent", border: "none" }}
                  labelStyle={{ display: "none" }}
                  position={{ x: 10, y: 70 }}
                />
                <Line
                  type="monotone"
                  dataKey={props.dataKey}
                  stroke={props.color}
                  strokeWidth={2}
                  dot={false}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
          <div className="texts">
            <span className="percentage "style={{color:props.percentage<0?"tomato":"limegreen"}}>{props.percentage}%</span>
            <span className="duration">this month</span>
          </div>
        </div>
      </div>
    );
}
