import React, { useState, useEffect } from "react";
import { Form, Button, Input, Select, Checkbox, Row } from "antd";
const { Option } = Select;

const CustomizeField = ({ fielder, updateForm, passedForm }) => {
  const [field, setField] = useState();
  const [type, setType] = useState();
  const [form] = Form.useForm();
  var extrafields;

  const onConfirm = (values) => {
    for (var i = 0; i < passedForm.length; i++) {
      if (
        passedForm[i].label === field.label &&
        passedForm[i].type === field.type &&
        passedForm[i].type === field.type
      ) {
        updateForm(values, i);
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
    if (field.includeNA) {
      checkboxes.push("NA");
    }
  }

  if (type === "input") {
    extrafields = (
      <>
        <Form.Item name="checkboxes">
          <Checkbox.Group>
            <Checkbox value="required">
              {" "}
              Should this field be required?
            </Checkbox>
          </Checkbox.Group>
        </Form.Item>
      </>
    );
  }
  if (type === "select" || type === "tags") {
    extrafields = (
      <>
        <Form.Item name="options" label="Options">
          <Select
            mode="tags"
            showArrow={false}
            style={{ width: "500px" }}
            dropdownStyle={{ display: "none" }}
          ></Select>
        </Form.Item>

        <Form.Item name="checkboxes">
          <Checkbox.Group>
            <Checkbox value="NA"> Include NA as an option</Checkbox>
            <Checkbox value="required">
              {" "}
              Should this field be required?
            </Checkbox>
          </Checkbox.Group>
        </Form.Item>
      </>
    );
  }

  var ret = field ? (
    <>
      <div
        style={{
          position: "relative",
          top: "25px",
          left: "10px",
          width: "550px",
        }}
      >
        <Form
          onFinish={onConfirm}
          layout="vertical"
          form={form}
          initialValues={{
            label: field.label,
            type: field.type,
            options: field.options,
            checkboxes: checkboxes,
          }}
        >
          <Form.Item name="label" label="Field Name">
            <Input style={{ width: "500px" }} placeholder={field.label} />
          </Form.Item>

          <Form.Item name="type" label="Type">
            <Select
              onSelect={(value) => setType(value)}
              style={{ width: "500px" }}
            >
              <Option value="input">Input</Option>
              <Option value="select">Select</Option>
              <Option value="tags">Tag Select</Option>
            </Select>
          </Form.Item>

          {extrafields}

          <Button
            type="primary"
            htmlType="submit"
            block
            style={{ width: "500px" }}
          >
            Confirm Edit
          </Button>
        </Form>
      </div>
    </>
  ) : (
    <div
      style={{
        position: "relative",
        left: "10px",
        top: "25px",
        width: "550px",
        height: "350px",
        borderStyle: "dashed",
        borderWidth: "1px",
        backgroundColor: "#EBEBEB",
      }}
    >
      <Row align="center">
        <p style={{ marginTop: "150px", color: "grey" }}>
          {" "}
          Click a field to begin customizing your form.{" "}
        </p>
      </Row>
    </div>
  );

  return <>{ret}</>;
};
export default CustomizeField;
