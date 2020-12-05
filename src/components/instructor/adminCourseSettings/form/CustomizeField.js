import React, { useState, useEffect } from "react";
import {
  Form,
  Button,
  Input,
  Select,
  Checkbox,
  Col,
  Row,
  Space,
  Tooltip,
} from "antd";
import { QuestionCircleOutlined } from "@ant-design/icons";
import "./customform.css";

const { Option } = Select;

const CustomizeField = ({ fielder, updateForm, passedForm, deleteField }) => {
  const [field, setField] = useState();
  const [type, setType] = useState();
  const [form] = Form.useForm();
  var extrafields;

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
    if (field.includeNA) {
      checkboxes.push("NA");
    }
    if (field.showInTable) {
      checkboxes.push("showInTable");
    }
  }

  if (type === "input") {
    extrafields = (
      <>
        <Form.Item name="checkboxes">
          <Checkbox.Group style={{ width: "100%" }}>
            <Row>
              <Col xs={24}>
                <Checkbox value="required">
                  Should this field be required?
                </Checkbox>
              </Col>
              <Col xs={24}>
                <Checkbox value="showInTable">
                  Show field in the Woto Table?{"  "}
                  <Tooltip
                    title={
                      <>
                        <p style={{ color: "white", paddingBottom: "5px" }}>
                          The Woto Table is the space where students will
                          collaborate with one another.{" "}
                        </p>
                        <p style={{ color: "white" }}>
                          Showing a field in the Woto Table will make student's
                          inputs to that field visible to other students and
                          allow them to use that information to group up.
                        </p>{" "}
                      </>
                    }
                  >
                    <QuestionCircleOutlined />
                  </Tooltip>
                </Checkbox>
              </Col>
            </Row>
          </Checkbox.Group>
        </Form.Item>
      </>
    );
  }
  if (type === "select" || type === "tags") {
    extrafields = (
      <Space direction="vertical" style={{ width: "100%" }}>
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

        <Form.Item name="checkboxes">
          <Checkbox.Group style={{ width: "100%" }}>
            <Row>
              <Col>
                <Checkbox value="NA">Include NA as an option</Checkbox>
              </Col>
              <Col>
                <Checkbox value="required">
                  Should this field be required?
                </Checkbox>
              </Col>
            </Row>
            <Checkbox value="showInTable">
              Show this field in the Woto Table? {"  "}{" "}
              <Tooltip
                title={
                  <>
                    <p style={{ color: "white", paddingBottom: "5px" }}>
                      The Woto Table is the space where students will
                      collaborate with one another.{" "}
                    </p>
                    <p style={{ color: "white" }}>
                      Showing a field in the Woto Table will make student's
                      inputs to that field visible to other students and allow
                      them to use that information to group up.
                    </p>{" "}
                  </>
                }
              >
                <QuestionCircleOutlined />
              </Tooltip>
            </Checkbox>
          </Checkbox.Group>
        </Form.Item>
      </Space>
    );
  }

  var ret = field ? (
    <div className="field-edit-wrapper">
      <Col span={24}>
        <Form
          onFinish={onConfirm}
          layout="vertical"
          form={form}
          initialValues={{
            label: field.label,
            type: field.type,
            options: field.options,
            placeholder: field.placeholder,
            checkboxes: checkboxes,
          }}
        >
          <Form.Item name="label" label="Field Name">
            <Input placeholder={field.label} />
          </Form.Item>
          <Form.Item name="placeholder" label="Placeholder">
            <Input placeholder={field.placeholder} />
          </Form.Item>

          <Form.Item name="type" label="Type">
            <Select onSelect={(value) => setType(value)}>
              <Option value="input">Input</Option>
              <Option value="select">Select</Option>
              <Option value="tags">Tag Select</Option>
            </Select>
          </Form.Item>

          {extrafields}
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
  ) : (
    <div className="empty-field-container">
      <p>Click a field to begin customizing your form </p>
    </div>
  );

  return <>{ret}</>;
};
export default CustomizeField;
