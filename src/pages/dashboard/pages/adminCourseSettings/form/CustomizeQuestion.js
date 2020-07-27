import React, { useState, useEffect } from "react";
import { Row, Col, Button, Card, Space } from "antd";
import AdjustableQuestion from "../../../../../components/helpform/AdjustableQuestion";
import { defaultFields } from "../../../../../components/helpform/defaultFields";

import CustomizeField from "./CustomizeField";
import API from "../../../../../api/API";
import "./customform.css";

const CustomizeQuestion = ({ course }) => {
  const [disabled, setDisabled] = useState(true);
  const [field, setField] = useState();
  const [form, setForm] = useState(defaultFields);
  const [sessionAttributes, setSessionAttributes] = useState();

  useEffect(() => {
    async function fetchTemplate() {
      try {
        const response = await API.getCourse(course._id);
        console.log(response);
        setSessionAttributes(response.sessionAttributes);
        if (
          response.sessionAttributes &&
          response.sessionAttributes.questionTemplate
        ) {
          setForm(response.sessionAttributes.questionTemplate);
        }
      } catch (error) {
        console.log(error);
      }
    }
    fetchTemplate();
  }, [course]);

  const finalizeEdits = async () => {
    const settings = { ...sessionAttributes, questionTemplate: form };

    try {
      const response = await API.updateTemplate(course._id, {
        sessionAttributes: settings,
      });
      setDisabled(true);
      console.log("Confirmed Edits:", form);
      console.log("Success:", response);
    } catch (error) {
      console.log(error);
    }
  };

  const updateForm = (values, index) => {
    if (index !== undefined) {
      var temp = form;
      var required, includeNA;

      if (values.checkboxes.includes("required")) {
        required = true;
      } else {
        required = false;
      }
      if (values.checkboxes.includes("NA")) {
        includeNA = true;
      } else {
        includeNA = false;
      }

      if (values.type === "input") {
        temp[index] = {
          type: values.type,
          label: values.label,
          placeholder: values.placeholder,
          required: required,
        };
      }
      if (values.type === "select" || values.type === "tags") {
        temp[index] = {
          type: values.type,
          label: values.label,
          options: values.options,
          placeholder: values.placeholder,
          required: required,
          includeNA: includeNA,
        };
      }

      setForm([...temp]);
      setField();
      setDisabled(false);
    }
  };

  function openEditWindow(item) {
    setField(item);
    console.log(item);
  }

  const onAddField = () => {
    var temp = form;
    temp.push({
      type: "input",
      label: "New Field",
      required: false,
      placeholder: "",
    });
    setForm([...temp]);
    setDisabled(false);
  };

  const deleteField = (value) => {
    var temp = form;
    var temp2 = [];
    console.log(value);
    for (var i = 0; i < temp.length; i++) {
      if (temp[i].label !== value.label || temp[i].type !== value.type) {
        temp2.push(temp[i]);
      }
    }
    setForm([...temp2]);
    setField();
    setDisabled(false);
  };

  const resetForm = () => {
    setForm([...defaultFields]);
    setField();
    setDisabled(true);
  };

  return (
    <Space
      style={{ width: "100%", maxWidth: 900 }}
      direction="vertical"
      className="customize-question"
    >
      <div>
        <h1>Customize Your Question Form Here:</h1>
        <p>
          Enter in the fields you want students to fill out and preview the form
          will look like
        </p>
      </div>

      <Row gutter={12}>
        <Col xs={24} lg={12}>
          <Card>
            <AdjustableQuestion
              questionForm={form}
              openEditWindow={openEditWindow}
              edit={true}
              CTA="Test Me!"
              onAddField={onAddField}
              resetForm={resetForm}
            />
          </Card>
        </Col>
        <Col xs={24} lg={12}>
          <CustomizeField
            passedForm={form}
            updateForm={updateForm}
            fielder={field}
            deleteField={deleteField}
          />
        </Col>
      </Row>

      <Button type="primary" onClick={finalizeEdits} disabled={disabled} block>
        Finalize Form Edits
      </Button>
    </Space>
  );
};
export default CustomizeQuestion;
