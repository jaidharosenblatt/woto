import { Card, Select, Skeleton } from "antd";
import React, { useEffect, useState } from "react";
import DataPieChart from "../../analytics/sessions/DataPieChart";
import LeftRightRow from "../../util-components/leftrightrow/LeftRightRow";

export default function TopicsPieChart({ questionsDistribution = [] }) {
  const [field, setField] = useState();
  const [chartData, setChartData] = useState([]);

  //   useEffect(() => {
  //     // set to first field on load
  //     updateField(0);
  //   }, [questionsDistribution]);

  const options = questionsDistribution.map((option) =>
    Object.keys(option).pop()
  );
  const capitalizedText = { textTransform: "capitalize" };

  const updateField = (fieldIndex) => {
    setField(fieldIndex);
    const newField = questionsDistribution[fieldIndex];
    const key = Object.keys(newField).pop();
    setChartData(newField[key]);
  };

  if (!questionsDistribution || questionsDistribution.length === 0) {
    return <Skeleton />;
  }
  return (
    <>
      <LeftRightRow
        left={<h2>Questions</h2>}
        right={
          <Select
            style={{ ...capitalizedText, minWidth: 200 }}
            value={field}
            onChange={updateField}
          >
            {options.map((option, i) => (
              <Select.Option style={capitalizedText} key={i}>
                {option}
              </Select.Option>
            ))}
          </Select>
        }
      />

      <DataPieChart nameKey="fieldName" valueKey="count" data={chartData} />
    </>
  );
}
