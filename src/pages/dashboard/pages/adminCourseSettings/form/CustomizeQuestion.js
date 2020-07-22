import React, { useState } from "react";
import { Row, Col, Button } from "antd";
import AdjustableQuestion from "./AdjustableQuestion";
import CustomizeField from "./CustomizeField";
import API from "../../../../../api/API";

const CustomizeQuestion = ({ course }) => {
  const [disabled, setDisabled] = useState(true);
  const [field, setField] = useState();
  const [form, setForm] = useState([
    {
      type: "select",
      label: "Assignment",
      options: ["hw1", "APT2"],
      required: true,
      includeNA: true,
    },
    {
      type: "select",
      label: "Stage",
      options: ["Just getting Started", "Having a Solution"],
      required: true,
      includeNA: true,
    },
    {
      type: "tags",
      label: "Concepts",
      options: ["Linked List", "Array"],
      required: true,
      includeNA: false,
    },
    {
      type: "input",
      label: "Details",
      required: true,
    },
  ]);

  const finalizeEdits = async () => {
    var questionform = { questionTemplate: form };
    try {
      const response = await API.updateTemplate(course._id, questionform);
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
          required: required,
        };
      }
      if (values.type === "select" || values.type === "tags") {
        temp[index] = {
          type: values.type,
          label: values.label,
          options: values.options,
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

  return (
    <>
      <Row gutter={[0, 10]}>
        <Col>
          <h1>Customize Your Question Form Here:</h1>
          <p>
            Enter in the fields you want students to fill out and preview the
            form will look like
          </p>
        </Col>
      </Row>
      <Row gutter={[0, 20]}>
        <Col xs={24} lg={12}>
          <AdjustableQuestion
            questionForm={form}
            openEditWindow={openEditWindow}
            edit={true}
          />
        </Col>
        <Col xs={24} lg={12}>
          <CustomizeField
            passedForm={form}
            updateForm={updateForm}
            fielder={field}
          />
        </Col>
      </Row>

      <Button type="primary" onClick={finalizeEdits} disabled={disabled} block>
        Finalize Form Edits
      </Button>
    </>
  );
};
export default CustomizeQuestion;
