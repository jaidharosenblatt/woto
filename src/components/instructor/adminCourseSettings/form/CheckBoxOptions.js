import React from "react";
import { Form, Checkbox, Tooltip, Space } from "antd";
import { QuestionCircleOutlined } from "@ant-design/icons";

export default function CheckBoxOptions() {
  return (
    <Form.Item name="checkboxes">
      <Checkbox.Group style={{ width: "100%" }}>
        <Checkbox value="required">Should this field be required?</Checkbox>
        <Checkbox value="showInTable" style={{ marginLeft: 0 }}>
          <Space size={4}>
            Show this field in the Woto Table?
            <Tooltip
              title={
                <>
                  <p style={{ color: "white", paddingBottom: "5px" }}>
                    The Woto Table is the space where students will collaborate
                    with one another.{" "}
                  </p>
                  <p style={{ color: "white" }}>
                    Showing a field in the Woto Table will make student's inputs
                    to that field visible to other students and allow them to
                    use that information to group up.
                  </p>{" "}
                </>
              }
            >
              <QuestionCircleOutlined />
            </Tooltip>
          </Space>
        </Checkbox>
      </Checkbox.Group>
    </Form.Item>
  );
}
