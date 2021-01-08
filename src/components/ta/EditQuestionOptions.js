import React from "react";
import { Form, Button, Select } from "antd";
import { connect } from "react-redux";
import { editSession } from "../../redux/courses/actions/ta";
import selectors from "../../redux/selectors";
import ErrorSuccess from "../util-components/error-success/ErrorSuccess";

const EditQuestionOptions = (props) => {
  const { questionTemplate } = props;
  console.log(questionTemplate);
  const [form] = Form.useForm();
  var ret = [];
  var fieldsEdited = [];

  questionTemplate.forEach((field, key) => {
    if (field.type === "select" || field.type === "tags") {
      fieldsEdited.push(field.label.toLowerCase());
      ret.push(
        <Form.Item
          key={key}
          name={field.label.toLowerCase()}
          label={field.label}
        >
          <Select
            mode="tags"
            showArrow={false}
            style={{
              maxHeight: "96px",
              overflow: "auto",
              alignItems: "baseline",
              whiteSpace: "nowrap",
            }}
            dropdownStyle={{ display: "none" }}
          />
        </Form.Item>
      );
      var temp = {};
      temp[field.label.toLowerCase()] = field.options;
      form.setFieldsValue(temp);
    }
  });

  const onConfirm = async (values) => {
    var temp = questionTemplate;
    var count = 0;
    var i = 0;

    while (count < Object.keys(values).length && i < temp.length) {
      if (Object.keys(values)[count] === temp[i].label.toLowerCase()) {
        temp[i].options = values[Object.keys(values)[count]];
        count++;
      }
      i++;
    }

    const data = { questionTemplate: temp };
    try {
      props.editSession(data, props.meetingURL);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="field-edit-wrapper">
      <Form
        onFinish={onConfirm}
        form={form}
        layout="vertical"
        style={{ maxWidth: 450 }}
      >
        {ret}

        <ErrorSuccess showSuccess />
        <Button block type="primary" htmlType="submit" disabled={false}>
          Submit Edits
        </Button>
      </Form>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    questionTemplate: selectors.getQuestionTemplate(state),
    meetingURL: selectors.getUserMeetingURL(state),
  };
};
export default connect(mapStateToProps, { editSession })(EditQuestionOptions);
