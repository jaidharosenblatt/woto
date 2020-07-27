import React, { useState } from "react";
import { Form, Button, Input, Select, Space, Row, Col, Checkbox } from "antd";
import { EditOutlined } from "@ant-design/icons";
import { defaultFields } from "./defaultFields";
import VideoRoomUrl from "../form/VideoRoomUrl";
import VideoRoomHelper from "../buttons/VideoRoomHelper";
import SubmitButton from "../form/SubmitButton";

const { Option } = Select;

/**
 * @matthewsclar dynamically render a fields object into a form
 * @param {props} onFormSubmit handle form submit
 * @param {props} onSecondaryClick handle click of second button (optional)
 * @param {props} CTA button text; default is "Submit Your Question" (optional)
 * @param {props} secondaryCTA text for secondary button (optional)
 * @param {props} initialValues initial values to set to form (optional)
 * @param {props} questionForm array of fields to render (optional)
 * @param {props} buttons buttons to replace the single CTA (optional)
 * @param {props} edit whether or not to make form editable (optional)
 * @param {props} openEditWindow open edit of window (optional)
 * @param {props} extraFields list of fields to go after the last field in questionForm (optional)
 * @param {props} onAddField handles click on the "Add Field" button
 * @param {props} resetForm handles resetting form to default
 */
const AdjustableQuestion = (props) => {
  const [showZoom, setShowZoom] = useState(true);
  var fields = props.questionForm;

  if (!props.questionForm) {
    fields = defaultFields;
  }

  const onChange = () => {
    setShowZoom(!showZoom);
  };
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
      case "select":
        return <Select placeholder={field.placeholder}>{Options}</Select>;
      case "tags":
        return (
          <Select placeholder={field.placeholder} mode="tags">
            {Options}
          </Select>
        );
      default:
        return <Input placeholder={field.placeholder} />;
    }
  };

  return (
    <Form
      initialValues={props.initialValues}
      onFinish={props.onFormSubmit}
      layout="vertical"
    >
      {fields.map((field, key) => {
        return (
          <Form.Item
            key={key}
            name={field.label.toLowerCase()}
            label={
              <Space size={2}>
                {field.label}
                {props.edit && (
                  <EditOutlined onClick={() => props.openEditWindow(field)} />
                )}
              </Space>
            }
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
        <Space size={0}>
          <Checkbox checked={showZoom} onChange={onChange}>
            Display my question in the Woto Room
          </Checkbox>
          <VideoRoomHelper />
        </Space>
      </Form.Item>

      {showZoom && <VideoRoomUrl />}

      {props.secondaryCTA ? (
        <Row gutter={4}>
          <Col span={12}>
            <SubmitButton CTA="Submit" />
          </Col>
          <Col span={12}>
            <Button block onClick={props.onSecondaryClick}>
              {props.secondaryCTA}
            </Button>
          </Col>
        </Row>
      ) : (
        <SubmitButton CTA={props.CTA ? props.CTA : "Submit Your Question"} />
      )}

      {props.edit && (
        <Form.Item>
          <Row gutter={[5, 0]}>
            <Col xs={12}>
              <Button block onClick={props.resetForm}>
                Reset Form to Default
              </Button>
            </Col>
            <Col xs={12}>
              <Button block onClick={props.onAddField}>
                {" "}
                Add Field
              </Button>
            </Col>
          </Row>
        </Form.Item>
      )}
    </Form>
  );
};

export default AdjustableQuestion;
