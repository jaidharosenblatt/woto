import React, { useState } from "react";
import { Space, Input, Button } from "antd";
import { CheckOutlined } from "@ant-design/icons";

/**
 * Edit an Input inline without use a form
 * @param {props} onSubmit
 * @param {props} defaultValue
 */
const FormlessInput = (props) => {
  const [editing, setEditing] = useState(false);
  const [value, setValue] = useState(props.defaultValue);

  const handleSubmit = () => {
    setEditing(false);
    props.onSubmit(value);
  };

  return (
    <>
      {editing ? (
        <Space>
          <h2>
            <Input
              style={{ fontWeight: "bold", fontSize: 20, color: "#262626" }}
              defaultValue={props.defaultValue}
              value={value}
              onChange={(e) => setValue(e.target.value)}
              onPressEnter={handleSubmit}
            />
          </h2>
          <Button type="primary" onClick={handleSubmit}>
            <CheckOutlined />
          </Button>
        </Space>
      ) : (
        <h2 style={{ cursor: "pointer" }} onClick={() => setEditing(true)}>
          {value}
        </h2>
      )}
    </>
  );
};

export default FormlessInput;
