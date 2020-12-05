import React, { useState, useEffect } from "react";
import { Card, Select } from "antd";
import DataPieChart from "./DataPieChart";
import LeftRightRow from "../../leftrightrow/LeftRightRow";
const PieChartCardSession = ({ data = [] }) => {
  const fields = Object.keys(data);
  const [field, setField] = useState();

  useEffect(() => {
    if (!field) {
      setField(fields[0]);
    }
  }, [fields, field]);

  return (
    <Card
      title={
        <LeftRightRow
          left={<h2>Questions</h2>}
          right={
            <Select
              defaultValue={"assignment"}
              style={{
                minWidth: 200,
                width: "100%",
                textTransform: "capitalize",
              }}
              onChange={(value) => setField(value)}
            >
              {fields?.map((option) => {
                return (
                  <Select.Option
                    style={{
                      textTransform: "capitalize",
                    }}
                    key={option}
                  >
                    {option}
                  </Select.Option>
                );
              })}
            </Select>
          }
        />
      }
    >
      <DataPieChart data={data[field] || []} />
    </Card>
  );
};

export default PieChartCardSession;
