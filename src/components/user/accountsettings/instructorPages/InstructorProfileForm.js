import React, { useState } from "react";
import { Form, Col } from "antd";
import TextInputReq from "../../../form/TextInputReq";
import VideoRoomUrl from "../../../form/VideoRoomUrl";
import SubmitButton from "../../../form/SubmitButton";
import { connect } from "react-redux";

import selectors from "../../../../redux/selectors";
import API from "../../../../api/API";
import "./instructor.css";

const InstructorProfileForm = (props) => {
  const [successful, setSuccessful] = useState("");
  const [disabled, setDisabled] = useState(true);

  const success = () => {
    setSuccessful("Profile Successfully Edited");
  };

  const onChange = () => {
    setDisabled(false);
  };

  const onFinish = async (changes) => {
    try {
      const response = await API.editProfile(changes);
      if (
        response.name !== props.user.name ||
        response.meetingURL !== props.user.meetingURL
      ) {
        success();
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Form
      initialValues={{
        ...props.user,
      }}
      onFinish={(changes) => onFinish(changes)}
      layout="vertical"
      onFieldsChange={onChange}
    >
      <TextInputReq
        label="Name"
        name="name"
        placeholder="Kyle Sobel"
        message="Please input your name"
      />
      <VideoRoomUrl />
      {props.error && <p className="error">{props.error} </p>}
      {successful && (
        <Col span={24} align="middle" className="disappear">
          <Form.Item help={successful} />
        </Col>
      )}

      <SubmitButton CTA="Save Changes" disabled={disabled} />
    </Form>
  );
};

const mapStateToProps = (state) => {
  return {
    error: selectors.getError(state),
    user: selectors.getUser(state),
    loading: selectors.getLoading(state),
  };
};
export default connect(mapStateToProps)(InstructorProfileForm);
