import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";


function CustomTooltip({ payload, label, active, units }) {
  if (active) {
    return (
      <div
        className="custom-tooltip"
        style={{
          backgroundColor: "rgba(255, 255, 255, 0.8)",
          border: "1px solid rgb(169, 169, 169, 0.8)",
          borderRadius: "2px",
        }}
      >
        <p
          className="label"
          style={{ padding: "10px" }}
        >{`${label} : ${payload[0].value} ${units}`}</p>
      </div>
    );
  }

  return null;
}


const DayWeekChartElement = (props) => {
  //height={250} minWidth= "320px
  return (
    <ResponsiveContainer height={250}>
      <BarChart
    
        data={props.list}
        margin={{ top: 5, right: 20, left: 0, bottom: 5 }}
        onClick={props.onClick}
      >
        <XAxis dataKey={props.xAxis} />
        <YAxis axisLine={false} />
        <Tooltip content={<CustomTooltip units={props.units} />} />

        <Bar dataKey={props.choice} fill="#40A9FF"/>
      </BarChart>
    </ResponsiveContainer>
  );
};

export default DayWeekChartElement;
