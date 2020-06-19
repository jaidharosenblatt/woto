import React from "react";
import { Form, Radio, Col, Space } from "antd";

/**
 * @matthewsclar @jaidharosenblatt Segmented control with a variable options
 * and conditional rendering for text on mobile/desktop
 * @param name the name of the field to output
 * @param label the label of the radio group
 * @param onChange function to call on click
 * @param isVertical switch the form layout to be displayed vertically
 * @param {options} label the default label to display
 * @param {options} labelMobile (optional) the label to display an option on mobile (if null then render normal label)
 * @param {options} value the value of an option
 *
 * Example usage
 * options={[
    {
      label: "This is a very long option",
      labelMobile: "Shorter Option",
      value: true,
    },
    {
      label: "Short Option",
      value: false,
    },
  ]}
 */

const SegmentedControl = ({ name, label, onChange, options, isVertical }) => {
  const buttonWidth = isVertical ? "100%" : 100 / options.length + "%";

  //Creating an array of Radio buttons with text according to viewport
  const mobileOptions = [];
  const desktopOptions = [];
  options.forEach((option) => {
    mobileOptions.push(
      <Radio.Button
        key={option.value}
        style={{ width: buttonWidth }}
        value={option.value}
      >
        {option.labelMobile == null ? option.label : option.labelMobile}
      </Radio.Button>
    );
    desktopOptions.push(
      <Radio.Button
        key={option.value}
        style={{ width: buttonWidth }}
        value={option.value}
      >
        {option.label}
      </Radio.Button>
    );
  });

  return (
    <Form.Item name={name} label={label} rules={[{ required: true }]}>
      <Radio.Group
        buttonStyle="solid"
        className="SegmentedController"
        onChange={onChange}
        name={name}
      >
        <Col xs={0} lg={24}>
          {isVertical ? (
            <Space
              style={{ marginTop: "48px", height: "1005", width: "100%" }}
              direction="vertical"
            >
              {desktopOptions}
            </Space>
          ) : (
            <div>{desktopOptions}</div>
          )}
        </Col>
        <Col xs={24} lg={0}>
          {isVertical ? (
            <Space
              style={{ marginTop: "48px", width: "100%" }}
              direction="vertical"
            >
              {mobileOptions}
            </Space>
          ) : (
            <div>{mobileOptions}</div>
          )}
        </Col>
      </Radio.Group>
    </Form.Item>
  );
};

export default SegmentedControl;
