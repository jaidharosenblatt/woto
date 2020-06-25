import React from "react";
import SegmentedControl from "../form/SegmentedControl";
import { Form } from "antd";

const MinAvgMax = ({ name, initialValue, onChange }) => {
  return (
    <Form>
      <SegmentedControl
        maxWidth="300px"
        name={name}
        onChange={onChange}
        initialValue={initialValue}
        options={[
          { label: "Minimum", labelMobile: "Min", value: "min" },
          { label: "Average", labelMobile: "Avg", value: "avg" },
          { label: "Maximum", labelMobile: "Max", value: "max" },
        ]}
      />
    </Form>
  );
};

export default MinAvgMax;
