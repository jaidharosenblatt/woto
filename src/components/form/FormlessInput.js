import React, { useState } from "react";
import { Space, Input } from "antd";
import { CheckCircleOutlined } from "@ant-design/icons";

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
              style={{ fontSize: 20 }}
              defaultValue={props.defaultValue}
              value={value}
              onChange={(e) => setValue(e.target.value)}
              onPressEnter={handleSubmit}
            />
          </h2>

          <CheckCircleOutlined onClick={handleSubmit} />
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
