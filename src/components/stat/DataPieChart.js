import React from "react";
import { ResponsiveContainer, PieChart, Pie, Cell, Legend } from "recharts";

var randomColor = require("randomcolor");

const RADIAN = Math.PI / 180;
const renderCustomizedLabel = ({
  cx,
  cy,
  midAngle,
  innerRadius,
  outerRadius,
  percent,
  index,
}) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text
      x={x}
      y={y}
      fill="white"
      textAnchor={x > cx ? "start" : "end"}
      dominantBaseline="central"
    >
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
};

/**
 * @yasserelmzoudi pie chart that displays breakdown of given data
 * @param data object with key and value pairs
 * ex: data= [{ name: "Linked List", value: 400 },
  { name: "Array", value: 300 },
  { name: "Queue", value: 300 },
  { name: "Stack", value: 200 }]
 */
const DataPieChart = ({ data }) => {
  const COLORS = randomColor({
    count: data.length,
    luminosity: "bright",
    hue: "#40A9FF",
  });

  return (
    <ResponsiveContainer height={250}>
      <PieChart height={250}>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          outerRadius={100}
          fill="#39a9"
          dataKey="value"
          label={renderCustomizedLabel}
          labelLine={false}
        >
          {data.map((entry, index) => (
            <Cell
              key={COLORS[index % COLORS.length]}
              fill={COLORS[index % COLORS.length]}
            />
          ))}
        </Pie>
        <Legend
          verticalAlign="middle"
          height={90}
          layout="vertical"
          align="right"
          iconType="circle"
        />
      </PieChart>
    </ResponsiveContainer>
  );
};

export default DataPieChart;
