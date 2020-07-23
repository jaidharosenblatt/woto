import React from "react";
import { Form, Button, Input, Select, Space } from "antd";
import { EditOutlined } from "@ant-design/icons";

const { Option } = Select;

const AdjustableQuestion = ({
  handleSubmit,
  questionForm,
  openEditWindow,
  edit,
}) => {
  const renderQuestionForm = [];
  var editButtons;

  function renderOptions(options, includeNA) {
    const ret = [];

    if (includeNA) {
      ret.push(
        <Option key="NA" value="NA">
          N/A
        </Option>
      );
    }

    options.forEach((option) => {
      ret.push(
        <Option key={option} value={option}>
          {option}
        </Option>
      );
    });

    return ret;
  }

  questionForm.forEach((item) => {
    editButtons = edit ? (
      <EditOutlined onClick={() => openEditWindow(item)} />
    ) : (
      <></>
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

      editButtons = edit ? (
        <EditOutlined onClick={() => openEditWindow(item)} />
      ) : (
        <></>
      );

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

      editButtons = edit ? (
        <EditOutlined onClick={() => openEditWindow(item)} />
      ) : (
        <></>
      );

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
    <Form onFinish={handleSubmit} layout="vertical">
      {renderQuestionForm}

      <Form.Item>
        <Button type="primary" htmlType="submit" block>
          Submit Your Question
        </Button>
      </Form.Item>
    </Form>
  );
};

export default AdjustableQuestion;
