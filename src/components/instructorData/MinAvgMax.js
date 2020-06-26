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
          { label: "Min", labelMobile: "Min", value: "min" },
          { label: "Avg", labelMobile: "Avg", value: "avg" },
          { label: "Max", labelMobile: "Max", value: "max" },
        ]}
      />
    </Form>
  );
};

export default MinAvgMax;
