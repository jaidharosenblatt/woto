import React from "react";
import { Form, Button, Input, Select, Space } from "antd";
import { EditOutlined } from "@ant-design/icons";
import { defaultFields } from "./defaultFields";
const { Option } = Select;

/**
 * @matthewsclar dynamically render a fields object into a form
 * @param {props} onFormSubmit handle form submit
 * @param {props} CTA button text; default is "Submit Your Question"
 * @param {props} questionForm array of fields to render (optional)
 * @param {props} edit whether or not to make form editable (optional)
 * @param {props} openEditWindow open edit of window (optional)
 */
const AdjustableQuestion = (props) => {
  const renderQuestionForm = [];
  var editButtons;
  var fields = props.questionForm;

  if (!props.questionForm) {
    fields = defaultFields;
  }

  function renderOptions(options, includeNA) {
    const ret = [];
    if (includeNA) {
      ret.push(
        <Option key="NA" value="NA">
          N/A
        </Option>
      );
    }
    options &&
      options.forEach((option) => {
        ret.push(
          <Option key={option} value={option}>
            {option}
          </Option>
        );
      });

    return ret;
  }

  const renderField = (field) => {
    const Options = renderOptions(field.options, field.includeNA);
    switch (field.type) {
      case "input":
        return <Input placeholder={field.placeholder} />;
      case "select":
        return <Select placeholder={field.placeholder}>{Options}</Select>;
      case "tags":
        return (
          <Select placeholder={field.placeholder} mode="tags">
            {Options}
          </Select>
        );
    }
  };

  return (
    <Form onFinish={props.onFormSubmit} layout="vertical">
      {fields.map((field) => {
        return (
          <Form.Item
            key={field.label}
            label={
              <Space size={2}>
                {field.label}
                {props.edit && (
                  <EditOutlined onClick={() => props.openEditWindow(field)} />
                )}
              </Space>
            }
            required={field.required}
            rules={[
              {
                required: field.required,
                message: `Please input a value for ${field.label.toLowerCase()}`,
              },
            ]}
          >
            {renderField(field)}
          </Form.Item>
        );
      })}
      <Form.Item>
        <Button type="primary" htmlType="submit" block>
          {props.CTA ? props.CTA : "Submit Your Question"}
        </Button>
      </Form.Item>
    </Form>
  );
};

export default AdjustableQuestion;
