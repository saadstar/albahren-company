import { Link } from "react-router-dom";
import React from "react";
import { LineChart, Line, ResponsiveContainer, Tooltip } from "recharts";
import "./chartBox.css";
import { LoadingPage } from "../../Loading/LoadingPage";

export const ChartBox = ({ users, ar, navi }) => {
  const data = {
    color: "#8884d8",
    title: ar,
    number: users,
    dataKey: "users",
    percentage: 50,
    data: [
      { name: "Sun", users: 400 },
      { name: "Mon", users: 600 },
      { name: "tue", users: 300 },
      { name: "wed", users: 900 },
      { name: "thu", users: 400 },
      { name: "fri", users: 300 },
      { name: "sat", users: 100 },
    ],
  };
  return (
        <div className="chartBox">
          <div className="boxInfo">
            <div className="title">
              <i
                class="fa-solid fa-chart-simple"
                style={{ color: data.color }}
              ></i>
              <span>{data.title}</span>
            </div>
            <h1>{data.number}</h1>
            <Link to={`${navi}`} style={{ color: data.color }}>
              View All
            </Link>
          </div>
          <div className="chartInfo">
            <div className="chart">
              <ResponsiveContainer width="99%" height="100%">
                <LineChart data={data.data}>
                  <Tooltip
                    contentStyle={{ background: "transparent", border: "none" }}
                    labelStyle={{ display: "none" }}
                    position={{ x: 10, y: 70 }}
                  />
                  <Line
                    type="monotone"
                    dataKey={data.dataKey}
                    stroke={data.color}
                    strokeWidth={2}
                    dot={false}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
            <div className="texts">
              <span
                className="percentage "
                style={{ color: data.percentage < 0 ? "tomato" : "limegreen" }}
              >
                {data.percentage}%
              </span>
              <span className="duration">this month</span>
            </div>
          </div>
        </div>
  );
};
