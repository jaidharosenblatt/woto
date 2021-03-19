import React from "react";
import { Select, Form, Row, Col } from "antd";
import { ClockCircleOutlined } from "@ant-design/icons";

export default function TimeSelect({
  options,
  endTimeOption,
  endTime,
  clockIcon,
}) {
  return (
    <div className="icon-textbox">
      {clockIcon === false ? null : <ClockCircleOutlined />}

      <Row gutter={4} style={{ width: "100%" }}>
        <Col>
          <Form.Item
            style={{ width: "150px" }}
            initialValue={options[0].key}
            name="startTime"
          >
            {/* on change callback function passed in as a prop */}
            <Select style={{ width: "100%" }} showSearch>
              {options}
            </Select>
          </Form.Item>
        </Col>
        <Col align="center">
          <p style={{ fontSize: 20, color: "#D9D9D9" }}>-</p>
        </Col>

        <Col>
          <Form.Item
            style={{ width: "150px" }}
            initialValue={endTime ? endTimeOption.key : options[4].key}
            name="endTime"
          >
            <Select style={{ width: "100%" }} showSearch>
              {options}
            </Select>
          </Form.Item>
        </Col>
      </Row>
    </div>
  );
}
