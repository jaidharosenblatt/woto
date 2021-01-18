import React, { useState, useEffect } from "react";
import { Form, Button, Input, Select, Col, Space } from "antd";
import "./customform.css";
import CheckBoxOptions from "./CheckBoxOptions";

const { Option } = Select;

const CustomizeField = ({ fielder, updateForm, passedForm, deleteField }) => {
  const [field, setField] = useState();
  const [type, setType] = useState();
  const [form] = Form.useForm();

  const onConfirm = (values) => {
    for (var i = 0; i < passedForm.length; i++) {
      if (
        passedForm[i].label === field.label &&
        passedForm[i].type === field.type
      ) {
        updateForm(values, i);
        break;
      }
    }
  };

  const deleteF = () => {
    for (var i = 0; i < passedForm.length; i++) {
      if (
        passedForm[i].label === field.label &&
        passedForm[i].type === field.type
      ) {
        deleteField(field);
        break;
      }
    }
  };

  useEffect(() => {
    setField(fielder);
    form.resetFields();
  }, [fielder, field, form]);

  useEffect(() => {
    if (fielder) {
      setType(fielder.type);
    }
  }, [fielder]);

  if (field) {
    var checkboxes = [];
    if (field.required) {
      checkboxes.push("required");
    }
    if (field.showInTable) {
      checkboxes.push("showInTable");
    }
  }

  if (!field) {
    return (
      <div className="empty-field-container">
        <p>Click a field to begin customizing your form </p>
      </div>
    );
  }

  const selectBasedField = ["select-fixed", "select", "tags"].includes(type);

  return (
    <div className="field-edit-wrapper">
      <Col span={24}>
        <Form
          onFinish={onConfirm}
          layout="vertical"
          form={form}
          initialValues={{
            ...field,
            checkboxes: checkboxes,
          }}
        >
          <Form.Item name="label" label="Field Name">
            <Input placeholder="Label this field" />
          </Form.Item>
          <Form.Item name="placeholder" label="Placeholder">
            <Input placeholder="Describe the expected value for this field" />
          </Form.Item>

          <Form.Item name="type" label="Type">
            <Select onSelect={(value) => setType(value)}>
              <Option value="select">Select</Option>
              <Option value="tags">Multiple Select</Option>
              <Option value="select-fixed">Select with Fixed Options</Option>
              <Option value="input">Input</Option>
            </Select>
          </Form.Item>

          {selectBasedField && (
            <Form.Item
              name="options"
              label="Options"
              style={{ paddingBottom: "20px" }}
            >
              <Select
                mode="tags"
                showArrow={false}
                dropdownStyle={{ display: "none" }}
              />
            </Form.Item>
          )}
          <CheckBoxOptions />
          <Space style={{ width: "100%" }}>
            <Button type="primary" htmlType="submit" block>
              Confirm Edit
            </Button>

            <Button type="danger" block onClick={deleteF}>
              Delete Field
            </Button>
          </Space>
        </Form>
      </Col>
    </div>
  );
};
export default CustomizeField;
