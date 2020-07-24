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

  fields.forEach((item) => {
    editButtons = props.edit && (
      <EditOutlined onClick={() => props.openEditWindow(item)} />
    );
    if (item.type === "input") {
      renderQuestionForm.push(
        <Form.Item
          key={item.label}
          label={
            <Space size={2}>
              {item.label} {editButtons}
            </Space>
          }
          rules={[{ required: item.required }]}
          required={item.required}
        >
          <Input />
        </Form.Item>
      );
    }
    if (item.type === "select") {
      const Options = renderOptions(item.options, item.includeNA);
      renderQuestionForm.push(
        <Form.Item
          key={item.label}
          label={
            <Space size={2}>
              {item.label} {editButtons}
            </Space>
          }
          rules={[{ required: item.required }]}
          required={item.required}
        >
          <Select>{Options}</Select>
        </Form.Item>
      );
    }
    if (item.type === "tags") {
      const Options = renderOptions(item.options, item.includeNA);

      renderQuestionForm.push(
        <Form.Item
          key={item.label}
          label={
            <Space size={2}>
              {item.label} {editButtons}
            </Space>
          }
          rules={[{ required: item.required }]}
          required={item.required}
        >
          <Select mode="tags">{Options}</Select>
        </Form.Item>
      );
    }
  });

  return (
    <Form onFinish={props.onFormSubmit} layout="vertical">
      {renderQuestionForm}
      <Form.Item>
        <Button type="primary" htmlType="submit" block>
          {props.CTA ? props.CTA : "Submit Your Question"}
        </Button>
      </Form.Item>
    </Form>
  );
};

export default AdjustableQuestion;
