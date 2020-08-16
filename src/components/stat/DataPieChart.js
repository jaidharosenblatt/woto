import React, { useState } from "react";
import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
  Sector,
} from "recharts";

var randomColor = require("randomcolor");

// Colors to begin with for pie chart
const COLORS = [
  "#40A9FF",
  "#0270C9",
  "#0C3F69",
  "#2A689C",
  "#032A4A",
  "#5386F4",
  "#164BBD",
  "#152E63",
];

const renderActiveShape = (props) => {
  const RADIAN = Math.PI / 180;
  const {
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    startAngle,
    endAngle,
    fill,
    payload,
    percent,
    value,
  } = props;
  const sin = Math.sin(-RADIAN * midAngle);
  const cos = Math.cos(-RADIAN * midAngle);
  const sx = cx + (outerRadius + 10) * cos;
  const sy = cy + (outerRadius + 10) * sin;
  const mx = cx + (outerRadius + 30) * cos;
  const my = cy + (outerRadius + 30) * sin;
  const ex = mx + (cos >= 0 ? 1 : -1) * 22;
  const ey = my;
  const textAnchor = cos >= 0 ? "start" : "end";

  return (
    <g>
      <Sector
        cx={cx}
        cy={cy}
        innerRadius={innerRadius}
        outerRadius={outerRadius}
        startAngle={startAngle}
        endAngle={endAngle}
        fill={fill}
      />
      <Sector
        cx={cx}
        cy={cy}
        startAngle={startAngle}
        endAngle={endAngle}
        innerRadius={outerRadius + 6}
        outerRadius={outerRadius + 10}
        fill={fill}
      />
      <path
        d={`M${sx},${sy}L${mx},${my}L${ex},${ey}`}
        stroke={fill}
        fill="none"
      />
      <circle cx={ex} cy={ey} r={2} fill={fill} stroke="none" />
      <text
        x={ex + (cos >= 0 ? 1 : -1) * 12}
        y={ey}
        textAnchor={textAnchor}
        fill="#333"
      >{`${(percent * 100).toFixed(2)}% ${payload.name.substring(0, 16)}${
        payload.name.length > 15 ? "..." : ""
      }
      `}</text>
      <text
        x={ex + (cos >= 0 ? 1 : -1) * 12}
        y={ey}
        dy={18}
        textAnchor={textAnchor}
        fill="#999"
      >
        {`${value} Students `}
      </text>
    </g>
  );
};

/**
 * @yasserelmzoudi pie chart that displays breakdown of given data
 * Uses preset COLORS and generates randomly as necessary
 * @param data object with key and value pairs
 * ex: data= [{ name: "Linked List", value: 400 },
  { name: "Array", value: 300 },
  { name: "Queue", value: 300 },
  { name: "Stack", value: 200 }]
 */
const DataPieChart = ({ data }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  COLORS.push(
    randomColor({
      count: COLORS.length - data.length,
      luminosity: "bright",
      hue: "#40A9FF",
    })
  );

  return (
    <ResponsiveContainer height={300}>
      <PieChart height={300}>
        <Legend verticalAlign="top" layout="horizontal" iconType="circle" />
        <Pie
          animationDuration={500}
          animationBegin={0}
          data={data}
          cx="50%"
          cy="50%"
          outerRadius={60}
          fill="#39a9"
          dataKey="value"
          labelLine
          fill="#8884d8"
          activeIndex={activeIndex}
          activeShape={renderActiveShape}
          onMouseEnter={(data, index) => setActiveIndex(index)}
        >
          {data.map((entry, index) => (
            <Cell
              key={COLORS[index % COLORS.length]}
              fill={COLORS[index % COLORS.length]}
            />
          ))}
        </Pie>
      </PieChart>
    </ResponsiveContainer>
  );
};

export default DataPieChart;
