import React from "react";
import { Form, Button, Input, Select, Card, Space } from "antd";
import { EditOutlined } from "@ant-design/icons";

const { Option } = Select;

const AdjustableQuestion = ({ questionForm, openEditWindow, edit }) => {
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
      <EditOutlined
        style={{ position: "relative", left: "475px", bottom: "11px" }}
        onClick={() => openEditWindow(item)}
      />
    ) : (
      <></>
    );
    if (item.type === "input") {
      renderQuestionForm.push(
        <Form.Item
          key={item.label}
          label={item.label}
          rules={[{ required: item.required }]}
          required={item.required}
        >
          {editButtons}
          <Input />
        </Form.Item>
      );
    }
    if (item.type === "select") {
      const Options = renderOptions(item.options, item.includeNA);

      editButtons = edit ? (
        <EditOutlined
          style={{ position: "relative", left: "475px", bottom: "11px" }}
          onClick={() => openEditWindow(item)}
        />
      ) : (
        <></>
      );

      renderQuestionForm.push(
        <Form.Item
          key={item.label}
          label={item.label}
          rules={[{ required: item.required }]}
          required={item.required}
        >
          {editButtons}
          <Select>{Options}</Select>
        </Form.Item>
      );
    }
    if (item.type === "tags") {
      const Options = renderOptions(item.options, item.includeNA);

      editButtons = edit ? (
        <EditOutlined
          style={{ position: "relative", left: "475px", bottom: "11px" }}
          onClick={() => openEditWindow(item)}
        />
      ) : (
        <></>
      );

      renderQuestionForm.push(
        <Form.Item
          key={item.label}
          label={item.label}
          rules={[{ required: item.required }]}
          required={item.required}
        >
          {editButtons}
          <Select mode="tags">{Options}</Select>
        </Form.Item>
      );
    }
  });

  return (
    <>
      <Card
        title={
          <Space direction="vertical">
            <h2>I'm Working On</h2>
            <p>
              Submit what you are working on in order to work together with your
              classmates.
            </p>
          </Space>
        }
      >
        <Form layout="vertical">
          {renderQuestionForm}

          <Form.Item>
            <Button type="primary" htmlType="submit" block>
              Submit Your Question
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </>
  );
};

export default AdjustableQuestion;
