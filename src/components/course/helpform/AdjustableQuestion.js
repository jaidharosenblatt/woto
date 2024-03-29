import React from "react";
import { Form, Button, Input, Select, Space, Row, Col } from "antd";
import { EditOutlined } from "@ant-design/icons";

import SubmitButton from "../../form/SubmitButton";
import { connect } from "react-redux";
import selectors from "../../../redux/selectors";
import ErrorSuccess from "../../util-components/error-success/ErrorSuccess";
import SelectWithAdd from "../../form/SelectWithAdd";

const { Option } = Select;

/**
 * @matthewsclar dynamically render a fields object into a form
 * @param {props} onFormSubmit handle form submit
 * @param {props} onSecondaryClick handle click of second button (optional)
 * @param {props} CTA button text; default is "Submit Your Question" (optional)
 * @param {props} secondaryCTA text for secondary button (optional)
 * @param {props} initialValues initial values to set to form (optional)
 * @param {props} editingTemplate array of fields to render (optional)
 * @param {props} buttons buttons to replace the single CTA (optional)
 * @param {props} edit whether or not to make form editable (optional)
 * @param {props} loading loading state (optional)
 * @param {props} openEditWindow open edit of window (optional)
 * @param {props} extraFields list of fields to go after the last field in questionForm (optional)
 * @param {props} onAddField handles click on the "Add Field" button
 * @param {props} resetForm handles resetting form to default
 * @param {props} hideSubmitButton
 */
const AdjustableQuestion = (props) => {
  let fields = props.editingTemplate || props.questionTemplate;

  const getOptions = (options) =>
    options.map((option, i) => (
      <Option key={option} value={option}>
        {option}
      </Option>
    ));

  const renderField = (field) => {
    switch (field.type) {
      case "select":
        return (
          <SelectWithAdd
            options={field.options}
            placeholder={field.placeholder}
          />
        );
      case "select-fixed":
        return (
          <Select placeholder={field.placeholder}>
            {getOptions(field.options)}
          </Select>
        );
      case "tags":
        return (
          <Select
            mode="tags"
            tokenSeparators={[","]}
            placeholder={field.placeholder}
          >
            {getOptions(field.options)}
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
      {props.extraFields}

      <ErrorSuccess />
      {props.secondaryCTA ? (
        <Row gutter={4}>
          <Col span={12}>
            <SubmitButton loading={props.loading} CTA="Submit" />
          </Col>
          <Col span={12}>
            <Button
              loading={props.loading}
              block
              onClick={props.onSecondaryClick}
            >
              {props.secondaryCTA}
            </Button>
          </Col>
        </Row>
      ) : (
        !props.hideSubmitButton && (
          <SubmitButton
            loading={props.loading}
            CTA={props.CTA ? props.CTA : "Submit Your Question"}
          />
        )
      )}
    </Form>
  );
};

const mapStateToProps = (state, prevProps) => {
  return {
    ...prevProps,
    questionTemplate: selectors.getQuestionTemplate(state),
  };
};

export default connect(mapStateToProps)(AdjustableQuestion);
