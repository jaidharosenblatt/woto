import React from "react";
import SegmentedControl from "../../form/SegmentedControl";
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
          { label: "25th", value: "min" },
          { label: "Mean", value: "avg" },
          { label: "75th", value: "max" },
        ]}
      />
    </Form>
  );
};

export default MinAvgMax;
