import React, { useState } from "react";
import { Row, Col, Button, Space } from "antd";
import AdjustableQuestion from "../../../course/helpform/AdjustableQuestion";
import { defaultFields } from "../../../course/helpform/defaultFields";

import CustomizeField from "./CustomizeField";
import "./customform.css";
import NavBarCentered from "../../../util-components/centeredpage/NavBarCentered";
import VerticalSpace from "../../../util-components/vertical-space/VerticalSpace";
import { connect } from "react-redux";
import selectors from "../../../../redux/selectors";
import { editCourse } from "../../../../redux/sorted-courses/actionCreators";

const CustomizeQuestion = (props) => {
  const { questionTemplate } = props.course;
  const [editingField, setEditingField] = useState();
  const [questionForm, setQuestionForm] = useState(questionTemplate);

  const onFinish = async () => {
    await props.editCourse({ questionTemplate: questionForm });
  };
  const updateForm = (values, index) => {
    const { checkboxes, ...field } = values;
    const required = checkboxes.includes("required");
    const showInTable = checkboxes.includes("showInTable");

    if (index !== undefined) {
      var temp = questionForm;
      values.options = values.options || [];
      temp[index] = { ...field, required, showInTable };

      setQuestionForm([...temp]);
      setEditingField(undefined);
    }
  };

  function openEditWindow(item) {
    setEditingField(item);
  }

  const onAddField = () => {
    const field = {
      type: "input",
      label: "New Field",
      options: [],
    };
    setQuestionForm([...questionForm, field]);
    setEditingField(field);
  };

  const deleteField = (value) => {
    setQuestionForm(questionForm.filter((field) => field._id !== value._id));
    setEditingField();
  };

  const resetForm = () => {
    setQuestionForm([...defaultFields]);
    setEditingField();
  };

  return (
    <NavBarCentered>
      <VerticalSpace>
        <div>
          <h1>Customize Student Question Form</h1>
          <p>
            Enter in the fields you want students to fill out when joining
            office hours and preview what the form will look like
          </p>
        </div>

        <Row gutter={12}>
          <Col xs={24} lg={12}>
            <Space direction="vertical" style={{ width: "100%" }}>
              <h3>Preview</h3>
              <AdjustableQuestion
                editingTemplate={questionForm}
                openEditWindow={openEditWindow}
                edit={true}
                hideSubmitButton
              />
              <Button block onClick={onAddField}>
                Add Field
              </Button>
              <Button block type="primary" onClick={onFinish}>
                Finalize Form Edits
              </Button>

              <Button danger block onClick={resetForm}>
                Reset Form to Default
              </Button>
            </Space>
          </Col>
          <Col xs={24} lg={12}>
            <CustomizeField
              passedForm={questionForm}
              updateForm={updateForm}
              fielder={editingField}
              deleteField={deleteField}
            />
          </Col>
        </Row>
      </VerticalSpace>
    </NavBarCentered>
  );
};

const mapStateToProps = (state) => ({
  course: selectors.getCourse(state),
});
export default connect(mapStateToProps, { editCourse })(CustomizeQuestion);
